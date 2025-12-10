'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollProps {
    loadMore: () => Promise<void>;
    hasMore: boolean;
    isLoading: boolean;
}

export default function InfiniteScroll({ loadMore, hasMore, isLoading }: InfiniteScrollProps) {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '100px',
    });

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            loadMore();
        }
    }, [inView, hasMore, isLoading, loadMore]);

    if (!hasMore) return null;

    return (
        <div ref={ref} className="w-full py-8 flex justify-center">
            {isLoading && <Loader2 className="w-8 h-8 animate-spin text-primary" />}
        </div>
    );
}
