import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { LOCALES } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  LOCALES.forEach((lang) => {
    routes.push(
      {
        url: `${siteConfig.url}/${lang}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${siteConfig.url}/${lang}#services`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${siteConfig.url}/${lang}#calculator`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${siteConfig.url}/${lang}#contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      }
    );
  });

  return routes;
}
