"use client";

import { useEffect } from "react";

// Cal.com inline embed — renders just the calendar widget in a
// white rounded card. Pass `instanceId` when mounting more than
// one on the same page so each gets its own DOM id and namespace.
export default function CalEmbed({ instanceId = "primary", className = "" }) {
  const elementId = `cal-inline-${instanceId}`;
  const namespace = `15min-${instanceId}`;

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
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "light",
      },
      calLink: "revlient-intercontinental/15min",
    });

    window.Cal.ns[namespace]("ui", {
      theme: "light",
      hideEventTypeDetails: true,
      layout: "month_view",
      cssVarsPerTheme: {
        light: { "cal-brand": "#0a0a0c" },
      },
    });
  }, [elementId, namespace]);

  return (
    <div className={`cal-widget ${className}`.trim()}>
      <div className="cal-widget__frame" id={elementId} />
    </div>
  );
}
