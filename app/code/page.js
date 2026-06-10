import CodePage from "../components/CodePage";
import { BRAND } from "../lib/site";

export const metadata = {
  title: `Code & Engineering — ${BRAND.name}`,
  description: "Bespoke digital platforms, Next.js brand portals, secure PostgreSQL backends, and Django API systems by Revlient.",
};

export default function Page() {
  return <CodePage />;
}
