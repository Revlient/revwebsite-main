import StudioPage from "../components/StudioPage";
import { BRAND } from "../lib/site";

export const metadata = {
  title: `The Studio — ${BRAND.name}`,
  description:
    "Revlient is a small senior studio shipping serious products — design, engineering and motion under one roof.",
};

export default function Page() {
  return <StudioPage />;
}
