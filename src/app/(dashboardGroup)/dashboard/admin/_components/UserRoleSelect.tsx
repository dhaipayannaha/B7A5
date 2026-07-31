"use client";

import { useTransition } from "react";
import { updateUserRole } from "../_actions/updateUser";
import { toast } from "sonner";

const ROLES = ["ADMIN", "PROVIDER", "CUSTOMER"] as const;

export function UserRoleSelect({ userId, currentRole }: { userId: string; currentRole: string }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        startTransition(async () => {
            const result = await updateUserRole(userId, newRole);
            if (!result.success) {
                toast.error(result.message ?? "Failed to update role", { position: "top-right" });
            } else {
                toast.success(`Role updated to ${newRole}`, { position: "top-right" });
            }
        });
    };

    return (
        <select
            value={currentRole}
            onChange={handleChange}
            disabled={isPending}
            className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 cursor-pointer ${
                currentRole === "ADMIN"
                    ? "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 focus:ring-purple-400"
                    : currentRole === "PROVIDER"
                    ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 focus:ring-blue-400"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 focus:ring-slate-400"
            }`}
        >
            {ROLES.map((role) => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );
}