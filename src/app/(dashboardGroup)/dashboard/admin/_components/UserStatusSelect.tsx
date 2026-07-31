// app/(dashboardGroup)/_components/For Admin/UserStatusSelect.tsx
"use client";

import { useTransition } from "react";
import { updateUserStatus } from "../_actions/updateUser";


const STATUSES = ["ACTIVE", "INACTIVE", "SUSPENDED"] as const;

export function UserStatusSelect({ userId, currentStatus }: { userId: string; currentStatus: string }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        startTransition(async () => {
            const result = await updateUserStatus(userId, newStatus);
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
            className="rounded-md border px-2 py-1 text-sm disabled:opacity-50"
        >
            {STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}