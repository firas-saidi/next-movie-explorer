'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import MovieGrid from './MovieGrid';
import InfiniteScroll from './InfiniteScroll';
import { searchMoviesAction } from '@/app/actions';

interface SearchMovieListProps {
    initialMovies: Movie[];
    query: string;
}

export default function SearchMovieList({ initialMovies, query }: SearchMovieListProps) {
    const [movies, setMovies] = useState<Movie[]>(initialMovies);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Reset state when query changes
    useEffect(() => {
        setMovies(initialMovies);
        setPage(2);
        setHasMore(true);
    }, [query, initialMovies]);

    const loadMore = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const newMovies = await searchMoviesAction(query, page);

            if (newMovies.length === 0) {
                setHasMore(false);
            } else {
                setMovies((prev) => [...prev, ...newMovies]);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Failed to load more search results', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (!query) return null;

    return (
        <>
            {movies.length > 0 ? (
                <MovieGrid movies={movies} />
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">No movies found for "{query}"</p>
                </div>
            )}
            {movies.length > 0 && <InfiniteScroll loadMore={loadMore} hasMore={hasMore} isLoading={isLoading} />}
        </>
    );
}
