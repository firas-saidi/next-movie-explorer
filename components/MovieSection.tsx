import { MovieResponse } from '@/types/movie';
import MovieCard from './MovieCard';

interface MovieSectionProps {
    title: string;
    fetcher: () => Promise<MovieResponse>;
}

export default async function MovieSection({ title, fetcher }: MovieSectionProps) {
    const data = await fetcher();
    const movies = data.results;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-primary to-purple-600" />
                <h2 className="text-2xl font-bold text-primary dark:text-primary">
                    {title}
                </h2>
            </div>

            <div className="relative group">
                <div className="flex gap-6 overflow-x-auto pb-8 pt-2 px-1 scrollbar-hide snap-x snap-mandatory">
                    {movies.map((movie) => (
                        <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Fade effects for scrolling */}
                <div className="absolute top-0 right-0 bottom-8 w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 bottom-8 w-12 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
    );
}
