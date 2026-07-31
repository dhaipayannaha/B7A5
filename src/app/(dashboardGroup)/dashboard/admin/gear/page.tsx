
import { Equipment } from "@/lib/types";
import { GearCard } from "../_components/GearCard";
import { getAllGear } from "../_actions/getAllGear";

export default async function AdminGearPage() {
    const result = await getAllGear();
    const gearItems: Equipment[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Gear Listings</h1>
                <p className="text-sm text-muted-foreground">
                    {gearItems.length} item{gearItems.length !== 1 ? "s" : ""}
                </p>
            </div>

            {gearItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No gear listed yet</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {gearItems.map((gear) => (
                        <GearCard key={gear.id} gear={gear} />
                    ))}
                </div>
            )}
        </div>
    );
}