import { providerPost } from "@/app/(dashboardGroup)/_actions/ProviderPost";
import { MyGearCard } from "@/app/(dashboardGroup)/_components/For Provider/MyGearCard";
import { PostFormDialog } from "@/app/(dashboardGroup)/_components/For Provider/PostFromDialog";
import { getGear } from "@/app/(publicGroup)/_actions/getGear";
import { Equipment } from "@/lib/types";
import { jwtUtils } from "@/utilies/jwt";
import { cookies } from "next/headers";

export default async function MyPostGearPage() {
    const myGears: Equipment[] = await providerPost()

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Gear</h1>
                    <p className="text-sm text-muted-foreground">
                        {myGears.length} item{myGears.length !== 1 ? "s" : ""} listed
                    </p>
                </div>
                <PostFormDialog mode="create" />
            </div>

            {/* Grid */}
            {myGears.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No gear listed yet</p>
                    <p className="mt-1 text-xs">Add your first equipment to get started.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {myGears.map((gear) => (
                        <MyGearCard key={gear.id} gear={gear} />
                    ))}
                </div>
            )}
        </div>
    );
}