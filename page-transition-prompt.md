# Implement Luxury Page Transition in a Next.js App Router Site

Use this prompt to reproduce the exact page transition animation experience from the Revlient website in another Next.js App Router project.

## What to build

Create a full-screen page transition overlay using:

- `React` + `useContext`
- `Next.js App Router`
- `framer-motion`
- a root-level layout provider

The animation should:

- sweep up from the bottom to fully cover the screen
- hold while route navigation happens
- then sweep up and away to reveal the next page
- include a centered animated logo/brand mark

## Install

```bash
npm install framer-motion
```

## Files to create

1. `src/types/transition.ts`
2. `src/context/TransitionContext.tsx`
3. `src/components/TransitionOverlay.tsx`
4. update `app/layout.js` or `app/layout.tsx`

---

## `src/types/transition.ts`

```ts
export interface TransitionState {
  isTransitioning: boolean;
  currentPage: string;
  targetPage: string | null;
}

export interface TransitionContextType {
  state: TransitionState;
  navigate: (target: string) => void;
  onCovered: () => void;
}
```

---

## `src/context/TransitionContext.tsx`

```tsx
"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { TransitionState, TransitionContextType } from "../types/transition";

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const targetPageRef = useRef<string | null>(null);

  const [state, setState] = useState<TransitionState>({
    isTransitioning: true,
    currentPage: pathname || "/",
    targetPage: null,
  });

  useEffect(() => {
    const isInitial = !targetPageRef.current;

    if (isInitial) {
      const timer = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          currentPage: pathname,
          isTransitioning: false,
          targetPage: null,
        }));
      }, 350);
      return () => clearTimeout(timer);
    }

    setState((prev) => ({
      ...prev,
      currentPage: pathname,
      isTransitioning: false,
      targetPage: null,
    }));
    targetPageRef.current = null;
  }, [pathname]);

  const navigate = (target: string) => {
    if (state.currentPage === target || state.isTransitioning) return;

    targetPageRef.current = target;
    setState((prev) => ({
      ...prev,
      isTransitioning: true,
      targetPage: target,
    }));
  };

  const onCovered = () => {
    if (state.targetPage) {
      router.push(state.targetPage);
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("sms:") ||
        href.startsWith("javascript:") ||
        href.startsWith("https:") ||
        href.startsWith("http:")
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) return;

        const targetPath =
          url.pathname === "/"
            ? "/"
            : url.pathname.endsWith("/")
            ? url.pathname.slice(0, -1)
            : url.pathname;
        const currentNormalized =
          window.location.pathname === "/"
            ? "/"
            : window.location.pathname.endsWith("/")
            ? window.location.pathname.slice(0, -1)
            : window.location.pathname;

        if (targetPath === currentNormalized && !url.hash) {
          return;
        }

        e.preventDefault();
        const targetRoute = url.pathname + url.search + url.hash;
        navigate(targetRoute);
      } catch {
        // ignore invalid URL
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [state.currentPage, state.isTransitioning, navigate]);

  return (
    <TransitionContext.Provider value={{ state, navigate, onCovered }}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = (): TransitionContextType => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};
```

---

## `src/components/TransitionOverlay.tsx`

```tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransition } from "../context/TransitionContext";

interface TransitionOverlayProps {
  color?: string;
}

export const TransitionOverlay: React.FC<TransitionOverlayProps> = ({
  color = "#0a0f1d",
}) => {
  const { state, onCovered } = useTransition();
  const { isTransitioning, targetPage } = state;
  const duration = 0.58;
  const premiumEase = [0.76, 0, 0.24, 1];
  const isInitialLoad = !targetPage;

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <motion.div
          variants={{
            initial: {
              y: "100%",
              borderRadius: "30% 30% 0% 0% / 10% 10% 0% 0%",
              borderTop: "2px solid #e5be6e",
              borderBottom: "0px solid transparent",
            },
            cover: {
              y: "0%",
              borderRadius: "0% 0% 0% 0%",
              borderTop: "0px solid transparent",
              borderBottom: "0px solid transparent",
            },
            animate: {
              y: "0%",
              borderRadius: "0% 0% 0% 0%",
              borderTop: "0px solid transparent",
              borderBottom: "0px solid transparent",
            },
            exit: {
              y: "-100%",
              borderRadius: "0% 0% 30% 30% / 0% 0% 10% 10%",
              borderTop: "0px solid transparent",
              borderBottom: "2px solid #e5be6e",
            },
          }}
          initial={isInitialLoad ? "cover" : "initial"}
          animate="animate"
          exit="exit"
          transition={{ duration, ease: premiumEase }}
          onAnimationComplete={(definition) => {
            if (definition === "animate" && onCovered) {
              onCovered();
            }
          }}
          style={{
            backgroundColor: color,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "auto",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.04,
              pointerEvents: "none",
              backgroundImage:
                "linear-gradient(rgba(229, 190, 110, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 190, 110, 0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              zIndex: 0,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{
              opacity: 1,
              scale: [0.8, 1.05, 1],
              y: 0,
              filter: "drop-shadow(0 0 20px rgba(229,190,110,0.6))",
            }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ delay: duration * 0.15, duration: duration * 0.7 }}
            style={{
              color: "#e5be6e",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <img
              src="/logo.svg"
              alt="Brand"
              width="120"
              height="120"
              draggable={false}
              style={{ display: "block" }}
            />
            <span
              style={{
                fontFamily: "var(--font-instrument-serif), serif",
                letterSpacing: "0.25em",
                fontSize: "10px",
                color: "#e5be6e",
                textTransform: "uppercase",
                opacity: 0.8,
                marginTop: "8px",
              }}
            >
              Brand
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

---

## Root layout changes

Wrap the app in `TransitionProvider` and render `TransitionOverlay` inside the root layout.

Example for `app/layout.js`:

```tsx
import "./globals.css";
import { TransitionProvider } from "../src/context/TransitionContext";
import { TransitionOverlay } from "../src/components/TransitionOverlay";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TransitionProvider>
          <TransitionOverlay />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
```

---

## Optional explicit navigation

If you want to trigger the transition manually from buttons or custom controls, use:

```tsx
import { useTransition } from "../src/context/TransitionContext";

const MyButton = () => {
  const { navigate } = useTransition();

  return (
    <button onClick={() => navigate("/other-page")}>Go to other page</button>
  );
};
```

---

## Notes

- The overlay must be mounted at the root so it persists across route changes.
- Navigation is delayed until the cover animation has finished.
- The click interceptor ensures ordinary in-app links use the same transition.
- Customize colors, logo, and timing to match your brand.
