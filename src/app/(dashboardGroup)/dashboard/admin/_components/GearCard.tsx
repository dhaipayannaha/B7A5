"use client";

import { useTransition } from "react";
import Image from "next/image";
import { MoreVertical, Trash2 } from "lucide-react";
import { deleteGearItem, updateGearAvailability } from "../_actions/updateGearAvailability";
import { GearAvailabilityBadge } from "./GearAvailabilityBadge";

const AVAILABILITY_OPTIONS = ["AVAILABLE", "RENTED", "MAINTENANCE", "UNAVAILABLE"] as const;

export function GearCard({ gear }: { gear: GearItem }) {
    const [isPending, startTransition] = useTransition();

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        startTransition(async () => {
            const result = await updateGearAvailability(gear.id, value);
            if (!result.success) {
                alert(result.message ?? "Failed to update availability");
            }
        });
    };

    const handleDelete = () => {
        if (!confirm(`Remove "${gear.name}" from listings?`)) return;
        startTransition(async () => {
            const result = await deleteGearItem(gear.id);
            if (!result.success) {
                alert(result.message ?? "Failed to delete gear item");
            }
        });
    };

    return (
        <div className="group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
            <div className="relative h-40 w-full bg-muted">
                <Image
                    src={gear.image}
                    alt={gear.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute right-2 top-2">
                    <GearAvailabilityBadge availability={gear.availability} />
                </div>
            </div>

            <div className="space-y-3 p-4">
                <div>
                    <h3 className="line-clamp-1 font-medium">{gear.name}</h3>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{gear.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">৳{gear.pricePerDay}/day</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{gear.category}</span>
                </div>

                <div className="flex items-center gap-2 border-t pt-3">
                    <Image
                        src={gear.owner.image}
                        alt={gear.owner.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                    />
                    <span className="line-clamp-1 text-xs text-muted-foreground">{gear.owner.name}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <select
                        value={gear.availability}
                        onChange={handleAvailabilityChange}
                        disabled={isPending}
                        className="flex-1 rounded-md border px-2 py-1.5 text-xs disabled:opacity-50"
                    >
                        {AVAILABILITY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleDelete}
                        disabled={isPending}
                        className="rounded-md border p-1.5 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title="Delete gear item"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}