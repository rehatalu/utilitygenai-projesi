import Link from "next/link";

const tools = [
  {
    name: "Email Subject Line Generator",
    description: "Craft compelling subject lines tailored to your campaign in seconds.",
    href: "/tools/email-subject-generator",
  },
  {
    name: "Coming Soon",
    description: "Stay tuned for more AI-powered productivity tools.",
    href: "#",
    disabled: true,
  },
  {
    name: "Coming Soon",
    description: "More calculators and automation utilities are on the way.",
    href: "#",
    disabled: true,
  },
];

const features = [
  {
    title: "No Sign-Up Required",
    description: "Jump straight into the tools without creating an account.",
  },
  {
    title: "Fast & Reliable",
    description: "Built on modern infrastructure to deliver results instantly.",
  },
  {
    title: "Constantly Growing",
    description: "We ship new AI assistants and calculators every week.",
  },
];

const workflow = [
  {
    title: "Pick a tool",
    description: "Choose the AI assistant or calculator that matches your task.",
  },
  {
    title: "Enter your details",
    description: "Provide the key information — nothing more, nothing less.",
  },
  {
    title: "Get instant results",
    description: "Copy, share, or refine outcomes tailored to your use case.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-40" />
        </div>
        <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-indigo-400/30 blur-3xl" />
        <div className="absolute -bottom-32 left-16 hidden h-[380px] w-[380px] rounded-full bg-purple-500/25 blur-3xl lg:block" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-24 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
              UtilityGenAI · Free AI & Utility Tools
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Launch smarter workflows with AI micro tools built for growth.
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Generate email subject lines, automate repetitive tasks, and explore a growing library of one-click utilities — all tailored for marketers, founders, and operators.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#tools"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-lg shadow-indigo-500/30 transition hover:scale-[1.03]"
              >
                <span className="absolute inset-0 translate-y-[110%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 transition duration-500 group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2 text-indigo-600 transition group-hover:text-white">
                  <span>Browse AI Tools</span>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600 transition group-hover:bg-white/20 group-hover:text-white">
                    →
                  </span>
                </span>
              </Link>
              <Link
                href="#newsletter"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Get updates
              </Link>
            </div>
          </div>
          <div className="relative mx-auto max-w-xl lg:mx-0">
            <div className="relative">
              <div className="pointer-events-none absolute -top-16 -right-14 z-20 flex h-12 w-40 items-center justify-center rounded-full bg-white/20 text-sm font-medium text-white/80 backdrop-blur">
                New tools weekly
              </div>
              <div className="pointer-events-none animate-float-slow absolute -left-36 -top-4 z-10 hidden rounded-2xl border border-white/40 bg-white/10 p-4 text-white/80 backdrop-blur md:block">
                <p className="text-xs uppercase tracking-wide text-white/70">Live stats</p>
                <p className="mt-1 text-lg font-semibold text-white">2,418 subject lines generated</p>
              </div>
              <div className="pointer-events-none animate-float-slower absolute -bottom-20 -right-24 z-10 hidden w-52 rounded-2xl border border-white/40 bg-white/10 p-4 text-white/80 backdrop-blur md:block">
                <p className="text-xs uppercase tracking-wide text-white/70">Most used tool</p>
                <p className="mt-2 text-sm font-medium text-white">AI Email Subject Line Generator</p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs text-white/60">
                  ★ Rated 4.9/5
                </span>
              </div>
              <div className="rounded-3xl bg-white/10 p-6 shadow-2xl shadow-indigo-900/40 backdrop-blur">
                <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                      Featured Tool
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" />
                      Live
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-slate-900">
                    Email Subject Line Generator
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Turn any campaign idea into high-converting subject lines trained with proven copywriting frameworks.
                  </p>
                  <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    <span className="font-medium text-slate-700">Example:</span> Launching a new product? Get five ready-to-send subject lines in milliseconds.
                  </div>
                  <Link
                    href="/tools/email-subject-generator"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                  >
                    Try it now
                    <span className="text-lg leading-none">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tools & Calculators</h2>
          <p className="mt-4 text-lg text-slate-600">
            Discover focused AI helpers designed to save you hours on copywriting, planning, forecasting, and more.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 ring-4 ring-indigo-50" />
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{tool.name}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{tool.description}</p>
              {tool.disabled ? (
                <span className="mt-6 inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-400">
                  Coming soon
                </span>
              ) : (
                <Link
                  href={tool.href}
                  className="mt-6 inline-flex items-center rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                >
                  Use tool
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-24 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-white/70">
              A streamlined experience built for busy teams and independent makers.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {workflow.map((step, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Reliable by design</h2>
            <p className="mt-4 text-lg text-slate-600">
              UtilityGenAI is built with performance, privacy, and clarity in mind. Every tool is crafted to remove guesswork and deliver trustworthy results.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <blockquote className="text-lg font-medium text-slate-900">
              “We’re building the AI toolkit we wish existed — quick, helpful, and ready to embed into any workflow.”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-indigo-100" />
              <div>
                <p className="text-sm font-semibold text-slate-900">UtilityGenAI Team</p>
                <p className="text-sm text-slate-500">Product & Engineering</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-10 text-white shadow-2xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Get early access to new tools</h2>
            <p className="mt-4 text-white/80">
              Join the mailing list and receive launch updates, productivity tips, and exclusive beta invites.
            </p>
            <form className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-full border border-white/30 bg-white/10 px-5 text-base text-white placeholder-white/60 outline-none backdrop-blur transition focus:border-white focus:ring-2 focus:ring-white/70 sm:w-auto sm:min-w-[280px]"
              />
              <button
                type="button"
                className="h-12 rounded-full bg-white px-8 text-base font-semibold text-indigo-600 shadow-lg shadow-indigo-900/30 transition hover:scale-105"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-white/70">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} UtilityGenAI. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-700">
              Privacy
            </Link>
            <Link href="#" className="hover:text-slate-700">
              Terms
            </Link>
            <Link href="#" className="hover:text-slate-700">
              Contact
          </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

