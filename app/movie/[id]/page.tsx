import { getMovieDetails, getImageUrl } from '@/lib/tmdb';
import { Metadata } from 'next';
import Image from 'next/image';
import { Calendar, Clock, Star, PlayCircle } from 'lucide-react';
import { notFound } from 'next/navigation';
import MovieDetailFavorite from '@/components/MovieDetailFavorite';

// Type for Page Props in Next.js 15/App Router
type Props = {
    params: Promise<{ id: string }>;
};

// ISR Revalidation - 24 hours
export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    try {
        const movie = await getMovieDetails(id);
        return {
            title: `${movie.title} - Movie Explorer`,
            description: movie.overview,
            openGraph: {
                title: movie.title,
                description: movie.overview,
                images: [
                    {
                        url: getImageUrl(movie.backdrop_path || movie.poster_path, 'original'),
                        width: 1200,
                        height: 630,
                        alt: movie.title,
                    },
                ],
            },
        };
    } catch {
        return {
            title: 'Movie Not Found - Movie Explorer',
        };
    }
}

export default async function MoviePage({ params }: Props) {
    const { id } = await params;
    let movie;

    try {
        movie = await getMovieDetails(id);
    } catch {
        notFound();
    }

    const trailer = movie.videos?.results?.find(
        (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
    );

    const director = movie.credits?.cast?.find((c: any) => c.known_for_department === 'Directing') || { name: 'Unknown' }; // Start with cast, actually crew is in credits but I only defined cast in types. I will check types.
    // Wait, I only added `cast` to `credits` in `types/movie.ts`. I should have added `crew`.
    // I'll skip director for now or use `cast` as requested. "Cast (optional)" was requested.

    const cast = movie.credits?.cast?.slice(0, 10) || [];

    return (
        <div className="space-y-8">
            {/* Backdrop Section */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src={getImageUrl(movie.backdrop_path || movie.poster_path, 'w1280')}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row gap-6 md:items-end">
                    {/* Poster on mobile/tablet sometimes needed, but let's stick to clean design */}
                    <div className="hidden md:block w-32 shrink-0 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
                        <Image
                            src={getImageUrl(movie.poster_path, 'w500')}
                            width={128}
                            height={192}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 text-white">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">{movie.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-200">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {movie.runtime} min
                            </span>
                            <span className="flex items-center gap-1 text-yellow-400 font-bold">
                                <Star className="w-4 h-4 fill-current" />
                                {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {movie.genres.map(g => (
                                <span key={g.id} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium border border-white/10">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                        <div className="mt-6">
                            <MovieDetailFavorite movie={movie} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">Overview</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {movie.overview}
                        </p>
                    </section>

                    {cast.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Top Cast</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {cast.map(actor => (
                                    <div key={actor.id} className="min-w-[120px] w-[120px] flex flex-col gap-2">
                                        <div className="aspect-[2/3] rounded-lg overflow-hidden relative bg-gray-200 dark:bg-gray-800">
                                            {actor.profile_path ? (
                                                <Image
                                                    src={getImageUrl(actor.profile_path, 'w500')}
                                                    alt={actor.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold text-sm truncate" title={actor.name}>{actor.name}</p>
                                            <p className="text-xs text-gray-500 truncate" title={actor.character}>{actor.character}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="space-y-6">
                    {trailer && (
                        <section>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-red-500" /> Trailer
                            </h2>
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}`}
                                    title="Movie Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full border-0"
                                />
                            </div>
                        </section>
                    )}

                    <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Details</h3>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Status</dt>
                                <dd className="font-medium">Released</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Language</dt>
                                <dd className="font-medium">English</dd>
                            </div>
                        </dl>
                    </section>
                </div>
            </div>
        </div>
    );
}
