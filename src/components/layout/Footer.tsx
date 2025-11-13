import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-xs text-slate-400">
        <p>&copy; {currentYear} UtilityGenAI. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

