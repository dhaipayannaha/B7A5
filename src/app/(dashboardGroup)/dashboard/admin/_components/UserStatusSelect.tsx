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
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 cursor-pointer ${
                currentStatus === "ACTIVE"
                    ? "bg-[#92a417]/10 text-[#92a417] border-[#92a417]/20 hover:bg-[#92a417]/20 focus:ring-[#92a417]/40"
                    : currentStatus === "SUSPENDED"
                    ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200 focus:ring-red-400"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 focus:ring-slate-400"
            }`}
        >
            {STATUSES.map((status) => (
                <option key={status} value={status}>
                    {status}
                </option>
            ))}
        </select>
    );
}