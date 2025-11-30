import { notFound } from 'next/navigation';
import { getGuideBySlug } from '@/lib/guides-data';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import ReactMarkdown from 'react-markdown';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const Icon = guide.icon;

  return (
    <WorkspaceLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-4">
           <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
             <Icon className="w-8 h-8" />
           </div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{guide.title}</h1>
        </div>
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
           <ReactMarkdown>{guide.content || "Content coming soon..."}</ReactMarkdown>
        </div>
      </div>
    </WorkspaceLayout>
  );
}


