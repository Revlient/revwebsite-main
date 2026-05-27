import { SERVICES } from "./lib/services";

export default async function sitemap() {
  const baseUrl = "https://revlient.com";

  // Static site routes
  const routes = ["", "/studio", "/work", "/process", "/services", "/showcase"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic service routes
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
