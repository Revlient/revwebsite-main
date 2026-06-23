"use client";

import { createContext, useContext } from "react";

// Provides the authenticated dashboard key (and a signOut helper) to
// every page that lives under app/dashboard/layout.jsx. Pages call
// useDashboard() to get the key when they need to hit /api/* routes.

export const DashboardContext = createContext({
  authedKey: null,
  signOut: () => {},
});

export function useDashboard() {
  return useContext(DashboardContext);
}
