import { redirect } from "next/navigation";

// /dashboard → /dashboard/conversations
export default function DashboardIndex() {
  redirect("/dashboard/conversations");
}
