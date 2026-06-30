"use client";

import { createContext, useContext } from "react";

// Auth context for the Revlient agency admin (/admin/*). Separate from
// the Magnate bot dashboard (/dashboard/*) — its own password + storage
// key so the two never share access.

export const AdminContext = createContext({
  authedKey: null,
  signOut: () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}
