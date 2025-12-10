'use client';

import { useFavorites } from '@/context/FavoritesContext';
import MovieGrid from '@/components/MovieGrid';
import { Heart, Film } from 'lucide-react';
import Link from 'next/link';

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="space-y-8">
            {/* Header */}
            <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 p-8 md:p-12">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm">
                            <Heart className="w-6 h-6 text-white fill-current" />
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        My Favorites
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl">
                        Your personal collection of must-watch movies.
                    </p>
                </div>
            </header>

            {/* Content */}
            {favorites.length > 0 ? (
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-red-500 to-pink-600" />
                            <h2 className="text-2xl font-bold text-primary dark:text-primary">
                                Saved Movies
                            </h2>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'}
                        </span>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-100/50 to-gray-200/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-3xl blur-xl" />
                        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                            <MovieGrid movies={favorites} />
                        </div>
                    </div>
                </section>
            ) : (
                <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                        <Film className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        No favorites yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Start exploring movies and click the heart icon to save your favorites here.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-full hover:shadow-lg transition-shadow"
                    >
                        <Film className="w-5 h-5" />
                        Explore Movies
                    </Link>
                </div>
            )}
        </div>
    );
}
