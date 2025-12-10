import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">Page not found</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                    Sorry, we couldn't find the page you're looking for. It might have been removed or doesn't exist.
                </p>
            </div>
            <Link
                href="/"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium"
            >
                <Home className="w-4 h-4" />
                Back to Home
            </Link>
        </div>
    );
}
