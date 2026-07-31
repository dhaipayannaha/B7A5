import { Order } from "@/lib/ordersType";
import { RentalsTable } from "../_components/RentalsTable";
import { getAllRentals } from "../_actions/adminRentals";

export default async function AdminRentalsPage() {
    const result = await getAllRentals();
    const rentals: Order[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-2xl font-semibold text-[#041334]">Rentals</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {rentals.length} rental{rentals.length !== 1 ? "s" : ""} across the platform
                    </p>
                </div>
            </div>

            {rentals.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No rentals found</p>
                </div>
            ) : (
                <RentalsTable rentals={rentals} />
            )}
        </div>
    );
}