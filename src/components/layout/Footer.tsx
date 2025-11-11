export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 text-xs text-slate-500">
        <p>&copy; {currentYear} UtilityGenAI. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-slate-800">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-800">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

