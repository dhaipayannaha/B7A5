import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Equipment } from "@/lib/types";
import { SparklesIcon } from "lucide-react";
import Image from "next/image";





export function MyGearCard({ gear }: { gear: Equipment }) {
    return (
        <Card>
            {gear.images?.[0] && (
                <Image
                    src={gear.images[0]}
                    alt={gear.title}
                    width={400}
                    height={220}
                    className="w-full rounded-t-xl object-cover"
                    unoptimized
                />
            )}
            <CardHeader>
                <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="outline">{gear.status}</Badge>
                    <Badge variant="secondary">{gear.condition}</Badge>
                </div>
                <CardTitle className="text-lg">{gear.title}</CardTitle>
                <CardAction>
                    {/* Edit gear dialog can go here */}
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="line-clamp-3 whitespace-pre-line text-muted-foreground">
                    {gear.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>${gear.dailyRate} / day</span>
                    <span>{gear.availableQuantity} of {gear.quantity} available</span>
                </div>
                <div className="text-xs text-muted-foreground">
                    {new Date(gear.createdAt).toLocaleDateString()}
                </div>
            </CardContent>
        </Card>
    );
}