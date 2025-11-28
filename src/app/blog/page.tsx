import Link from 'next/link';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import { getAllPosts } from '@/lib/blog';

// Server Component (Veriyi burada çekiyoruz)
export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <WorkspaceLayout>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            AI Insights & Guides
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Master your productivity with our latest articles and tutorials.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
              <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="text-xs text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span className="font-medium text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">Read Article →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
