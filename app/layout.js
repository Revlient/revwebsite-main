import "./globals.css";
import {
  DM_Sans,
  Caveat,
  Instrument_Serif,
  Cormorant_Garamond,
  Inter,
  Barlow,
  IBM_Plex_Mono,
  Figtree,
  Noto_Sans_Devanagari,
  Philosopher,
} from "next/font/google";
import localFont from "next/font/local";
import { BRAND } from "./lib/site";
// Background music removed for now — restore by uncommenting this and
// the <MusicToggle /> below once a new track is ready.
// import MusicToggle from "./components/MusicToggle";
import GlobalOptimizer from "./components/GlobalOptimizer";
import SmoothScroll from "./components/SmoothScroll";
import SideFixedBar from "./components/SideFixedBar";
import { TransitionProvider } from "../src/context/TransitionContext";

import { TransitionOverlay } from "../src/components/TransitionOverlay";

// DM Sans + Caveat are scoped to the new footer via CSS variables — the
// rest of the site continues to use the system stack defined in globals.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ibm-mono",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-philosopher",
  display: "swap",
});

const palisade = localFont({
  src: "../public/fonts/Palisade.otf",
  variable: "--font-palisade",
  display: "swap",
});

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
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${caveat.variable} ${instrumentSerif.variable} ${cormorant.variable} ${inter.variable} ${barlow.variable} ${ibmPlexMono.variable} ${figtree.variable} ${notoSansDevanagari.variable} ${philosopher.variable} ${palisade.variable}`}
    >
      <body>
        {/* Runs before paint: enables scroll-reveal animation only when JS
            is available. Without it the page renders fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <TransitionProvider>
          <TransitionOverlay />
          {children}
        </TransitionProvider>
        {/* Background music removed for now — restore <MusicToggle /> here. */}
        <GlobalOptimizer />
        <SmoothScroll />
        <SideFixedBar />
      </body>
    </html>
  );
}
