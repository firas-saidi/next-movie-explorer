import { MovieDetail, MovieResponse } from '@/types/movie';

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const query = new URLSearchParams(params).toString();
    const url = `${TMDB_API_URL}${endpoint}?${query}`;

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`Failed to fetch from TMDB: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export const getTrendingMovies = async (page: number = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/trending/movie/week', {
        page: page.toString(),
        language: 'en-US',
    });
};

export const getMovieDetails = async (id: string): Promise<MovieDetail> => {
    return fetchTMDB<MovieDetail>(`/movie/${id}`, {
        append_to_response: 'credits,videos',
        language: 'en-US',
    });
};

export const searchMovies = async (query: string, page: number = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/search/movie', {
        query,
        page: page.toString(),
        include_adult: 'false',
        language: 'en-US',
    });
};

export const getImageUrl = (path: string, size: 'w300' | 'w500' | 'w1280' | 'original' = 'w500') => {
    if (!path) return '/placeholder.png'; // Make sure to handle missing images
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getMoviesByGenre = async (genreId: string, page: number = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/discover/movie', {
        with_genres: genreId,
        page: page.toString(),
        sort_by: 'popularity.desc',
        include_adult: 'false',
        language: 'en-US',
    });
};

export const getTopComedyMovies = (page: number = 1) => getMoviesByGenre('35', page);
export const getTopHorrorMovies = (page: number = 1) => getMoviesByGenre('27', page);
export const getTopAnimatedMovies = (page: number = 1) => getMoviesByGenre('16', page);

export const getTopRatedMovies = async (page: number = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/movie/top_rated', {
        page: page.toString(),
        language: 'en-US',
    });
};
