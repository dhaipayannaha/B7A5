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
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-semibold">Users</h1>
                <p className="text-sm text-muted-foreground">
                    {users.length} user{users.length !== 1 ? "s" : ""}
                </p>
            </div>

            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">No users found</p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr className="text-left">
                                <th className="p-3 font-medium">User</th>
                                <th className="p-3 font-medium">Email</th>
                                <th className="p-3 font-medium">Phone</th>
                                <th className="p-3 font-medium">Role</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b last:border-0">
                                    <td className="flex items-center gap-2 p-3">
                                        <Image
                                            src={
                                                user.image?.startsWith("http") || user.image?.startsWith("/")
                                                    ? user.image
                                                    : `https://i.pravatar.cc/150?u=${user.id}`
                                            }
                                            alt={user.name}
                                            width={28}
                                            height={28}
                                            className="rounded-full"
                                        />
                                        <span className="font-medium">{user.name}</span>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{user.email}</td>
                                    <td className="p-3 text-muted-foreground">{user.phone}</td>
                                    <td className="p-3">
                                        <UserRoleSelect userId={user.id} currentRole={user.role} />
                                    </td>
                                    <td className="p-3">
                                        <UserStatusSelect userId={user.id} currentStatus={user.status} />
                                    </td>
                                    <td className="p-3 text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString()}
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