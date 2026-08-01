import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageSquareIcon, MapPinIcon, ZapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Equipment } from "@/lib/types";

type NewsCardProps = {
    post: Equipment
}

export function GearCard({ post }: NewsCardProps) {
    const isAvailable = post.status === "AVAILABLE" && post.availableQuantity > 0;

    return (
        <Link href={`/gear/${post.id}`} className="block h-full group">
            <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#92a417]/10 hover:-translate-y-1 cursor-pointer border-slate-100">
                
                {/* Image Section */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    {post.images && post.images.length > 0 ? (
                        <Image
                            src={post.images[0]}
                            alt={post.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400 text-xs">
                            No image
                        </div>
                    )}
                    
                    {/* Top Right: Availability Badge */}
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className={`shadow-sm backdrop-blur-md ${isAvailable ? 'bg-white/90 text-emerald-700 hover:bg-white/90' : 'bg-white/90 text-red-600 hover:bg-white/90'}`}>
                            <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                            {isAvailable ? 'Available' : 'Unavailable'}
                        </Badge>
                    </div>

                    {/* Bottom Left: Category Badge */}
                    {post.category?.name && (
                        <div className="absolute bottom-3 left-3">
                            <Badge className="bg-[#041334]/80 hover:bg-[#041334] text-white backdrop-blur-sm border-none shadow-sm gap-1">
                                <MapPinIcon className="h-3 w-3" />
                                {post.category.name}
                            </Badge>
                        </div>
                    )}
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg font-bold text-[#041334] line-clamp-1 group-hover:text-[#92a417] transition-colors">
                            {post.title}
                        </CardTitle>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">
                        {post.brand} {post.model ? `· ${post.model}` : ''}
                    </p>
                </CardHeader>
                
                <CardContent className="p-4 pt-2 flex-grow">
                    <p className="line-clamp-2 text-sm text-slate-600">
                        {post.description || post.content}
                    </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex items-end justify-between mt-auto border-t border-slate-50">
                    <div className="flex flex-col pt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Daily Rate</span>
                        <div className="flex items-end gap-0.5">
                            <span className="text-lg font-extrabold text-[#041334]">৳{post.dailyRate?.toLocaleString() || 0}</span>
                            <span className="text-xs text-slate-500 font-medium mb-1">/day</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end pt-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Provider</span>
                        <span className="text-xs font-semibold text-slate-700 line-clamp-1 max-w-[100px]">
                            {post.provider?.name ?? "Unknown"}
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}