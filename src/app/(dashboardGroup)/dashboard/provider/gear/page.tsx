import { PostFormDialog } from "@/app/(dashboardGroup)/_components/For Provider/PostFromDialog";
import { getGear } from "@/app/(publicGroup)/_actions/getGear";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Equipment } from "@/lib/types";
import { SparklesIcon } from "lucide-react";
import Image from "next/image";

// ── Single gear card ──────────────────────────────────────────────────────────

function MyGearCard({ gear }: { gear: Equipment }) {
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function MyPostGearPage() {
    const result = await getGear();
    const gears: Equipment[] = result?.data ?? [];

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Gear</h1>
                    <p className="text-sm text-muted-foreground">
                        {gears.length} item{gears.length !== 1 ? "s" : ""} listed
                    </p>
                </div>
                <PostFormDialog mode="create" />
            </div>

            {/* Grid */}
            {gears.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No gear listed yet</p>
                    <p className="mt-1 text-xs">Add your first equipment to get started.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gears.map((gear) => (
                        <MyGearCard key={gear.id} gear={gear} />
                    ))}
                </div>
            )}
        </div>
    );
}