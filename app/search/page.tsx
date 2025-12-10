import { searchMovies } from '@/lib/tmdb';
import SearchMovieList from '@/components/SearchMovieList';
import SearchBar from '@/components/SearchBar';
import { Metadata } from 'next';
import { Movie } from '@/types/movie';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `Search: ${q} - Movie Explorer` : 'Search Movies - Movie Explorer',
        description: 'Search for your favorite movies.',
    };
}

type Props = {
    searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
    const { q } = await searchParams;
    const query = q || '';
    let initialMovies: Movie[] = [];

    if (query) {
        const data = await searchMovies(query, 1);
        initialMovies = data.results;
    }

    return (
        <div className="space-y-8">
            <header className="space-y-6">
                <h1 className="text-3xl font-bold">
                    {query ? `Results for "${query}"` : 'Search Movies'}
                </h1>
                <SearchBar />
            </header>

            {query ? (
                <SearchMovieList initialMovies={initialMovies} query={query} />
            ) : (
                <div className="text-center py-20 text-gray-500">
                    Type something in the search bar to find movies.
                </div>
            )}
        </div>
    );
}
