"use client";

import { useTransition } from "react";
import { updateRentalStatus } from "../_actions/updateRentalStatus";

const STATUSES = ["PLACED", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

export function RentalStatusSelect({ rentalId, currentStatus }: { rentalId: string; currentStatus: string }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        startTransition(async () => {
            const result = await updateRentalStatus(rentalId, newStatus);
            if (!result.success) {
                alert(result.message ?? "Failed to update status");
            }
        });
    };

    return (
        <select
            defaultValue={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className="rounded-md border px-2 py-1 text-xs disabled:opacity-50"
        >
            {STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}