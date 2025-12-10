import { getTrendingMovies, getTopComedyMovies, getTopHorrorMovies, getTopAnimatedMovies, getTopRatedMovies } from '@/lib/tmdb';
import MovieSection from '@/components/MovieSection';
import SectionSkeleton from '@/components/SectionSkeleton';
import MovieList from '@/components/MovieList'; // Use the infinite scroll list
import { fetchTopRatedMoviesAction } from '@/app/actions';
import { Metadata } from 'next';
import { TrendingUp, Sparkles, Star } from 'lucide-react';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Trending Movies - Movie Explorer',
  description: 'Discover the latest trending movies worldwide.',
};

export const revalidate = 3600;

export default async function Home() {
  const topRatedData = await getTopRatedMovies(1);
  const topRatedMovies = topRatedData.results;

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-primary to-pink-500 p-8 md:p-12 shadow-2xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm shadow-inner">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">Updated weekly</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
            Trending Now
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-light">
            Discover the most popular movies this week. Explore blockbusters, hidden gems, and everything in between.
          </p>
        </div>
      </section>

      {/* Movie Sections (Horizontal Scroll) */}
      <div className="space-y-12">
        <Suspense fallback={<SectionSkeleton />}>
          <MovieSection title="This Week's Top Movies" fetcher={() => getTrendingMovies(1)} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <MovieSection title="Top Comedy Movies" fetcher={() => getTopComedyMovies(1)} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <MovieSection title="Top Horror Movies" fetcher={() => getTopHorrorMovies(1)} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <MovieSection title="Top Animated Movies" fetcher={() => getTopAnimatedMovies(1)} />
        </Suspense>
      </div>

      {/* Top Rated Infinite Scroll Section */}
      <section className="space-y-6 pt-10 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-primary dark:text-primary">
            Top Rated of All Time
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          The most critically acclaimed movies, loaded endlessly for your browsing pleasure.
        </p>

        <MovieList initialMovies={topRatedMovies} loadMoreAction={fetchTopRatedMoviesAction} />
      </section>
    </div>
  );
}
