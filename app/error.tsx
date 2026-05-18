'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught:', error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="h-10 w-10 text-red-600" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-gray-900">Something went wrong!</h2>
      <p className="mb-8 max-w-md text-gray-600">
        An unexpected error occurred. We've been notified and are looking into it.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="min-h-[44px] min-w-[44px] rounded-full bg-brand px-6 py-2 font-bold text-white transition-colors hover:bg-brand-dark"
          aria-label="Try again"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gray-300 px-6 py-2 font-bold text-gray-700 transition-colors hover:bg-gray-50"
          aria-label="Return home"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
