"use client";

import { useEffect } from "react";

// Cal.com inline embed. Loads the SDK once, then renders the 15-min
// booking widget. Pass a unique `instanceId` when mounting more than
// one CalEmbed on the same page (each one needs its own DOM id and
// Cal.com namespace so the widgets don't fight for the same target).
export default function CalEmbed({
  instanceId = "primary",
  title,
  kicker = "Book a call",
  subtitle,
}) {
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
        theme: "dark",
      },
      calLink: "revlient-intercontinental/15min",
    });

    window.Cal.ns[namespace]("ui", {
      theme: "dark",
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, [elementId, namespace]);

  return (
    <div className="cal-embed">
      <div className="cal-embed__intro">
        <span className="cal-embed__kicker">{kicker}</span>
        <h3 className="cal-embed__title">
          {title || (
            <>
              Grab a <span className="cal-embed__italic">15-minute</span> slot.
            </>
          )}
        </h3>
        <p className="cal-embed__sub">
          {subtitle ||
            "Pick a time that works — we’ll walk through your project, scope it together, and tell you honestly if we’re a fit."}
        </p>
      </div>
      <div className="cal-embed__frame" id={elementId} />
    </div>
  );
}
