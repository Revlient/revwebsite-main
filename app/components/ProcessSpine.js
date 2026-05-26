"use client";

import { useEffect, useRef, useState } from "react";
import ProcessDust from "./process/ProcessDust";
import StageMockup from "./process/StageMockups";

/* Process spine — a snaking purple connector that zigzags through six
   stages on desktop, drawing as the user scrolls, with a continuous
   light pulse travelling along the path. On mobile (≤ 768px), the
   layout collapses to a centred column and the snake becomes a
   straight vertical spine through the same six nodes.

   No framer-motion in this codebase. The scroll-linked draw is done
   with native scroll events + stroke-dashoffset on a pathLength="1"
   path (the same math framer's useScroll → useTransform(pathLength)
   compiles down to). The traveling pulse is plain SVG
   <animateMotion>. Reduced-motion settles the line fully drawn and
   drops the pulse. */

const STAGES = [
  {
    n: "01",
    title: "Discovery",
    body: "We start by understanding the goals, audience, brand context, and the constraints that will shape every decision afterwards.",
  },
  {
    n: "02",
    title: "Onboarding & Access",
    body: "Once we're aligned, you get private CRM access — track every phase, transfer assets, raise enquiries, and watch the project pulse in real time.",
  },
  {
    n: "03",
    title: "Strategy",
    body: "Information architecture, content flow, and conversion thinking come before pixels — so the whole build pulls in one direction.",
  },
  {
    n: "04",
    title: "Design",
    body: "Wireframes, a tight design system, and high-fidelity UI you can react to long before code is written.",
  },
  {
    n: "05",
    title: "Development",
    body: "Front end, back end, integrations — built the way they should be, not the fast way. Performance and accessibility from commit one.",
  },
  {
    n: "06",
    title: "Testing",
    body: "QA across browsers, devices, lighthouse and accessibility audits — everything that has to be true before launch day arrives.",
  },
  {
    n: "07",
    title: "Launch & Support",
    body: "Smooth deploy, monitoring on day one, and on-hand for the days, weeks and months after. The relationship doesn't end at go-live.",
  },
];

// Shared SVG viewBox. 1200 wide, N rows × 380 = VB_H tall (where N
// is the number of STAGES). preserveAspectRatio="none" lets the SVG
// stretch to fill the section — rows have equal min-height so node
// positions still align with card centres regardless of actual pixel
// size.
const VB_W = 1200;
const ROW_H = 380;
const VB_H = ROW_H * STAGES.length;
const LEFT_EDGE_X = 540; // inner edge of a left-aligned card
const RIGHT_EDGE_X = 660; // inner edge of a right-aligned card

// Desktop nodes: alternating left/right card edges, vertical centre of each row.
const NODES_DESKTOP = STAGES.map((_, i) => ({
  x: i % 2 === 0 ? LEFT_EDGE_X : RIGHT_EDGE_X,
  y: ROW_H * (i + 0.5),
}));

// Mobile nodes: centred horizontally, sit near the top of each row so
// the card stacks below.
const NODES_MOBILE = STAGES.map((_, i) => ({
  x: VB_W / 2,
  y: ROW_H * (i + 0.15),
}));

