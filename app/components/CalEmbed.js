"use client";

import { useEffect } from "react";

// Cal.com inline embed — Designjoy-style dark theme calendar
// for 30-minute consultations. Pass `instanceId` when mounting
// more than one on the same page so each gets its own DOM id
// and Cal namespace.
export default function CalEmbed({
  instanceId = "primary",
  className = "",
  layout = "month_view",
}) {
  const elementId = `cal-inline-${instanceId}`;
  const namespace = `30min-${instanceId}`;

  useEffect(() => {
    if (typeof window === "undefined") return;

    (function (C, A, L) {
      let p = function (a, ar) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const ns = ar[1];
            api.q = api.q || [];
            if (typeof ns === "string") {
              cal.ns[ns] = cal.ns[ns] || api;
              p(cal.ns[ns], ar);
              p(cal, ["initNamespace", ns]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", namespace, { origin: "https://app.cal.com" });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;

    window.Cal.ns[namespace]("inline", {
      elementOrSelector: `#${elementId}`,
      config: {
        layout,
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
      },
      calLink: "revlient-intercontinental/30min",
    });

    window.Cal.ns[namespace]("ui", {
      theme: "dark",
      hideEventTypeDetails: true,
      layout,
      cssVarsPerTheme: {
        dark: {
          "cal-brand": "#ffffff",
          "cal-bg": "#000000",
          "cal-bg-emphasis": "rgba(255, 255, 255, 0.08)",
          "cal-bg-muted": "rgba(255, 255, 255, 0.04)",
          "cal-text": "#ffffff",
          "cal-text-emphasis": "#ffffff",
          "cal-text-muted": "rgba(255, 255, 255, 0.55)",
          "cal-border": "rgba(255, 255, 255, 0.08)",
          "cal-border-emphasis": "rgba(255, 255, 255, 0.18)",
        },
      },
    });
  }, [elementId, namespace, layout]);

  return (
    <div className={`cal-widget ${className}`.trim()}>
      <div className="cal-widget__frame" id={elementId} />
    </div>
  );
}
