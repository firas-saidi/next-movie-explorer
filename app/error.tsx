'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    We encountered an error while loading this page. Please try again later.
                </p>
            </div>
            <button
                onClick={() => reset()}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:opacity-90 transition-opacity font-medium"
            >
                <RefreshCw className="w-4 h-4" />
                Try again
            </button>
        </div>
    );
}
