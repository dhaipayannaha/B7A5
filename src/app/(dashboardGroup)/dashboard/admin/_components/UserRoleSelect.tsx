// app/(dashboardGroup)/_components/For Admin/UserRoleSelect.tsx
"use client";

import { useTransition } from "react";
import { updateUserRole } from "../_actions/updateUser";

const ROLES = ["ADMIN", "PROVIDER", "CUSTOMER"] as const;

export function UserRoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        startTransition(async () => {
            const result = await updateUserRole(userId, newRole);
            if (!result.success) {
                alert(result.message ?? "Failed to update role");
            }
        });
    };

    return (
        <select
            value={currentRole}
            onChange={handleChange}
            disabled={isPending}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm transition-all hover:bg-slate-50 focus:border-[#92a417] focus:outline-none focus:ring-1 focus:ring-[#92a417] disabled:opacity-50 text-slate-700 cursor-pointer"
        >
            {ROLES.map((role) => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );
}