import { Order } from "@/lib/ordersType";
import { OrderStatusSelect } from "./OrderStatusSelect";

export function MyOrderList({ order }: { order: Order }) {
    return (
        <div className="rounded-xl border p-4 space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">৳{order.totalAmount}</span>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Order:</span>
                <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Payment:</span>

            </div>

            <p className="text-sm">{order.customer.name}</p>
            <p className="text-xs text-muted-foreground">
                {new Date(order.startDate).toLocaleDateString()} — {new Date(order.endDate).toLocaleDateString()}
            </p>
        </div>
    );
}