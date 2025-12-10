'use server';

import { getTrendingMovies, searchMovies } from '@/lib/tmdb';
import { Movie } from '@/types/movie';

export async function fetchTrendingMoviesAction(page: number): Promise<Movie[]> {
    try {
        const data = await getTrendingMovies(page);
        return data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

export async function fetchTopRatedMoviesAction(page: number): Promise<Movie[]> {
    try {
        // Dynamic import to avoid circular dependency if any, though likely not needed here.
        // Direct import is fine.
        const { getTopRatedMovies } = await import('@/lib/tmdb');
        const data = await getTopRatedMovies(page);
        return data.results;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
}

export async function searchMoviesAction(query: string, page: number): Promise<Movie[]> {
    try {
        const data = await searchMovies(query, page);
        return data.results;
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}

export async function searchSuggestionsAction(query: string): Promise<Movie[]> {
    if (!query || query.length < 2) return [];
    try {
        const data = await searchMovies(query, 1);
        return data.results.slice(0, 5); // Return only top 5 for suggestions
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
}
