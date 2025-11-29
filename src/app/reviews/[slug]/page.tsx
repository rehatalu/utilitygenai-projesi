import { notFound } from 'next/navigation';
import { getReviewBySlug } from '@/lib/reviews-data';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import ReactMarkdown from 'react-markdown';

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);

  if (!review) notFound();

  return (
    <WorkspaceLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
           <div className={`h-3 bg-gradient-to-r ${review.color}`} />
           <div className="p-8 md:p-12 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">{review.title}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">{review.subtitle}</p>
              <span className="inline-block px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                Verdict: {review.verdict}
              </span>
           </div>
        </div>

        {/* Content */}
        <article className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
           <ReactMarkdown>{review.content || "Review content loading..."}</ReactMarkdown>
        </article>
      </div>
    </WorkspaceLayout>
  );
}
