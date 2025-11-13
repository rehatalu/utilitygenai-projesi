import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Eğer engellemek istediğimiz özel sayfalar olsaydı buraya 'disallow' eklerdik
    },
    sitemap: "https://utilitygenai.com/sitemap.xml",
  };
}