function buildSnakePath(nodes) {
  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const a = nodes[i - 1];
    const b = nodes[i];
    const goingRight = b.x > a.x;
    // Cubic-bezier control points pull the curve through the centre
    // gutter with breathing room — not a tight U-turn.
    const cp1x = goingRight ? a.x + 360 : a.x - 360;
    const cp2x = goingRight ? b.x - 360 : b.x + 360;
    const cp1y = a.y + 60;
    const cp2y = b.y - 60;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${b.x} ${b.y}`;
  }
  return d;
}

const PATH_D_DESKTOP = buildSnakePath(NODES_DESKTOP);
const PATH_D_MOBILE = `M ${NODES_MOBILE[0].x} ${NODES_MOBILE[0].y} L ${NODES_MOBILE[NODES_MOBILE.length - 1].x} ${NODES_MOBILE[NODES_MOBILE.length - 1].y}`;

// Approximate scroll-progress thresholds at which each node lights up.
// Distributed roughly evenly across the 0->1 scroll progress of the
// section; first lights almost immediately, last lights near the end.
const NODE_THRESHOLDS = [0.04, 0.18, 0.32, 0.46, 0.6, 0.74, 0.88];

// Monoline 24x24 icons stroked in purple, one per stage. Drawn at the
// origin so the wrapping <g> can place them.
const NODE_ICONS = [
  // 01 compass
  (
    <g key="compass" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polygon points="16,8 13,13 8,16 11,11" fill="#ffffff" stroke="none" />
    </g>
  ),
  // 02 id-card (client portal / CRM access)
  (
    <g key="id-card" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="9" cy="13" r="2.5" />
      <line x1="14" y1="11" x2="18" y2="11" />
      <line x1="14" y1="15" x2="18" y2="15" />
    </g>
  ),
  // 03 sitemap
  (
    <g key="sitemap" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M12 7 L6 17" />
      <path d="M12 7 L18 17" />
    </g>
  ),
  // 03 wireframe square with corner markers
  (
    <g key="wireframe" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7 L4 4 L7 4" />
      <path d="M17 4 L20 4 L20 7" />
      <path d="M20 17 L20 20 L17 20" />
      <path d="M7 20 L4 20 L4 17" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
    </g>
  ),
  // 04 code brackets </>
  (
    <g key="code" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8,7 4,12 8,17" />
      <polyline points="16,7 20,12 16,17" />
      <line x1="13.5" y1="5.5" x2="10.5" y2="18.5" />
    </g>
  ),
  // 05 shield-check
  (
    <g key="shield" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L19 6 L19 12 C19 16 16 19 12 21 C8 19 5 16 5 12 L5 6 Z" />
      <path d="M9 12 L11 14 L15 10" />
    </g>
  ),
  // 06 rocket / arrow-up-and-out
  (
    <g key="rocket" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 L17 7" />
      <path d="M9 7 L17 7 L17 15" />
    </g>
  ),
];

function NodeLabel({ index }) {
  // Number on top (italic Cormorant 10px) + 24x24 monoline icon below,
  // 4px gap. The whole label sits to the right of the node dot.
  return (
    <g transform="translate(20 -16)">
      <text
        x="12"
        y="0"
        textAnchor="middle"
        dominantBaseline="hanging"
        className="spine__node-num"
        
        fontSize="10"
      >
        {String(index + 1).padStart(2, "0")}
      </text>
      <g transform="translate(0 14)">{NODE_ICONS[index]}</g>
    </g>
  );
}

export default function ProcessSpine() {
  const sectionRef = useRef(null);
  const desktopPathRef = useRef(null);
  const mobilePathRef = useRef(null);
  const desktopNodeRefs = useRef([]);
  const mobileNodeRefs = useRef([]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mqr =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (!mqr) return undefined;
    const apply = () => setReduced(mqr.matches);
    apply();
    mqr.addEventListener("change", apply);
    return () => mqr.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const setDrawn = (p) => {
      const off = String(1 - p);
      if (desktopPathRef.current)
        desktopPathRef.current.setAttribute("stroke-dashoffset", off);
      if (mobilePathRef.current)
        mobilePathRef.current.setAttribute("stroke-dashoffset", off);
      const setNodes = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const n = arr[i];
          if (!n) continue;
          const active = p >= NODE_THRESHOLDS[i];
          const cur = n.getAttribute("data-active") === "true";
          if (active !== cur)
            n.setAttribute("data-active", active ? "true" : "false");
        }
      };
      setNodes(desktopNodeRefs.current);
      setNodes(mobileNodeRefs.current);
    };

    if (reduced) {
      setDrawn(1);
      return undefined;
    }

    let raf = 0;
    let visible = false;
    let sectionTop = 0;
    let sectionHeight = 0;

    const updateDimensions = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = rect.height;
    };

    const apply = () => {
      raf = 0;
      const scrollTop = window.scrollY;
      const vh = window.innerHeight || 800;
      const sTopRelative = sectionTop - scrollTop;
      const denom = sectionHeight + vh;
      const p = Math.max(0, Math.min(1, (vh - sTopRelative) / denom));
      setDrawn(p);
    };

    const onScroll = () => {
      if (!visible || raf) return;
      raf = requestAnimationFrame(apply);
    };

    const onResize = () => {
      updateDimensions();
      apply();
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) {
          updateDimensions();
          apply();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(section);

    updateDimensions();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <section id="process" className="spine" ref={sectionRef}>
      <ProcessDust />
      <div className="spine__head">
        <span className="spine__eyebrow">A simple step-by-step process</span>
        <h2 className="spine__title">Design without the hassle</h2>
        <p className="spine__sub">
          Six deliberate stages — from the first conversation to the day
          after launch. You always know exactly where the project sits.
        </p>
      </div>

      <div className="spine__rows">
        {/* Desktop snake */}
        <svg
          className="spine__svg spine__svg--desktop"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="spineGlowD" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="spineHaloD">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0.16)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
            <filter id="spinePulseD" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* dim base path so the route is always faintly visible */}
          <path
            d={PATH_D_DESKTOP}
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="2"
            fill="none"
            pathLength="1"
          />
          {/* bright scroll-driven overlay */}
          <path
            id="spine-path-desktop"
            ref={desktopPathRef}
            d={PATH_D_DESKTOP}
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
            pathLength="1"
            strokeDasharray="1 1"
            strokeDashoffset="1"
            strokeLinecap="round"
            filter="url(#spineGlowD)"
          />

          {NODES_DESKTOP.map((n, i) => (
            <g key={i} transform={`translate(${n.x} ${n.y})`}>
              <g
                ref={(el) => {
                  desktopNodeRefs.current[i] = el;
                }}
                className="spine__node"
                data-active="false"
              >
                <circle r="28" fill="url(#spineHaloD)" className="spine__node-halo" />
                <circle r="6" fill="#ffffff" className="spine__node-dot" />
                <NodeLabel index={i} />
              </g>
            </g>
          ))}

          {!reduced && (
            <circle r="4" fill="#fff" filter="url(#spinePulseD)">
              <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                <mpath href="#spine-path-desktop" />
              </animateMotion>
            </circle>
          )}
        </svg>

        {/* Mobile vertical spine */}
        <svg
          className="spine__svg spine__svg--mobile"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="spineGlowM" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="spineHaloM">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0.16)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </radialGradient>
            <filter id="spinePulseM" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={PATH_D_MOBILE}
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="2"
            fill="none"
            pathLength="1"
          />
          <path
            id="spine-path-mobile"
            ref={mobilePathRef}
            d={PATH_D_MOBILE}
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
            pathLength="1"
            strokeDasharray="1 1"
            strokeDashoffset="1"
            strokeLinecap="round"
            filter="url(#spineGlowM)"
          />

          {NODES_MOBILE.map((n, i) => (
            <g key={i} transform={`translate(${n.x} ${n.y})`}>
              <g
                ref={(el) => {
                  mobileNodeRefs.current[i] = el;
                }}
                className="spine__node"
                data-active="false"
              >
                <circle r="28" fill="url(#spineHaloM)" className="spine__node-halo" />
                <circle r="6" fill="#ffffff" className="spine__node-dot" />
              </g>
            </g>
          ))}

          {!reduced && (
            <circle r="4" fill="#fff" filter="url(#spinePulseM)">
              <animateMotion dur="10s" repeatCount="indefinite">
                <mpath href="#spine-path-mobile" />
              </animateMotion>
            </circle>
          )}
        </svg>

        {STAGES.map((s, i) => (
          <div
            key={s.n}
            className={`spine__row spine__row--${i % 2 === 0 ? "left" : "right"}`}
          >
            <article className="spine__card">
              <StageMockup index={i} />
              <div className="spine__num">{s.n}</div>
              <h3 className="spine__cardtitle">{s.title}</h3>
              <p className="spine__cardbody">{s.body}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
