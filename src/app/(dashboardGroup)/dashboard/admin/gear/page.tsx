import { Equipment } from "@/lib/types";
import { GearGrid } from "../_components/GearGrid";
import { getAllGear } from "../_actions/getAllGear";

export default async function AdminGearPage() {
    const result = await getAllGear();
    const gearItems: Equipment[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-semibold text-[#041334]">Gear Listings</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {gearItems.length} item{gearItems.length !== 1 ? "s" : ""} across the platform
                    </p>
                </div>
            </div>

            {gearItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No gear listed yet</p>
                </div>
            ) : (
                <GearGrid items={gearItems} />
            )}
        </div>
    );
}