import { getAllUsers } from "../_actions/getAllUsers";
import { User } from "@/lib/userType";
import { UsersTable } from "../_components/UsersTable";

export default async function AdminUsersPage() {
    const result = await getAllUsers();
    const users: User[] = result.success ? result.data : [];

    return (
        <div className="space-y-6 p-6 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#041334]">Users</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your platform&apos;s {users.length} user{users.length !== 1 ? "s" : ""}
                    </p>
                </div>
            </div>

            {users.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white shadow-sm border border-dashed border-slate-200 py-20 text-center text-muted-foreground">
                    <p className="text-base font-medium text-[#041334]">No users found</p>
                </div>
            ) : (
                <UsersTable users={users} />
            )}
        </div>
    );
}