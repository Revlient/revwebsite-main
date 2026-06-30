"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminContext } from "./AdminContext";

// Revlient agency admin shell — password gate + sidebar. Wraps every
// page under /admin/*. Independent from the Magnate bot dashboard:
// its own sessionStorage key and its own password (REVLIENT_ADMIN_PASSWORD,
// checked server-side via x-admin-key).

const STORAGE_KEY = "revlient-admin-key";

const NAV_ITEMS = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/case-studies", label: "Case studies" },
];

export default function AdminLayout({ children }) {
  const [password, setPassword] = useState("");
  const [authedKey, setAuthedKey] = useState(null);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let stored = null;
    try { stored = sessionStorage.getItem(STORAGE_KEY); } catch {}
    if (stored) setAuthedKey(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
      setAuthedKey(null);
    };
    window.addEventListener("revlient-admin-signout", handler);
    return () => window.removeEventListener("revlient-admin-signout", handler);
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

  if (!ready) {
    return <main className="dash dash--gate" />;
  }

  if (!authedKey) {
    return (
      <main className="dash dash--gate">
        <form className="dash-gate" onSubmit={handleSignIn}>
          <h1 className="dash-gate__title">Revlient admin</h1>
          <p className="dash-gate__sub">Enter the admin password.</p>
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
          {wrongPassword && <p className="dash-gate__err">Wrong password</p>}
        </form>
      </main>
    );
  }

  return (
    <AdminContext.Provider value={{ authedKey, signOut }}>
      <div className="dash dash--shell">
        <aside className="dash-nav" aria-label="Admin navigation">
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
          <button type="button" className="dash-nav__signout" onClick={signOut}>
            Sign out
          </button>
        </aside>
        <div className="dash-main">{children}</div>
      </div>
    </AdminContext.Provider>
  );
}
