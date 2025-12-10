'use client';

import { Search, X, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useRef, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { searchSuggestionsAction } from '@/app/actions';
import { getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const defaultQuery = searchParams.get('q') || '';

    const [inputValue, setInputValue] = useState(defaultQuery);
    const [suggestions, setSuggestions] = useState<Movie[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch suggestions with debounce
    const fetchSuggestions = useDebouncedCallback(async (term: string) => {
        if (term.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setIsLoading(true);
        try {
            const results = await searchSuggestionsAction(term);
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, 300);

    // Handle search navigation
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        router.replace(`/search?${params.toString()}`);
    }, 500);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setSelectedIndex(-1);
        fetchSuggestions(value);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) {
            if (e.key === 'Enter') {
                handleSearch(inputValue);
                setShowSuggestions(false);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                    router.push(`/movie/${suggestions[selectedIndex].id}`);
                    setShowSuggestions(false);
                    setInputValue('');
                } else {
                    handleSearch(inputValue);
                    setShowSuggestions(false);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Clear input
    const handleClear = () => {
        setInputValue('');
        setSuggestions([]);
        setShowSuggestions(false);
        inputRef.current?.focus();
    };

    return (
        <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search movies..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    className="w-full pl-10 pr-10 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                />
                {isLoading ? (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
                ) : inputValue && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <ul className="py-2">
                        {suggestions.map((movie, index) => (
                            <li key={movie.id}>
                                <Link
                                    href={`/movie/${movie.id}`}
                                    onClick={() => {
                                        setShowSuggestions(false);
                                        setInputValue('');
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
                                        }`}
                                >
                                    {/* Movie Poster */}
                                    <div className="w-10 h-14 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={getImageUrl(movie.poster_path, 'w300')}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Movie Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                            {movie.title}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <span className="text-yellow-500">★</span>
                                                {movie.vote_average.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* View All Results Link */}
                    <div className="border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => {
                                handleSearch(inputValue);
                                setShowSuggestions(false);
                            }}
                            className="w-full px-4 py-3 text-sm text-center text-primary hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors font-medium"
                        >
                            View all results for "{inputValue}"
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
