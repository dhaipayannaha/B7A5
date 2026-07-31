"use client";

import { useTransition } from "react";

const ORDER_STATUSES = ["PLACED", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        startTransition(async () => {
            // const result = await updateOrderStatus(orderId, newStatus);
            // if (!result.success) {
            //     alert(result.message ?? "Failed to update status");
            // }
        });
    };

    return (
        <select
            defaultValue={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className="rounded-md border px-2 py-1 text-sm disabled:opacity-50"
        >
            {ORDER_STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}