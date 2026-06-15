"use client";

import { useEffect } from "react";

// Cal.com inline embed. Loads the SDK once, then renders the 15-min
// booking widget into #my-cal-inline-15min on mount. Safe across
// re-mounts because the SDK is namespaced and the script tag is
// only inserted if it isn't already present.
export default function CalEmbed() {
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
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", "15min", { origin: "https://app.cal.com" });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;

    window.Cal.ns["15min"]("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: {
        layout: "month_view",
        useSlotsViewOnSmallScreen: "true",
        theme: "dark",
      },
      calLink: "revlient-intercontinental/15min",
    });

    window.Cal.ns["15min"]("ui", {
      theme: "dark",
      hideEventTypeDetails: true,
      layout: "month_view",
    });
  }, []);

  return (
    <div className="cal-embed">
      <div className="cal-embed__intro">
        <span className="cal-embed__kicker">Book a call</span>
        <h3 className="cal-embed__title">
          Grab a <span className="cal-embed__italic">15-minute</span> slot.
        </h3>
        <p className="cal-embed__sub">
          Pick a time that works — we&rsquo;ll walk through your project,
          scope it together, and tell you honestly if we&rsquo;re a fit.
        </p>
      </div>
      <div className="cal-embed__frame" id="my-cal-inline-15min" />
    </div>
  );
}
