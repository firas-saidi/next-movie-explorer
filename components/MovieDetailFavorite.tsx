'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { MovieDetail } from '@/types/movie';

interface MovieDetailFavoriteProps {
    movie: MovieDetail;
}

export default function MovieDetailFavorite({ movie }: MovieDetailFavoriteProps) {
    const { isFavorite, toggleFavorite } = useFavorites();

    // Convert MovieDetail to Movie for favorites context
    const movieData = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview,
    };

    const favorited = isFavorite(movie.id);

    return (
        <button
            onClick={() => toggleFavorite(movieData)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${favorited
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border border-white/20'
                }`}
        >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
            {favorited ? 'Saved' : 'Add to Favorites'}
        </button>
    );
}
