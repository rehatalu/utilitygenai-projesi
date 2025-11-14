import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://utilitygenai.com';

  const tools = [
    'email-generator',
    'paraphraser',
    'social-post',
    'meta-description',
    'grammar-check',
    'product-description',
    'blog-ideas',
    'youtube-ideas',
    'hashtag-generator',
    'business-name',
    'code-explainer',
    'text-summarizer',
    'instagram-caption',
  ];

  const toolPages = tools.map((tool) => ({
    url: `${baseUrl}/tool/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...toolPages,
  ];
}

