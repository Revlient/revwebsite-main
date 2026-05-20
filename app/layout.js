import "./globals.css";
import { BRAND } from "./lib/site";
import MusicToggle from "./components/MusicToggle";

// FOLLOW-ON TASK (SEO pass): per-page metadata, real OG image, favicon,
// sitemap.xml, robots.txt. This is a sound baseline only.
export const metadata = {
  metadataBase: new URL("https://revlient.com"),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s — ${BRAND.name}`,
  },
  description:
    "Revlient is a creative studio crafting 3D-grade websites and applications — engineered to feel as good as they look.",
  keywords: [
    "creative studio",
    "3D websites",
    "web development",
    "app development",
    "Revlient",
  ],
  openGraph: {
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "A creative studio crafting 3D-grade websites and applications, engineered to feel as good as they look.",
    siteName: BRAND.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "A creative studio crafting 3D-grade websites and applications.",
  },
};

export const viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Runs before paint: enables scroll-reveal animation only when JS
            is available. Without it the page renders fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {children}
        {/* Persists across route changes (lives in the root layout). */}
        <MusicToggle />
      </body>
    </html>
  );
}
