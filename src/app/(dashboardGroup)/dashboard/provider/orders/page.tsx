import { providerOrders } from "@/app/(dashboardGroup)/_actions/providerOrders";
import { PostFormDialog } from "@/app/(dashboardGroup)/_components/For Provider/PostFromDialog";
import { Order } from "@/lib/ordersType";
import { MyOrderList } from "../_components/MyOrderList";

interface MyOrderListProps {
    order: Order
}

export default async function MyPostGearPage() {
    const result = await providerOrders();
    const myOrders: Order[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Orders</h1>
                    <p className="text-sm text-muted-foreground">
                        {myOrders.length} order{myOrders.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {myOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No gear listed yet</p>
                    <p className="mt-1 text-xs">Add your first equipment to get started.</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {myOrders.map((order) => (
                        <MyOrderList key={order.id} order={order} />
                    ))}
                </div>
            )}
        </div>
    );
}