import Parser from 'rss-parser';
import { unstable_cache } from 'next/cache';

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  contentSnippet?: string;
  imageUrl?: string;
}

// Güvenilir AI ve Teknoloji Kaynakları
const RSS_FEEDS = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
  },
  {
    name: 'Wired AI',
    url: 'https://www.wired.com/feed/tag/ai/latest/rss',
  },
  {
    name: 'The Verge',
    url: 'https://www.theverge.com/rss/index.xml',
  },
  {
    name: 'MIT Tech Review',
    url: 'https://www.technologyreview.com/feed/',
  }
];

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure'],
    ],
  },
});

async function fetchNewsData(): Promise<NewsItem[]> {
  let allNews: NewsItem[] = [];

  const promises = RSS_FEEDS.map(async (feedSource) => {
    try {
      const feed = await parser.parseURL(feedSource.url);
      
      return feed.items.map((item) => {
        // Resim bulmaya çalış (Farklı RSS formatları için)
        let imageUrl = null;
        if (item.enclosure && item.enclosure.url) {
          imageUrl = item.enclosure.url;
        } else if (item.mediaContent && item.mediaContent['$'] && item.mediaContent['$'].url) {
          imageUrl = item.mediaContent['$'].url;
        } else if (item.content && item.content.match(/src="([^"]+)"/)) {
            // İçerikten img src yakalamaya çalış
            const match = item.content.match(/src="([^"]+)"/);
            if (match) imageUrl = match[1];
        }

        return {
          id: item.guid || item.link || Math.random().toString(),
          title: item.title || 'No Title',
          link: item.link || '#',
          pubDate: item.pubDate || new Date().toISOString(),
          source: feedSource.name,
          contentSnippet: item.contentSnippet?.substring(0, 120) + '...',
          imageUrl: imageUrl,
        } as NewsItem;
      });
    } catch (error) {
      console.error(`Error fetching feed ${feedSource.name}:`, error);
      return [];
    }
  });

  const results = await Promise.all(promises);
  
  // Arrayleri birleştir
  allNews = results.flat();

  // 1. Mükerrer kayıtları temizle (Aynı başlık varsa sil)
  const uniqueNews = allNews.filter((item, index, self) =>
    index === self.findIndex((t) => t.title === item.title)
  );

  // 2. Tarihe göre sırala (En yeni en üstte)
  uniqueNews.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  // Sadece son 20 haberi döndür
  return uniqueNews.slice(0, 20);
}

// Next.js Cache: Veriyi 1 saat (3600 saniye) boyunca önbellekte tut
export const getCachedNews = unstable_cache(
  async () => fetchNewsData(),
  ['ai-news-feed'],
  { revalidate: 3600, tags: ['news'] }
);






