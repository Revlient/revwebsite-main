"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TransitionState, TransitionContextType } from '../types/transition';

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider: React.FC<TransitionProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [state, setState] = useState<TransitionState>({
    isTransitioning: false,
    currentPage: pathname || '/',
    targetPage: null,
  });

  // Automatically dismiss the overlay when route pathname changes/resolves successfully
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentPage: pathname,
      isTransitioning: false,
      targetPage: null,
    }));
  }, [pathname]);

  const navigate = (target: string) => {
    // Prevent duplicate transition triggers or navigating to current active page
    if (state.currentPage === target || state.isTransitioning) return;
    
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

  // Global click interceptor to catch any raw HTML <a> tags and route them client-side with transitions
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // 1. Ignore right clicks, double clicks, and clicks with modifier keys
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

      // 2. Find the closest anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      // 3. Ignore target="_blank", downloads, or external protocols
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore mailto, tel, whatsapp, social and non-routing protocols
      if (
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('sms:') ||
        href.startsWith('javascript:') ||
        href.startsWith('https:') ||
        href.startsWith('http:')
      ) {
        return;
      }

      try {
        // Resolve target URL relative to the current window location
        const url = new URL(href, window.location.href);

        // Verify it is on the same domain/origin
        if (url.origin !== window.location.origin) return;

        // Skip transitions if we are just scrolling to a hash section on the same pathname
        if (url.pathname === window.location.pathname && url.hash) {
          return;
        }

        // Normalize target path (strip trailing slashes to prevent duplicate page matches)
        const targetPath = url.pathname === '/' ? '/' : (url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname);
        const currentNormalized = window.location.pathname === '/' ? '/' : (window.location.pathname.endsWith('/') ? window.location.pathname.slice(0, -1) : window.location.pathname);

        // If target is the same page and it is not a hash link to somewhere else, skip transitioning
        if (targetPath === currentNormalized && !url.hash) {
          return;
        }

        // Intercept navigation
        e.preventDefault();
        
        // Assemble target path including hash or query parameters
        const targetRoute = url.pathname + url.search + url.hash;
        navigate(targetRoute);
      } catch (err) {
        // Ignore parsing errors and let native routing handle it
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
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
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};
