import { MetadataRoute } from "next";

// Alan adımız
const baseUrl = "https://utilitygenai.com";

// Araç listemiz (URL'lerini oluşturmak için)
const tools = [
  "email-generator",
  "paraphraser",
  "social-post",
  "meta-description",
  "grammar-check",
  "product-description",
  "blog-ideas",
  "youtube-ideas",
  "hashtag-generator",
  "business-name",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Ana Sayfa
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 2. Araç Sayfaları (Döngü ile ekle)
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...toolRoutes];
}

