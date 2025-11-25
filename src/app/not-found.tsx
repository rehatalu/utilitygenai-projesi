import Link from 'next/link';
import WorkspaceLayout from '@/components/layout/WorkspaceLayout';
import { HiOutlineEmojiSad } from 'react-icons/hi';

export default function NotFound() {
  return (
    <WorkspaceLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="bg-slate-900 p-6 rounded-full mb-6 ring-1 ring-slate-800">
          <HiOutlineEmojiSad className="h-24 w-24 text-indigo-500" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-slate-400 max-w-md mb-8">
          Oops! It seems the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
        >
          Return to Workspace
        </Link>
      </div>
    </WorkspaceLayout>
  );
}




