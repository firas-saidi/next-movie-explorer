'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { Movie } from '@/types/movie';

interface FavoriteButtonProps {
    movie: Movie;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorited = isFavorite(movie.id);

    return (
        <button
            onClick={() => toggleFavorite(movie)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${favorited
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/20'
                }`}
        >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
            {favorited ? 'Saved to Favorites' : 'Add to Favorites'}
        </button>
    );
}
