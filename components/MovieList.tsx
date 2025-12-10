'use client';

import { useState } from 'react';
import { Movie } from '@/types/movie';
import MovieGrid from './MovieGrid';
import InfiniteScroll from './InfiniteScroll';

interface MovieListProps {
    initialMovies: Movie[];
    loadMoreAction: (page: number) => Promise<Movie[]>;
}

// Helper to deduplicate movies by ID
function deduplicateMovies(movies: Movie[]): Movie[] {
    const seen = new Set<number>();
    return movies.filter((movie) => {
        if (seen.has(movie.id)) return false;
        seen.add(movie.id);
        return true;
    });
}

export default function MovieList({ initialMovies, loadMoreAction }: MovieListProps) {
    const [movies, setMovies] = useState<Movie[]>(() => deduplicateMovies(initialMovies));
    const [page, setPage] = useState(2); // Start from page 2 as page 1 is initial
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const newMovies = await loadMoreAction(page);

            if (newMovies.length === 0) {
                setHasMore(false);
            } else {
                setMovies((prev) => deduplicateMovies([...prev, ...newMovies]));
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Failed to load more movies', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <MovieGrid movies={movies} />
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} isLoading={isLoading} />
        </>
    );
}

