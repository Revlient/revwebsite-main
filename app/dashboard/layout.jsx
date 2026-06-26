"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DashboardContext } from "./DashboardContext";

// Shared dashboard shell — password gate + sidebar nav. Wraps every
// page under /dashboard/*. The password lives in sessionStorage; any
// page-level fetch sends it as x-dashboard-key, and a 401 from any
// /api route signs the user out at this level.

const STORAGE_KEY = "revlient-dashboard-key";

const NAV_ITEMS = [
  { href: "/dashboard/conversations", label: "Conversations" },
  { href: "/dashboard/properties", label: "Properties" },
];

export default function DashboardLayout({ children }) {
  const [password, setPassword] = useState("");
  const [authedKey, setAuthedKey] = useState(null);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  // Restore key on mount
  useEffect(() => {
    let stored = null;
    try { stored = sessionStorage.getItem(STORAGE_KEY); } catch {}
    if (stored) setAuthedKey(stored);
    setReady(true);
  }, []);

  // Cross-page sign-out: any page can dispatch this event when a 401
  // comes back from an API call so the gate snaps shut everywhere.
  useEffect(() => {
    const handler = () => {
      try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
      setAuthedKey(null);
    };
    window.addEventListener("revlient-dash-signout", handler);
    return () => window.removeEventListener("revlient-dash-signout", handler);
  }, []);

  const handleSignIn = (e) => {
    e?.preventDefault?.();
    const key = password.trim();
    if (!key) return;
    try { sessionStorage.setItem(STORAGE_KEY, key); } catch {}
    setAuthedKey(key);
    setPassword("");
    setWrongPassword(false);
  };

  const signOut = () => {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
    setAuthedKey(null);
  };

  // Hold render until we've checked sessionStorage so the gate
  // doesn't flash for an authed user.
  if (!ready) {
    return <main className="dash dash--gate" />;
  }

  // ── Password gate ─────────────────────────────────────────────
  if (!authedKey) {
    return (
      <main className="dash dash--gate">
        <form className="dash-gate" onSubmit={handleSignIn}>
          <h1 className="dash-gate__title">Revlient dashboard</h1>
          <p className="dash-gate__sub">Enter the dashboard password.</p>
          <input
            type="password"
            className="dash-gate__input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
          />
          <button type="submit" className="dash-gate__btn">Sign in</button>
          {wrongPassword && (
            <p className="dash-gate__err">Wrong password</p>
          )}
        </form>
      </main>
    );
  }

  // ── Authenticated shell ───────────────────────────────────────
  return (
    <DashboardContext.Provider value={{ authedKey, signOut }}>
      <div className="dash dash--shell">
        <aside className="dash-nav" aria-label="Dashboard navigation">
          <div className="dash-nav__brand">revlient.</div>
          <nav className="dash-nav__list">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`dash-nav__link ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="dash-nav__signout"
            onClick={signOut}
          >
            Sign out
          </button>
        </aside>
        <div className="dash-main">{children}</div>
      </div>
    </DashboardContext.Provider>
  );
}
