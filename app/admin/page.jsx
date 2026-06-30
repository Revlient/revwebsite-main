import { redirect } from "next/navigation";

// /admin → /admin/projects
export default function AdminIndex() {
  redirect("/admin/projects");
}
