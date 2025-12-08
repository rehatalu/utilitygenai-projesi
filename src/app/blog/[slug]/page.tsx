import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 1. SEO için Metadata Oluştur
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | UtilityGenAI Blog`,
    description: post.excerpt,
  };
}

// 2. Statik Sayfaları Önceden Oluştur (Build Time)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 3. Sayfa İçeriği
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <WorkspaceLayout>
      <article className="mx-auto w-full max-w-3xl px-4 py-12">
        {/* Başlık Alanı */}
        <header className="mb-8 text-center">
          <div className="mb-4 flex justify-center gap-2">
             {post.tags.map(tag => (
                <span key={tag} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                  #{tag}
                </span>
             ))}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
            {post.title}
          </h1>
          <time className="text-sm text-slate-500 dark:text-slate-400">
            {new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
          </time>
        </header>

        {/* Makale İçeriği (Prose) */}
        <div className="prose prose-lg prose-slate dark:prose-invert mx-auto">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </WorkspaceLayout>
  );
}






