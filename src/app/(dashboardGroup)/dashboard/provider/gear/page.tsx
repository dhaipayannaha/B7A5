import { providerPost } from "@/app/(dashboardGroup)/_actions/ProviderPost";
import { MyGearCard } from "@/app/(dashboardGroup)/_components/For Provider/MyGearCard";
import { PostFormDialog } from "@/app/(dashboardGroup)/_components/For Provider/PostFromDialog";
import { Equipment } from "@/lib/types";
import { PackageOpen, Search } from "lucide-react";

export default async function ProviderGearPage() {
    const myGears: Equipment[] = await providerPost();

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/60">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417]">
                        <PackageOpen className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#041334]">My Gear Inventory</h1>
                        <p className="text-sm font-medium text-slate-500">
                            You have {myGears.length} item{myGears.length !== 1 ? "s" : ""} listed on the platform
                        </p>
                    </div>
                </div>
                <div>
                    <PostFormDialog mode="create" />
                </div>
            </div>

            {/* Grid */}
            {myGears.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-100/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] py-24 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4">
                        <Search className="h-8 w-8" />
                    </div>
                    <p className="text-base font-medium text-slate-600">No gear listed yet</p>
                    <p className="text-sm text-slate-400 mb-4">
                        Add your first equipment to get started and start earning!
                    </p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {myGears.map((gear, index) => (
                        <div 
                            key={gear.id}
                            className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                            style={{ animationDelay: `${index * 30}ms`, animationDuration: "300ms" }}
                        >
                            <MyGearCard gear={gear} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}