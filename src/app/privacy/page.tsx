"use client"; // 'WorkspaceLayout' (içinde Sidebar state'i var) 'use client' gerektirir
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <WorkspaceLayout>
      <motion.div
        key="privacy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md my-8 text-slate-800">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none text-left">
            <p><strong>Last updated: 15.11.2025</strong></p>
            
            <p>At UtilityGenAI (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;), accessible from utilitygenai.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by UtilityGenAI and how we use it.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Consent</h2>
            <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Information we collect</h2>
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Log Files</h2>
            <p>UtilityGenAI follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Cookies and Web Beacons</h2>
            <p>Like any other website, UtilityGenAI uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Google DoubleClick DART Cookie</h2>
            <p>Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to utilitygenai.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600">https://policies.google.com/technologies/ads</a></p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Advertising Partners Privacy Policies</h2>
            <p>You may consult this list to find the Privacy Policy for each of the advertising partners of UtilityGenAI.</p>
            <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on UtilityGenAI, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-3">Third Party Privacy Policies</h2>
            <p>UtilityGenAI&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>
          </div>
        </div>
      </motion.div>
    </WorkspaceLayout>
  );
}

