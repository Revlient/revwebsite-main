"use client";

import { useEffect, useRef } from "react";

/* Gooey morphing text — two text spans crossfade through a
   blur ramp, then an SVG feColorMatrix threshold filter binds the
   blurred shapes together into one gooey blob. Ported from the
   shadcn TS/Tailwind component to plain JS + scoped CSS; same rAF
   loop, same morph math.

   Mounts a single hidden <svg> defining the threshold filter and
   two stacked <span>s the loop swaps text between. */

export default function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className = "",
  textClassName = "",
}) {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let raf = 0;
    let cancelled = false;

    const setMorph = (frac) => {
      const t1 = text1Ref.current;
      const t2 = text2Ref.current;
      if (!t1 || !t2) return;
      t2.style.filter = `blur(${Math.min(8 / frac - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(frac, 0.4) * 100}%`;
      const inv = 1 - frac;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      const t1 = text1Ref.current;
      const t2 = text2Ref.current;
      if (!t1 || !t2) return;
      t2.style.filter = "";
      t2.style.opacity = "100%";
      t1.style.filter = "";
      t1.style.opacity = "0%";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let frac = morph / morphTime;
      if (frac > 1) {
        cooldown = cooldownTime;
        frac = 1;
      }
      setMorph(frac);
    };

    const animate = () => {
      if (cancelled) return;
      raf = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent =
              texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    // initial fill so the spans don't flash empty before the loop sets them
    if (text1Ref.current && text2Ref.current && texts.length > 0) {
      text1Ref.current.textContent = texts[textIndex % texts.length];
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
    }

    animate();

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={`goo ${className}`.trim()}>
      <svg className="goo__filter" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooThreshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div className="goo__stage">
        <span ref={text1Ref} className={`goo__text ${textClassName}`.trim()} />
        <span ref={text2Ref} className={`goo__text ${textClassName}`.trim()} />
      </div>
    </div>
  );
}
