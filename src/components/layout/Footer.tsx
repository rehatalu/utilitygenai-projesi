import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50 py-4 px-4 sm:px-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          <Link href="/privacy" className="hover:text-white transition">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition">
            Terms of Service
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact Us
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About Us
          </Link>
        </div>
        <div className="text-center sm:text-right">
          <p>&copy; {new Date().getFullYear()} UtilityGenAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

