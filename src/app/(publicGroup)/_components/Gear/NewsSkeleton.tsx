import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

export default function NewsSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="flex flex-col h-full overflow-hidden border-slate-100 shadow-sm animate-pulse">
                    {/* Image Skeleton */}
                    <div className="relative aspect-[4/3] w-full bg-slate-200" />
                    
                    {/* Content Skeleton */}
                    <CardHeader className="p-4 pb-2 space-y-2">
                        <div className="h-5 w-3/4 bg-slate-200 rounded-md" />
                        <div className="h-3 w-1/2 bg-slate-200 rounded-md" />
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-2 flex-grow space-y-2">
                        <div className="h-3 w-full bg-slate-200 rounded-md" />
                        <div className="h-3 w-5/6 bg-slate-200 rounded-md" />
                    </CardContent>

                    {/* Footer Skeleton */}
                    <CardFooter className="p-4 pt-0 flex items-end justify-between mt-auto border-t border-slate-50">
                        <div className="flex flex-col pt-3 gap-1">
                            <div className="h-2.5 w-16 bg-slate-200 rounded-sm" />
                            <div className="h-6 w-20 bg-slate-200 rounded-md" />
                        </div>
                        <div className="flex flex-col items-end pt-3 gap-1">
                            <div className="h-2.5 w-12 bg-slate-200 rounded-sm" />
                            <div className="h-3 w-16 bg-slate-200 rounded-md" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}