"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import AnimatedTabs from '@/components/ui/AnimatedTabs';

// Araç Bileşenlerini import et
import EmailSubjectGenerator from '@/components/tools/EmailSubjectGenerator';
import ParaphraserTool from '@/components/tools/ParaphraserTool';
import SocialPostGenerator from '@/components/tools/SocialPostGenerator';
import MetaDescriptionGenerator from '@/components/tools/MetaDescriptionGenerator';
import GrammarChecker from '@/components/tools/GrammarChecker';
import ProductDescriptionGenerator from '@/components/tools/ProductDescriptionGenerator';
import BlogIdeaGenerator from '@/components/tools/BlogIdeaGenerator';
import YoutubeIdeaGenerator from '@/components/tools/YoutubeIdeaGenerator';
import HashtagGenerator from '@/components/tools/HashtagGenerator';
import BusinessNameGenerator from '@/components/tools/BusinessNameGenerator';
import CodeExplainer from '@/components/tools/CodeExplainer';
import TextSummarizer from '@/components/tools/TextSummarizer';
import InstagramCaptionGenerator from '@/components/tools/InstagramCaptionGenerator';

// Araç Bileşen Haritası
const toolComponents: Record<string, React.ComponentType> = {
  'email-generator': EmailSubjectGenerator,
  'paraphraser': ParaphraserTool,
  'social-post': SocialPostGenerator,
  'meta-description': MetaDescriptionGenerator,
  'grammar-check': GrammarChecker,
  'product-description': ProductDescriptionGenerator,
  'blog-ideas': BlogIdeaGenerator,
  'youtube-ideas': YoutubeIdeaGenerator,
  'hashtag-generator': HashtagGenerator,
  'business-name': BusinessNameGenerator,
  'code-explainer': CodeExplainer,
  'text-summarizer': TextSummarizer,
  'instagram-caption': InstagramCaptionGenerator,
};

type ToolId = keyof typeof toolComponents;

interface ToolPageClientProps {
  toolId: ToolId;
}

export default function ToolPageClient({ toolId }: ToolPageClientProps) {
  const ActiveComponent = toolComponents[toolId];

  if (!ActiveComponent) {
    return null;
  }

  // email-generator için sekme verisi
  const tabsData = toolId === 'email-generator' ? [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Using our AI Email Subject Line Generator is simple. Just follow these steps to get catchy, professional subjects in seconds.</p>
          <ol>
            <li><strong>Enter Your Topic:</strong> Briefly describe your email&apos;s content (e.g., &quot;20% flash sale,&quot; &quot;new blog post,&quot; &quot;meeting follow-up&quot;).</li>
            <li><strong>Select a Tone:</strong> Choose the feeling you want to convey (e.g., &quot;Urgent,&quot; &quot;Friendly,&quot; &quot;Professional&quot;).</li>
            <li><strong>Generate:</strong> Our AI will provide you with a list of subject lines.</li>
            <li><strong>Copy & Use:</strong> Click to copy your favorite one and paste it directly into your email client.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>See how simple inputs create powerful results for different needs:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;Flash sale 25% off this weekend&quot; | <strong>Tone:</strong> &quot;Urgent&quot; <br />
              <strong>→ Output:</strong> &quot;T-Minus 48 Hours: Your 25% Off Is Waiting&quot;</li>
            <li><strong>Input Topic:</strong> &quot;Demo request for new software&quot; | <strong>Tone:</strong> &quot;Professional&quot; <br />
              <strong>→ Output:</strong> &quot;Quick Question About Your Software Needs&quot;</li>
            <li><strong>Input Topic:</strong> &quot;Weekly AI news update&quot; | <strong>Tone:</strong> &quot;Informative&quot; <br />
              <strong>→ Output:</strong> &quot;This Week in AI: 5 Trends You Missed&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Who Should Use This?</h2>
          <ul>
            <li><strong>Marketing Teams:</strong> To increase newsletter open rates and A/B test different subject lines.</li>
            <li><strong>E-commerce Owners:</strong> To announce new products, drive sales, and recover abandoned carts.</li>
            <li><strong>Sales Professionals:</strong> To write cold outreach emails that actually get a response.</li>
          </ul>

          <h2>Advantages & Limitations</h2>
          <p><strong>Advantages:</strong></p>
          <ul>
            <li><strong>Speed:</strong> Overcome writer&apos;s block instantly.</li>
            <li><strong>Creativity:</strong> Get A/B testing ideas you hadn&apos;t considered.</li>
            <li><strong>Higher Open Rates:</strong> A better subject line directly leads to more opens.</li>
          </ul>
          <p><strong>Limitations (Important):</strong> Context is king. Always use your judgment and tweak the results for your specific audience. Avoid spam filter triggers like &quot;FREE&quot; in all caps.</p>

          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Is this email subject generator truly free?</dt>
            <dd>Yes, 100%. You can generate unlimited subject lines for free. The site is supported by advertising so we can keep the tools free.</dd>

            <dt>Are my inputs or data saved?</dt>
            <dd>No. We respect your privacy. Your inputs are processed by the AI and immediately discarded. We do not store your topics or the generated results.</dd>
            
            <dt>What languages does this tool support?</dt>
            <dd>While it is optimized for English, it can understand and generate subject lines in many other major languages. Feel free to experiment!</dd>
          </dl>
        </div>
      )
    },
  ] : [];

  return (
    <WorkspaceLayout>
      <div className="mx-auto flex w-full max-w-4xl justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={toolId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <ActiveComponent />
            
            {/* email-generator için animasyonlu sekmeler */}
            {toolId === 'email-generator' && tabsData.length > 0 && (
              <div className="mx-auto flex w-full max-w-4xl justify-center">
                <motion.div
                  key="email-generator-tabs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="w-full px-4 mt-8"
                >
                  <div className="rounded-xl bg-slate-900/50 p-6 md:p-8">
                    <AnimatedTabs tabs={tabsData} initialTabId="how-to" />
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </WorkspaceLayout>
  );
}

