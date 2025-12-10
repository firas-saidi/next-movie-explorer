'use client';

import Link from 'next/link';
import { Film, Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import SearchBar from './SearchBar';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { useFavorites } from '@/context/FavoritesContext';

export default function Navbar() {
    const pathname = usePathname();
    const isSearchPage = pathname === '/search';
    const { favorites } = useFavorites();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800  dark:bg-gray-950">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <Link href="/" className="flex items-center space-x-2 shrink-0">
                    <Film className="w-6 h-6 text-primary" />
                    <span className="font-bold text-xl hidden sm:inline-block bg-gradient-to-r from-primary to-purple-600 dark:to-purple-300 bg-clip-text text-transparent">
                        Movie Explorer
                    </span>
                </Link>

                {!isSearchPage && (
                    <div className="flex-1 max-w-md hidden md:block">
                        <Suspense fallback={<div className="w-full h-10 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse" />}>
                            <SearchBar />
                        </Suspense>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    {/* Favorites Link */}
                    <Link
                        href="/favorites"
                        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Favorites"
                    >
                        <Heart className={`w-5 h-5 ${pathname === '/favorites' ? 'text-red-500 fill-current' : 'text-gray-700 dark:text-gray-300'}`} />
                        {favorites.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                                {favorites.length > 9 ? '9+' : favorites.length}
                            </span>
                        )}
                    </Link>

                    {!isSearchPage && (
                        <Link href="/search" className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-search text-gray-700 dark:text-gray-300"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" x2="16.65" y1="21" y2="16.65" />
                            </svg>
                        </Link>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
