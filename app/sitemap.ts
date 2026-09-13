import type { MetadataRoute } from "next";

const BASE_URL = "https://epoch-skin.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/book",
    "/contact",
    "/news",
    "/privacy-policy",
    "/services",
    "/shipping-returns",
    "/shop",
    "/terms-of-service",
  ];

  return staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
