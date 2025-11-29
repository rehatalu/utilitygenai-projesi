import { notFound } from 'next/navigation';
import { getNewsBySlug } from '@/lib/news-data';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import ReactMarkdown from 'react-markdown';

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: NewsPageProps) {
  const { slug } = await params;
  const news = getNewsBySlug(slug);

  if (!news) notFound();

  return (
    <WorkspaceLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
           <div className="flex items-center gap-3 text-sm font-medium mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                {news.category}
              </span>
              <span className="text-slate-500">{news.date}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{news.readTime}</span>
           </div>
           <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
             {news.title}
           </h1>
           <p className="text-xl text-slate-600 dark:text-slate-400 border-l-4 border-indigo-500 pl-4 italic">
             {news.excerpt}
           </p>
        </div>

        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none">
           <ReactMarkdown>{news.content || "Content loading..."}</ReactMarkdown>
        </article>
      </div>
    </WorkspaceLayout>
  );
}
