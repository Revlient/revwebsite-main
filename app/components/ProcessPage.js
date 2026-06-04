"use client";

import { useMemo } from "react";
import Reveal from "./Reveal";
import { CTA_HREF } from "../lib/site";
import {
  ChatMockup,
  KanbanMockup,
  DesignToolMockup,
  CodeEditorMockup,
  TestResultsMockup,
  DeploymentMockup,
} from "./ProcessMockups";

/* Starvy-style /process page. Vanilla JS + plain CSS, framer-motion
   replaced with CSS keyframes, lucide-react replaced with inline
   SVG. Reveal (IntersectionObserver) handles the scroll-in fade +
   slide. Continuous float, glow pulse, sparkle twinkle and value
   highlight reveal all run on CSS keyframes; prefers-reduced-motion
   freezes them. */

function Icon({ name, className = "" }) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  switch (name) {
    case "message":
      return (
        <svg {...props}>
          <path d="M21 12c0 4.4-4 8-9 8a10 10 0 0 1-3.4-.6L3 21l1.4-4.2A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
        </svg>
      );
    case "map":
      return (
        <svg {...props}>
          <path d="M9 4 L3 6 V20 L9 18 L15 20 L21 18 V4 L15 6 L9 4 Z" />
          <path d="M9 4 V18" />
          <path d="M15 6 V20" />
        </svg>
      );
    case "palette":
      return (
        <svg {...props}>
          <path d="M12 3a9 9 0 1 0 0 18 3 3 0 0 0 0-6h-1a3 3 0 0 1 0-6h2a4 4 0 0 0 4-4 3 3 0 0 0-3-2Z" />
          <circle cx="7" cy="10" r="1" />
          <circle cx="9.5" cy="6.5" r="1" />
          <circle cx="14.5" cy="6.5" r="1" />
          <circle cx="17" cy="10" r="1" />
        </svg>
      );
    case "code":
      return (
        <svg {...props}>
          <path d="M9 8 L4 12 L9 16" />
          <path d="M15 8 L20 12 L15 16" />
          <path d="M14 4 L10 20" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 L4 6 V12 C4 17 7.5 20.5 12 22 C16.5 20.5 20 17 20 12 V6 Z" />
          <path d="M9 12 L11 14 L15 10" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M5 19 C 7 17 9 15 12 13 C 16 9 18 7 21 4 C 17 5 14 7 11 11 C 9 14 7 16 5 19 Z" />
          <path d="M11 11 L13 13" />
          <path d="M5 19 L8 16" />
          <circle cx="16" cy="8" r="1.4" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12 H19" />
          <path d="M13 6 L19 12 L13 18" />
        </svg>
      );
    default:
      return null;
  }
}

const STEPS = [
  {
    badge: "Discovery",
    icon: "message",
    heading: ["Understand Your ", "Vision"],
    body:
      "We start with deep conversations to map your goals, users, and constraints. Every great product begins with the right questions — not the first answer.",
    Mockup: ChatMockup,
    side: "right",
    floatDur: "5.4s",
  },
  {
    badge: "Strategy & Planning",
    icon: "map",
    heading: ["Architect the ", "Roadmap"],
    body:
      "We translate goals into a phased delivery plan — sprints, milestones, and a tech stack chosen for longevity. You know exactly what you're getting and when.",
    Mockup: KanbanMockup,
    side: "left",
    floatDur: "6.2s",
  },
  {
    badge: "Design & Prototyping",
    icon: "palette",
    heading: ["Craft the ", "Experience"],
    body:
      "Wireframes evolve into pixel-perfect interfaces and interactive prototypes. We validate every flow before a single line of production code is written.",
    Mockup: DesignToolMockup,
    side: "right",
    floatDur: "5.8s",
  },
  {
    badge: "Development",
    icon: "code",
    heading: ["Build with ", "Precision"],
    body:
      "Our engineers ship clean, scalable code — Django, Next.js, modern frontend, robust APIs. Every feature is reviewed, tested, and version-controlled from day one.",
    Mockup: CodeEditorMockup,
    side: "left",
    floatDur: "5.0s",
  },
  {
    badge: "Testing & QA",
    icon: "shield",
    heading: ["Validate Every ", "Detail"],
    body:
      "Automated tests, manual QA, performance audits, and cross-device checks catch issues before users do. We ship when it's right — not just when it's done.",
    Mockup: TestResultsMockup,
    side: "right",
    floatDur: "6.5s",
  },
  {
    badge: "Launch & Support",
    icon: "rocket",
    heading: ["Deploy & ", "Evolve"],
    body:
      "We handle deployment, monitoring, and post-launch iteration. Your product gets the care it needs to grow — long after the launch announcement.",
    Mockup: DeploymentMockup,
    side: "left",
    floatDur: "5.6s",
  },
];

