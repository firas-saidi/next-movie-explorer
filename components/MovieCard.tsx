'use client';

import { Movie } from '@/types/movie';
import { getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '@/context/FavoritesContext';

interface MovieCardProps {
    movie: Movie;
    priority?: boolean;
}

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(movie.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
            {/* Favorite Button */}
            <button
                onClick={handleFavoriteClick}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${favorited
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-black/40 text-white hover:bg-red-500'
                    }`}
                aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            </button>

            <Link href={`/movie/${movie.id}`}>
                <div className="relative aspect-[2/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading={priority ? 'eager' : 'lazy'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate" title={movie.title}>
                        {movie.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
