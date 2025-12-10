export default function SectionSkeleton() {
    return (
        <div className="space-y-4">
            {/* Title Skeleton */}
            <div className="flex items-center gap-3">
                <div className="w-1 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>

            {/* Cards Row Skeleton */}
            <div className="flex gap-4 overflow-hidden pb-4">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="min-w-[160px] md:min-w-[200px] aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
