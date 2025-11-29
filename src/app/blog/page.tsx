import Link from 'next/link';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import { getAllPosts } from '@/lib/blog';
import { HiCalendar, HiTag, HiArrowRight } from 'react-icons/hi';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <WorkspaceLayout>
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase text-sm">
            Insights & Tutorials
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-3 mb-6">
            The UtilityGenAI Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover tips on productivity, learn how LLMs work, and get the most out of our AI tools.
          </p>
        </div>

        {/* Blog Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No articles found. Check back later!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
                <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1">
                  
                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1">
                            <HiCalendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                            <span className="px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                                {post.tags[0]}
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                      Read Article 
                      <HiArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
