"use client";

import { useEffect } from "react";

// Cal.com inline embed, presented as a hero-style booking section.
// Left: oversized headline + subtitle + slot link. Right: the actual
// month-view calendar in a rounded white card. Pass `instanceId`
// when mounting more than one embed on the same page — each needs
// its own DOM id and Cal namespace.
export default function CalEmbed({
  instanceId = "primary",
  kicker = "The studio behind your launch",
  title,
  subtitle,
  ctaText = "Book a free 15-minute call — pick a slot",
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
        theme: "light",
      },
      calLink: "revlient-intercontinental/15min",
    });

    window.Cal.ns[namespace]("ui", {
      theme: "light",
      hideEventTypeDetails: true,
      layout: "month_view",
      cssVarsPerTheme: {
        light: {
          "cal-brand": "#0a0a0c",
        },
      },
    });
  }, [elementId, namespace]);

  return (
    <div className="cal-hero">
      <div className="cal-hero__intro">
        <span className="cal-hero__kicker">{kicker}</span>
        <h2 className="cal-hero__title">
          {title || (
            <>
              Build with Revlient.
              <br />
              Ship your{" "}
              <span className="cal-hero__italic">next</span> legacy.
            </>
          )}
        </h2>
        <p className="cal-hero__sub">
          {subtitle ||
            "A studio-built website, ERP or app, scoped on a single call. No retainer, no slide deck — just clear next steps."}
        </p>
        <a
          href={`#${elementId}`}
          className="cal-hero__link"
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById(elementId);
            if (target)
              target.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          {ctaText} <span aria-hidden="true">→</span>
        </a>
      </div>

      <div className="cal-hero__card">
        <div className="cal-hero__frame" id={elementId} />
      </div>
    </div>
  );
}
