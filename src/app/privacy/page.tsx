import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | UtilityGenAI",
  description: "Privacy Policy for UtilityGenAI tools and services.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8 text-slate-300">
      <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
      <div className="prose prose-slate prose-invert max-w-none">
        <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          At UtilityGenAI, accessible from utilitygenai.com, one of our main priorities is the privacy of our visitors.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Log Files</h3>
        <p>
          UtilityGenAI follows a standard procedure of using log files. These files log visitors when they visit
          websites.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Cookies and Web Beacons</h3>
        <p>
          Like any other website, UtilityGenAI uses "cookies". These cookies are used to store information including
          visitors' preferences.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Google DoubleClick DART Cookie</h3>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads
          to our site visitors based upon their visit to utilitygenai.com and other sites on the internet.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-white">Consent</h3>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
      </div>
    </div>
  );
}

