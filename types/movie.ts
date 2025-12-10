export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    overview: string;
}

export interface MovieDetail extends Movie {
    runtime: number;
    genres: { id: number; name: string }[];
    credits?: {
        cast: Cast[];
    };
    videos?: {
        results: Video[];
    };
}

export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
