import Link from 'next/link';
import { HiLightningBolt } from 'react-icons/hi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Sütun 1: Marka */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <HiLightningBolt className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">UtilityGenAI</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Empowering your digital workflow with free, secure, and advanced artificial intelligence tools. Built for creators, developers, and students.
            </p>
          </div>

          {/* Sütun 2: Popüler Araçlar */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/tool/email-generator" className="hover:text-indigo-600 dark:hover:text-indigo-400">Email Subject Generator</Link></li>
              <li><Link href="/tool/paraphraser" className="hover:text-indigo-600 dark:hover:text-indigo-400">Paraphraser Tool</Link></li>
              <li><Link href="/tool/code-explainer" className="hover:text-indigo-600 dark:hover:text-indigo-400">Code Explainer</Link></li>
              <li><Link href="/tool/social-post" className="hover:text-indigo-600 dark:hover:text-indigo-400">Social Post Generator</Link></li>
              <li><Link href="/tool/youtube-ideas" className="hover:text-indigo-600 dark:hover:text-indigo-400">YouTube Idea Generator</Link></li>
            </ul>
          </div>

          {/* Sütun 3: Portal */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Discover</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/news" className="hover:text-indigo-600 dark:hover:text-indigo-400">AI Industry News</Link></li>
              <li><Link href="/reviews" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tool Reviews</Link></li>
              <li><Link href="/guides" className="hover:text-indigo-600 dark:hover:text-indigo-400">Sector Guides</Link></li>
              <li><Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400">Blog & Insights</Link></li>
            </ul>
          </div>

          {/* Sütun 4: Yasal (AdSense İçin Kritik) */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Legal & Company</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Policy</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500 dark:text-slate-500">
          <p>&copy; {currentYear} UtilityGenAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
