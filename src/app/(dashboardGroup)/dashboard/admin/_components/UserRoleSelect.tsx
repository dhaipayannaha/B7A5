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
            defaultValue={currentRole}
            onChange={handleChange}
            disabled={isPending}
            className="rounded-md border px-2 py-1 text-sm disabled:opacity-50"
        >
            {ROLES.map((role) => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );
}