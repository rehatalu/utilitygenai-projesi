"use client";
import WorkspaceLayout from "@/components/layout/WorkspaceLayout";
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-slate-900 dark:text-white">
          About UtilityGenAI
        </h1>

        <section className="mb-12">
          <p className="text-lg text-center text-slate-600 dark:text-slate-300 leading-relaxed">
            UtilityGenAI is your ultimate digital companion, designed to simplify the complex. In a world where time is
            the most valuable asset, we provide a comprehensive suite of AI-powered tools that help you work smarter,
            not harder. Whether you are a student, a creative professional, or an entrepreneur, our platform is built
            to be the one-stop solution for your daily productivity needs.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
            Our mission is simple: To give you back your time. We believe that powerful technology should be
            accessible, intuitive, and indispensable. By combining dozens of essential utilities—from content
            generation to code optimization—under one roof, we eliminate the need for multiple subscriptions and
            complicated software. We are here to streamline your workflow so you can focus on what truly matters.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 text-center">Why Free?</h2>
          <p className="text-lg text-center text-slate-600 dark:text-slate-300 leading-relaxed">
            We operate on a freemium model supported by non-intrusive ads, allowing us to keep these essential tools
            free for our global community. This sustainable approach ensures that powerful AI capabilities are never
            behind a paywall.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Contact Us</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            For support, feedback, or partnership inquiries, please contact us at:
            <br />
            <a href="mailto:hello@utilitygenai.com" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
              hello@utilitygenai.com
            </a>
          </p>
        </section>
      </article>
    </main>
  );
}
