"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

const TransitionContext = createContext(undefined);

export const TransitionProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const targetPageRef = useRef(null);

  const [state, setState] = useState({
    isTransitioning: true,
    currentPage: pathname || "/",
    targetPage: null,
  });

  useEffect(() => {
    const isInitial = !targetPageRef.current;

    if (isInitial) {
      const timer = window.setTimeout(() => {
        setState((prev) => ({
          ...prev,
          currentPage: pathname,
          isTransitioning: false,
          targetPage: null,
        }));
      }, 350);

      return () => window.clearTimeout(timer);
    }

    setState((prev) => ({
      ...prev,
      currentPage: pathname,
      isTransitioning: false,
      targetPage: null,
    }));
    targetPageRef.current = null;
  }, [pathname]);

  const navigate = (target) => {
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
    const handleGlobalClick = (e) => {
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

      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

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

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};