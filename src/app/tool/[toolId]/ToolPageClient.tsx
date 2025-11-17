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

// Dev İçerik Haritası - Tüm araçlar için sekme içeriği
const TOOL_CONTENT_MAP: Record<string, Array<{ id: string; label: string; content: React.ReactNode }>> = {
  // --- 1. Email Subject Generator (Mevcut) ---
  'email-generator': [
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
  ],

  // --- 2. Paraphraser Tool (YENİ) ---
  'paraphraser': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Our Paraphraser Tool helps you rewrite any text to make it unique, clearer, or more formal. Avoid plagiarism and improve your writing clarity.</p>
          <ol>
            <li><strong>Paste Your Text:</strong> Enter the original sentence or paragraph into the input box.</li>
            <li><strong>Select a Mode (Optional):</strong> Choose a tone like &quot;Formal,&quot; &quot;Simple,&quot; or &quot;Creative&quot; to guide the AI.</li>
            <li><strong>Generate:</strong> The AI will analyze the context and provide you with an alternative version.</li>
            <li><strong>Review & Copy:</strong> Read the new text, ensure it meets your needs, and copy it.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Transform your writing for any situation:</p>
          <ul>
            <li><strong>Original (Clumsy):</strong> &quot;The reason I am writing this email is because I want to ask for the report.&quot; <br />
              <strong>→ Output (Formal):</strong> &quot;I am writing to formally request the report.&quot;</li>
            <li><strong>Original (Complex):</strong> &quot;The epistemological dichotomy in the text suggests a post-structuralist critique.&quot; <br />
              <strong>→ Output (Simple):</strong> &quot;The text discusses a conflict in how we know things, questioning older ideas about truth.&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Who is this tool for?</h2>
          <ul>
            <li><strong>Students:</strong> To avoid plagiarism and better understand source materials by rephrasing them.</li>
            <li><strong>Writers & Bloggers:</strong> To overcome writer&apos;s block and find new ways to express ideas.</li>
            <li><strong>ESL Speakers:</strong> To improve sentence structure and sound more fluent in English.</li>
          </ul>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Is this just a &quot;spinner&quot;? Will it be flagged for plagiarism?</dt>
            <dd>No. This is not a simple word-swapper. It uses an advanced AI to understand the *meaning* and rewrite it contextually. However, you should always cite your original sources for academic work.</dd>
            <dt>Is there a word limit?</dt>
            <dd>For best results, we recommend paraphrasing a few paragraphs at a time (around 500-1000 words). This ensures the highest quality and context retention.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 3. Social Post Generator (YENİ) ---
  'social-post': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Create engaging posts for Twitter (X), LinkedIn, or Facebook in seconds. Stop staring at a blank screen!</p>
          <ol>
            <li><strong>Enter Your Topic:</strong> What&apos;s the post about? (e.g., &quot;new AI blog post,&quot; &quot;25% off sale,&quot; &quot;hiring a new developer&quot;).</li>
            <li><strong>Choose the Platform:</strong> Select &quot;LinkedIn&quot; (more professional) or &quot;Twitter&quot; (short and catchy).</li>
            <li><strong>Select a Tone:</strong> &quot;Excited,&quot; &quot;Professional,&quot; &quot;Informative.&quot;</li>
            <li><strong>Generate:</strong> Get multiple post options, often including relevant emojis and hashtags.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>See how the AI adapts to different platforms:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;New blog post about AI in marketing&quot; | <strong>Platform:</strong> &quot;LinkedIn&quot; <br />
              <strong>→ Output:</strong> &quot;Just published a new article on how AI is fundamentally changing the marketing landscape. We dive into data-driven strategies and future trends. A must-read for C-suite leaders. #AI #Marketing #DigitalTransformation [Link]&quot;</li>
            <li><strong>Input Topic:</strong> &quot;Flash sale 25% off all t-shirts&quot; | <strong>Platform:</strong> &quot;Twitter (X)&quot; <br />
              <strong>→ Output:</strong> &quot;🚨 FLASH SALE! 🚨 Get 25% OFF all our t-shirts for the next 24 hours only! Don&apos;t miss out. 👕🔥 #sale #fashion #discount [Link]&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Does this tool generate hashtags?</h2>
          <p>Yes, our AI will often suggest 3-5 relevant hashtags to increase your post&apos;s visibility. (We also have a separate, dedicated <a href="/tool/hashtag-generator">Hashtag Generator</a> for more advanced needs).</p>
          <h2>Can I use this for Instagram?</h2>
          <p>This tool is optimized for text-based platforms (LinkedIn/Twitter). For image-based platforms, we recommend our dedicated <a href="/tool/instagram-caption">Instagram Caption Generator</a> which focuses more on storytelling and visual description.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Is it free to use?</dt>
            <dd>Yes, all our tools are 100% free, supported by advertising.</dd>
            <dt>How many posts can I generate?</dt>
            <dd>Unlimited. Feel free to generate as many options as you need to find the perfect post.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 4. Meta Description Generator (YENİ) ---
  'meta-description': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Write compelling, SEO-friendly meta descriptions that increase your click-through rate (CTR) from Google search results.</p>
          <ol>
            <li><strong>Enter Page Topic/Keywords:</strong> What is your web page about? (e.g., &quot;Brooklyn bakery,&quot; &quot;guide to hiking in Alps,&quot; &quot;our pricing page&quot;).</li>
            <li><strong>Enter Your Brand/Site Name:</strong> (Optional) This helps the AI include your brand naturally.</li>
            <li><strong>Generate:</strong> The AI will create several description options optimized for length (under 160 characters).</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>From broad topics to specific pages:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;Homepage for a custom bicycle shop&quot; <br />
              <strong>→ Output:</strong> &quot;Build your dream bike. We offer custom-built bicycles, expert repairs, and premium gear. Visit our shop and start your cycling journey today.&quot;</li>
            <li><strong>Input Topic:</strong> &quot;Blog post about &apos;best 10 sci-fi books&apos;&quot; <br />
              <strong>→ Output:</strong> &quot;Looking for your next read? Discover our list of the 10 best sci-fi books of all time, from classic epics to modern masterpieces.&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>What is a Meta Description? Why does it matter?</h2>
          <p>A meta description is the short snippet of text (approx. 155-160 characters) that appears under your page title in Google search results. A good description acts like an &quot;ad&quot; for your page, convincing users to click your link instead of someone else&apos;s.</p>
          <h2>Will this guarantee I rank #1 on Google?</h2>
          <p>No. Meta descriptions do not *directly* influence your ranking. However, a good description *indirectly* helps your SEO by increasing your Click-Through Rate (CTR). A high CTR signals to Google that your page is a good result for that query.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>How long should my description be?</dt>
            <dd>Google typically truncates descriptions after 155-160 characters. Our AI is optimized to stay within this limit to ensure your full message is visible.</dd>
            <dt>Should I use this for *every* page?</dt>
            <dd>Yes. Every important, indexable page on your site (homepage, blog posts, product pages, service pages) should have a unique, compelling meta description.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 5. Grammar Checker (YENİ) ---
  'grammar-check': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Instantly check your text for spelling, grammar, and punctuation errors. Write clearer, more professional emails, articles, and reports.</p>
          <ol>
            <li><strong>Paste Your Text:</strong> Copy and paste the text you want to check into the input box.</li>
            <li><strong>Generate:</strong> The AI will analyze your text. Errors will be highlighted, and suggestions will be provided.</li>
            <li><strong>Review & Accept:</strong> Go through the suggestions. Click to accept a change or ignore it.</li>
            <li><strong>Copy Corrected Text:</strong> Once finished, copy your polished, error-free text.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Catches common and complex errors:</p>
          <ul>
            <li><strong>Original:</strong> &quot;Its a nice day. I am going to there office.&quot; <br />
              <strong>→ Corrected:</strong> &quot;<strong>It&apos;s</strong> a nice day. I am going to <strong>their</strong> office.&quot;</li>
            <li><strong>Original:</strong> &quot;He dont like apples, oranges or bananas.&quot; (Comma Splice) <br />
              <strong>→ Corrected:</strong> &quot;He <strong>doesn&apos;t</strong> like apples, oranges, <strong>or</strong> bananas.&quot;</li>
            <li><strong>Original:</strong> &quot;The data strongly suggest the hypothesis is correct.&quot; (Subject-Verb) <br />
              <strong>→ Corrected:</strong> &quot;The data strongly <strong>suggests</strong> the hypothesis is correct.&quot;</li>
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
            <li><strong>Students:</strong> To proofread essays and assignments before submission.</li>
            <li><strong>Professionals:</strong> To ensure emails, reports, and presentations are error-free.</li>
            <li><strong>Bloggers & Writers:</strong> To polish articles before publishing.</li>
            <li><strong>ESL Speakers:</strong> To improve confidence and fluency in written English.</li>
          </ul>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Is this better than the checker in Word/Google Docs?</dt>
            <dd>Yes. This tool is powered by a generative AI trained on billions of parameters. It not only catches simple spelling errors but also complex contextual grammar, style, and tone issues that older checkers miss.</dd>
            <dt>What languages does it support?</dt>
            <dd>It is most accurate for English but has a strong understanding of grammar in many major languages.</dd>
            <dt>Does the AI rewrite my entire text?</dt>
            <dd>No. This is a &quot;checker,&quot; not a paraphraser. It will only suggest corrections for specific errors. If you want to rewrite your text, please use our <a href="/tool/paraphraser">Paraphraser Tool</a>.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 6. Product Description Generator (YENİ) ---
  'product-description': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Create persuasive, SEO-friendly descriptions for your e-commerce products. Convert more visitors into customers!</p>
          <ol>
            <li><strong>Enter Product Name:</strong> Be specific (e.g., &quot;Handmade Leather Wallet&quot;).</li>
            <li><strong>List Key Features:</strong> Add important details (e.g., &quot;Full-grain leather, 6 card slots, RFID blocking, minimalist design&quot;).</li>
            <li><strong>Select Tone:</strong> Choose a tone that matches your brand (&quot;Luxury,&quot; &quot;Playful,&quot; &quot;Persuasive&quot;).</li>
            <li><strong>Generate:</strong> Get several high-converting descriptions ready to be used on Shopify, Amazon, or your own site.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>From simple features to compelling copy:</p>
          <ul>
            <li><strong>Input Product:</strong> &quot;Scented Soy Candle&quot; | <strong>Features:</strong> &quot;Lavender scent, 40-hour burn, natural soy wax&quot; <br />
              <strong>→ Output:</strong> &quot;Unwind with our Lavender Bliss candle. Crafted from 100% natural soy wax, this long-lasting (40-hour!) candle fills your home with the calming scent of lavender. The perfect way to de-stress. <strong>Shop Now.</strong>&quot;</li>
            <li><strong>Input Product:</strong> &quot;Running Shoes&quot; | <strong>Features:</strong> &quot;Lightweight, mesh upper, extra cushion&quot; | <strong>Tone:</strong> &quot;Excited&quot; <br />
              <strong>→ Output:</strong> &quot;Fly past your limits! Our new running shoe features a feather-light design with a breathable mesh upper and extra-plush cushioning. Feel the difference on your next run. <strong>Get yours!</strong>&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Who is this tool for?</h2>
          <p>This tool is a game-changer for <strong>E-commerce store owners</strong>, <strong>Shopify/Etsy sellers</strong>, <strong>Amazon FBA sellers</strong>, and <strong>digital marketing agencies</strong> managing product pages.</p>
          <h2>Are the descriptions SEO-friendly?</h2>
          <p>Yes. The AI is trained to naturally weave your key features (which should include your keywords) into readable and persuasive copy, which is exactly what Google wants. It helps avoid duplicate content penalties.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>How many descriptions can I create?</dt>
            <dd>As many as you need. Our tool is 100% free.</dd>
            <dt>What&apos;s the best &quot;tone&quot; to choose?</dt>
            <dd>&quot;Persuasive&quot; is a great default for sales. &quot;Luxury&quot; works for high-end items. &quot;Playful&quot; is good for brands with a strong personality. Experiment and see what fits your brand voice!</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 7. Blog Post Idea Generator (YENİ) ---
  'blog-ideas': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Never run out of content ideas again. Generate viral, relevant, and SEO-friendly blog post titles based on your topic.</p>
          <ol>
            <li><strong>Enter Your Main Topic:</strong> Be broad but clear (e.g., &quot;digital marketing,&quot; &quot;vegan cooking,&quot; &quot;Next.js development&quot;).</li>
            <li><strong>Generate:</strong> The AI will instantly provide you with a list of 5-10 compelling blog post ideas.</li>
            <li><strong>Refine (Optional):</strong> Don&apos;t like the first batch? Hit generate again!</li>
            <li><strong>Start Writing:</strong> Copy your favorite idea and start drafting your post.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Turn a single keyword into a full content calendar:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;Vegan Cooking&quot; <br />
              <strong>→ Outputs:</strong> &quot;10 High-Protein Vegan Dinners You Can Make in 20 Minutes,&quot; &quot;The Ultimate Guide to Replacing Eggs in Baking,&quot; &quot;Is a Vegan Diet *Really* Healthier? We Investigate.&quot;</li>
            <li><strong>Input Topic:</strong> &quot;Digital Marketing&quot; <br />
              <strong>→ Outputs:</strong> &quot;5 AI Tools That Will Change Your SEO Strategy in 2026,&quot; &quot;Why Your B2B Business Needs to Be on TikTok (And How to Do It),&quot; &quot;The Death of the Third-Party Cookie: What Marketers Do Now.&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Who is this for?</h2>
          <p><strong>Bloggers</strong>, <strong>Content Marketers</strong>, <strong>SEO Specialists</strong>, and <strong>small business owners</strong> who need to maintain an active blog for their content marketing strategy.</p>
          <h2>Are these ideas SEO-friendly?</h2>
          <p>Yes. The AI is trained to generate titles that are &quot;problem-aware&quot; or &quot;list-based&quot; (e.g., &quot;How to...&quot;, &quot;10 Best...&quot;, &quot;The Ultimate Guide...&quot;), which historically perform very well in search results.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Are these ideas truly unique?</dt>
            <dd>The ideas are generated by AI, so they are &quot;unique&quot; in their combination. More importantly, they are excellent *starting points*. Your unique take on the idea is what will make the final article stand out.</dd>
            <dt>Can I generate ideas for any niche?</dt>
            <dd>Absolutely. From highly technical topics (like &quot;Kubernetes&quot;) to lifestyle niches (&quot;Home Gardening&quot;), the AI can generate relevant ideas.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 8. YouTube Video Idea Generator (YENİ) ---
  'youtube-ideas': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Instantly find viral video ideas for your YouTube channel. Stop wondering what to film next!</p>
          <ol>
            <li><strong>Enter Your Niche/Topic:</strong> What is your channel about? (e.g., &quot;Home Cooking,&quot; &quot;Coding Tutorials,&quot; &quot;Fitness Challenges&quot;).</li>
            <li><strong>Generate:</strong> The AI will brainstorm a list of compelling, high-CTR (Click-Through Rate) video titles and concepts.</li>
            <li><strong>Get Inspired:</strong> Use these ideas directly or as inspiration for your next video series.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Turn a niche into engaging content:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;Home Cooking&quot; <br />
              <strong>→ Outputs:</strong> &quot;I Made a 3-Course Meal Using Only $10,&quot; &quot;Ranking My Grandma&apos;s Secret Recipes (Will She Approve?),&quot; &quot;The 5 Biggest Mistakes You&apos;re Making With Your Cast Iron Pan.&quot;</li>
            <li><strong>Input Topic:</strong> &quot;Coding Tutorials&quot; <br />
              <strong>→ Outputs:</strong> &quot;I Cloned Netflix in 10 Hours (Watch Me Code),&quot; &quot;5 Python Libraries That Feel Like Cheating,&quot; &quot;From Zero to Full-Stack: The REALITY of Learning to Code.&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Who is this tool for?</h2>
          <p><strong>YouTubers</strong>, <strong>Content Creators</strong>, and <strong>Social Media Managers</strong> who need a steady stream of fresh, engaging video ideas.</p>
          <h2>Are these ideas &quot;SEO-friendly&quot;?</h2>
          <p>Yes. The AI is trained to think in terms of &quot;viral&quot; formats that answer specific questions (&quot;How to...&quot;), create curiosity (&quot;The 5 Biggest...&quot;), or follow popular trends (&quot;I Tried...&quot;). This is exactly what the YouTube algorithm looks for.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>How does this work?</dt>
            <dd>The AI understands popular YouTube formats (challenges, tutorials, reviews, vlogs) and applies them to your specific niche, generating titles that spark interest.</dd>
            <dt>Can I generate ideas for Shorts?</dt>
            <dd>Yes! Just add &quot;YouTube Shorts&quot; to your topic (e.g., &quot;Fitness YouTube Shorts&quot;) and the AI will generate quick, catchy ideas.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 9. Hashtag Generator (YENİ) ---
  'hashtag-generator': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Find the best hashtags to increase your post&apos;s reach and engagement on Instagram, Twitter, and LinkedIn.</p>
          <ol>
            <li><strong>Enter a Single Topic:</strong> Be specific. (e.g., &quot;Small Business,&quot; &quot;Digital Marketing,&quot; &quot;Fitness Motivation&quot;).</li>
            <li><strong>Generate:</strong> The AI will generate a list of relevant hashtags, often grouped by popularity (Niche, Medium, Broad).</li>
            <li><strong>Copy & Use:</strong> Copy the list of hashtags to paste directly into your social media post.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Get the right mix of hashtags:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;Fitness&quot; <br />
              <strong>→ Output:</strong> 
              <br /><strong>Broad (High Competition):</strong> #fitness #health #workout
              <br /><strong>Medium:</strong> #fitnessmotivation #gymlife #fitfam
              <br /><strong>Niche (High Engagement):</strong> #bodyweightworkout #homefitness #fitnesstips</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Why do I need a &quot;mix&quot; of hashtags?</h2>
          <p>Using only &quot;Broad&quot; hashtags (like #fitness) means your post will be lost in millions of others. Using &quot;Niche&quot; hashtags helps you reach a smaller, more engaged audience. A good strategy (especially on Instagram) uses a mix of all three.</p>
          <h2>How many hashtags should I use?</h2>
          <p>It depends on the platform. <strong>Instagram:</strong> 10-20 hashtags is common. <strong>Twitter (X) & LinkedIn:</strong> 2-3 relevant hashtags is best practice.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Is this different from the Social Post Generator?</dt>
            <dd>Yes. The <a href="/tool/social-post">Social Post Generator</a> creates the *entire post* and suggests 2-3 hashtags. This tool is *specialized* in finding 20-30 different hashtag *ideas* for you to choose from.</dd>
            <dt>Is this free?</dt>
            <dd>Yes, 100% free.</dd>
          </dl>
        </div>
      )
    },
  ],

  // --- 10. Business Name Generator (YENİ) ---
  'business-name': [
    {
      id: 'how-to',
      label: 'How to Use?',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>Find a creative, brandable name for your new business or project. This is a high-value tool for entrepreneurs.</p>
          <ol>
            <li><strong>Enter Keywords:</strong> Describe your business. (e.g., &quot;Eco-friendly coffee,&quot; &quot;AI marketing consultant,&quot; &quot;handmade jewelry&quot;).</li>
            <li><strong>Select Style (Optional):</strong> Choose a style like &quot;Modern,&quot; &quot;Elegant,&quot; or &quot;Techy.&quot;</li>
            <li><strong>Generate:</strong> The AI will brainstorm unique, catchy, and professional name ideas.</li>
          </ol>
        </div>
      )
    },
    {
      id: 'examples',
      label: 'Usage Examples',
      content: (
        <div className="prose prose-invert max-w-none">
          <p>From a concept to a brand:</p>
          <ul>
            <li><strong>Input Topic:</strong> &quot;Eco-friendly coffee shop&quot; <br />
              <strong>→ Outputs:</strong> &quot;Evergreen Brews,&quot; &quot;EarthBean Coffee,&quot; &quot;SustainaCafe,&quot; &quot;The Green Grind&quot;</li>
            <li><strong>Input Topic:</strong> &quot;AI marketing consultant&quot; <br />
              <strong>→ Outputs:</strong> &quot;MomentumAI,&quot; &quot;LeadGenius AI,&quot; &quot;Synapse Metrics,&quot; &quot;QuantumReach&quot;</li>
          </ul>
        </div>
      )
    },
    {
      id: 'details-faq',
      label: 'Details & FAQ',
      content: (
        <div className="prose prose-invert max-w-none">
          <h2>Who is this tool for?</h2>
          <p><strong>Entrepreneurs</strong>, <strong>startups</strong>, <strong>freelancers</strong>, and anyone launching a new product, service, or side-project who needs a catchy name.</p>
          <h2>Are these names available? (Important!)</h2>
          <p><strong>This tool is for inspiration only.</strong> We do NOT check domain availability or existing trademarks. When you find a name you love, you MUST check yourself if the .com domain is available and if it is trademarked.</p>
          <h2>Frequently Asked Questions (FAQ)</h2>
          <dl>
            <dt>Why is this tool valuable?</dt>
            <dd>Coming up with a good brand name is difficult and can cost hundreds or thousands of dollars with a branding agency. This tool gives you high-quality ideas for free, which is why it&apos;s one of the highest value (High CPC) tools for advertisers.</dd>
            <dt>Can I get more ideas?</dt>
            <dd>Yes. Just hit &quot;Generate&quot; again or slightly change your keywords to get a new batch of creative ideas.</dd>
          </dl>
        </div>
      )
    },
  ],
};

export default function ToolPageClient({ toolId }: ToolPageClientProps) {
  const ActiveComponent = toolComponents[toolId];

  if (!ActiveComponent) {
    return null;
  }

  // toolId'ye göre doğru sekme verisini TOOL_CONTENT_MAP'ten al
  const currentTabs = TOOL_CONTENT_MAP[toolId as keyof typeof TOOL_CONTENT_MAP];

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
            
            {/* YENİ AKILLI SEKMELER BÖLÜMÜ:
              'currentTabs' (o anki toolId'ye ait içerik) varsa, 
              AnimatedTabs bileşenini o içerikle render et.
            */}
            {currentTabs && (
              <div className="mx-auto flex w-full max-w-4xl justify-center">
                <motion.div
                  key={`${toolId}-tabs`} // Anahtarı dinamik hale getirdik
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="w-full px-4 mt-8" // "mt-8" ile aracın altına boşluk ekledik
                >
                  <div className="rounded-xl bg-slate-900/50 p-6 md:p-8">
                    <AnimatedTabs tabs={currentTabs} initialTabId="how-to" />
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