function Pill({ icon, label }) {
  return (
    <span className="proc-pill">
      <Icon name={icon} className="proc-pill__icon" />
      <span>{label}</span>
    </span>
  );
}

function ProcessStep({ step, index }) {
  const { badge, icon, heading, body, Mockup, side, floatDur } = step;
  const isRight = side === "right";

  return (
    <section className={`proc-step proc-step--${side}`} aria-label={badge}>
      <span className="proc-step__spot" aria-hidden="true" />

      <div className="proc-step__inner">
        <Reveal className="proc-step__copy">
          <Pill icon={icon} label={badge} />
          <h2 className="proc-step__heading">
            {heading[0]}
            <span className="proc-step__hi">{heading[1]}</span>
          </h2>
          <p className="proc-step__body">{body}</p>
        </Reveal>

        <Reveal
          className="proc-step__card-wrap"
          delay={200}
        >
          <div
            className="proc-step__card"
            style={{ animationDuration: floatDur, animationDelay: `${-index * 0.4}s` }}
          >
            <Mockup />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Sparkles() {
  // Deterministic positions — generated once via useMemo so SSR + hydrate
  // agree. 26 sparkles scattered across the viewport with staggered
  // twinkle.
  const sparkles = useMemo(() => {
    const out = [];
    for (let i = 0; i < 28; i++) {
      const top = ((i * 37) % 100);
      const left = ((i * 53 + 11) % 100);
      const delay = -((i * 0.41) % 5);
      const dur = 2 + ((i * 0.73) % 3);
      const size = 1.5 + ((i * 0.4) % 2);
      out.push({ top, left, delay, dur, size });
    }
    return out;
  }, []);
  return (
    <div className="proc-sparkles" aria-hidden="true">
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="proc-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.dur}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ProcessPage() {
  return (
    <div className="proc-shell">
      <div className="proc-noise" aria-hidden="true" />
      <Sparkles />

      <section className="proc-hero">
        <span className="proc-hero__spot" aria-hidden="true" />
        <div className="proc-hero__inner">
          <div className="proc-hero__copy">
            <h1 className="proc-hero__title">
              A calmer way to build digital products that actually ship
            </h1>
            <p className="proc-hero__sub">
              We move from raw ambition to designed, tested, launched software
              through a quiet sequence of research, prototypes, engineering,
              and post-launch care.
            </p>
            <div className="proc-hero__actions">
              <a href={CTA_HREF} className="proc-hero__btn proc-hero__btn--primary">
                Start a project
              </a>
              <a href="#process-stages" className="proc-hero__btn proc-hero__btn--ghost">
                See the method
              </a>
            </div>
          </div>

          <div className="proc-hero__media" aria-hidden="true">
            <div className="proc-hero__frame">
              <img
                src="https://picsum.photos/seed/revlient-process-studio/1200/1500"
                alt=""
              />
            </div>
            <div className="proc-hero__panel">
              <span>Discovery</span>
              <span>Prototype</span>
              <span>Build</span>
              <span>Launch</span>
            </div>
          </div>
        </div>
      </section>

      <div id="process-stages">
        {STEPS.map((step, i) => (
          <ProcessStep step={step} index={i} key={step.badge} />
        ))}
      </div>

      <section className="proc-cta">
        <span className="proc-cta__spot" aria-hidden="true" />
        <Reveal className="proc-cta__inner">
          <h2 className="proc-cta__title">
            Ready to start your <span className="proc-step__hi">project?</span>
          </h2>
          <p className="proc-cta__sub">
            Send us the rough version — we&apos;ll shape the rest with you.
          </p>
          <a href={CTA_HREF} className="proc-cta__btn">
            <span>Start a project</span>
            <Icon name="arrow" className="proc-cta__arrow" />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
