import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { getCachedNews } from "@/lib/news-service";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { HiExternalLink, HiNewspaper } from "react-icons/hi";

export const revalidate = 3600; // Sayfa bazlı revalidate yedeği

export default async function NewsPage() {
  const newsItems = await getCachedNews();

  return (
    <WorkspaceLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Live Feed
          </span>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            AI & Tech News Hub
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Curated latest updates from TechCrunch, Wired, The Verge, and MIT Tech Review.
            Stay ahead of the curve.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300"
            >
              {/* Image / Placeholder */}
              <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700">
                    <HiNewspaper className="w-16 h-16" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-md">
                    {item.source}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <time dateTime={item.pubDate}>
                    {formatDistanceToNow(new Date(item.pubDate), { addSuffix: true })}
                  </time>
                </div>
                
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </Link>
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                  {item.contentSnippet?.replace(/<[^>]*>?/gm, '')} {/* Basit HTML temizliği */}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:gap-2 transition-all"
                  >
                    Read Full Story <HiExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
