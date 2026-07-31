// app/(dashboardGroup)/admin/users/page.tsx

import { getAllUsers } from "../_actions/getAllUsers";
import { User } from "@/lib/userType";
import Image from "next/image";
import { UserStatusSelect } from "../_components/UserStatusSelect";
import { UserRoleSelect } from "../_components/UserRoleSelect";

export default async function AdminUsersPage() {
    const result = await getAllUsers();
    const users: User[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#041334]">Users</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your platform's {users.length} user{users.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white shadow-sm border border-dashed border-slate-200 py-20 text-center text-muted-foreground">
                    <p className="text-base font-medium text-[#041334]">No users found</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-slate-100">
                    <table className="w-full text-sm">
                        <thead className="border-b border-slate-100 bg-slate-50/50">
                            <tr className="text-left">
                                <th className="p-4 font-semibold text-[#041334]">User</th>
                                <th className="p-4 font-semibold text-[#041334]">Email</th>
                                <th className="p-4 font-semibold text-[#041334]">Phone</th>
                                <th className="p-4 font-semibold text-[#041334]">Role</th>
                                <th className="p-4 font-semibold text-[#041334]">Status</th>
                                <th className="p-4 font-semibold text-[#041334]">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr 
                                    key={user.id} 
                                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors group animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                                    style={{ animationDelay: `${index * 50}ms`, animationDuration: '500ms' }}
                                >
                                    <td className="flex items-center gap-3 p-4">
                                        <Image
                                            src={
                                                user.image?.startsWith("http") || user.image?.startsWith("/")
                                                    ? user.image
                                                    : `https://i.pravatar.cc/150?u=${user.id}`
                                            }
                                            alt={user.name}
                                            width={36}
                                            height={36}
                                            className="rounded-full ring-2 ring-transparent group-hover:ring-[#92a417]/30 transition-all shadow-sm object-cover"
                                        />
                                        <span className="font-medium text-slate-700">{user.name}</span>
                                    </td>
                                    <td className="p-4 text-slate-500">{user.email}</td>
                                    <td className="p-4 text-slate-500">{user.phone}</td>
                                    <td className="p-4">
                                        <UserRoleSelect userId={user.id} currentRole={user.role} />
                                    </td>
                                    <td className="p-4">
                                        <UserStatusSelect userId={user.id} currentStatus={user.status} />
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}