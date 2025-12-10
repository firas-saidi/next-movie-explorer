export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Backdrop Skeleton */}
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800">
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col md:flex-row gap-6 md:items-end z-10">
                    {/* Poster Skeleton */}
                    <div className="hidden md:block w-32 h-48 shrink-0 rounded-lg bg-gray-300 dark:bg-gray-700" />

                    <div className="flex-1 space-y-4">
                        {/* Title Skeleton */}
                        <div className="h-10 md:h-14 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg" />

                        {/* Meta Info Skeleton */}
                        <div className="flex gap-4">
                            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
                        </div>

                        {/* Genres Skeleton */}
                        <div className="flex gap-2 pt-2">
                            <div className="h-6 w-16 bg-white/20 rounded-full" />
                            <div className="h-6 w-20 bg-white/20 rounded-full" />
                            <div className="h-6 w-14 bg-white/20 rounded-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Overview Skeleton */}
                    <div className="space-y-3">
                        <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
                        </div>
                    </div>

                    {/* Cast Skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                        <div className="flex gap-4 overflow-hidden">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="min-w-[120px] space-y-2">
                                    <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-lg" />
                                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Trailer Skeleton */}
                    <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl" />

                    {/* Details Checkbox Skeleton */}
                    <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
