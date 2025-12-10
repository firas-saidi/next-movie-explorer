'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Movie } from '@/types/movie';

interface FavoritesContextType {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
    toggleFavorite: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_KEY = 'movie-explorer-favorites';

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
        setIsHydrated(true);
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        if (isHydrated) {
            try {
                localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            } catch (error) {
                console.error('Failed to save favorites:', error);
            }
        }
    }, [favorites, isHydrated]);

    const addFavorite = (movie: Movie) => {
        setFavorites((prev) => {
            if (prev.some((m) => m.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFavorite = (movieId: number) => {
        setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isFavorite = (movieId: number) => {
        return favorites.some((m) => m.id === movieId);
    };

    const toggleFavorite = (movie: Movie) => {
        if (isFavorite(movie.id)) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
