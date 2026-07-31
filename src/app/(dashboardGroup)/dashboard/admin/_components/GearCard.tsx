import Image from "next/image";
import { Equipment } from "@/lib/types";
import { GearAvailabilityBadge } from "./GearAvailabilityBadge";

export function GearCard({ gear }: { gear: Equipment }) {
    return (
        <div className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
            <div className="relative h-40 w-full bg-muted">
                <Image
                    src={gear.images?.[0] ?? "/placeholder.png"}
                    alt={gear.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute right-2 top-2">
                    <GearAvailabilityBadge availability={gear.status} />
                </div>
            </div>

            <div className="space-y-3 p-4">
                <div>
                    <h3 className="line-clamp-1 font-medium">{gear.title}</h3>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{gear.description}</p>
                </div>

                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{gear.category?.name}</span>

                <div className="flex items-center gap-2 border-t pt-3">
                    <Image
                        src={gear.provider?.image ?? "/placeholder.png"}
                        alt={gear.provider?.name ?? "Provider"}
                        width={20}
                        height={20}
                        className="rounded-full"
                    />
                    <span className="line-clamp-1 text-xs text-muted-foreground">{gear.provider?.name}</span>
                </div>
            </div>
        </div>
    );
}