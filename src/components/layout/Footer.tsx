export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-white shadow-sm">
      <div className="mx-auto max-w-4xl p-4 text-center text-xs text-slate-500">
        <p>&copy; {currentYear} UtilityGenAI. All rights reserved.</p>
        {/* Privacy Policy link for Adsense will be added here in the future */}
      </div>
    </footer>
  );
}

