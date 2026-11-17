import type { MetadataRoute } from "next";
import { env } from "next-runtime-env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    env("NEXT_PUBLIC_BASE_URL") || process.env.NEXT_PUBLIC_BASE_URL;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/ajax/",
          "/api/",
          "/news/",
          "/static/",
          "/version/",
          "/cdn/",
          "/dnn/",
          "/dgrs/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}