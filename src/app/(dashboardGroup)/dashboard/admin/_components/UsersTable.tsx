"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { User } from "@/lib/userType";
import { UserStatusSelect } from "./UserStatusSelect";
import { UserRoleSelect } from "./UserRoleSelect";

const PAGE_SIZE = 10;

export function UsersTable({ users }: { users: User[] }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const q = query.toLowerCase().trim();
    const filtered = q
        ? users.filter(
              (u) =>
                  u.name?.toLowerCase().includes(q) ||
                  u.email?.toLowerCase().includes(q) ||
                  u.phone?.toLowerCase().includes(q)
          )
        : users;

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const pageUsers = filtered.slice(start, start + PAGE_SIZE);

    const handleSearch = (value: string) => {
        setQuery(value);
        setPage(1); // reset to page 1 on new search
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by name, email or phone…"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:border-[#92a417] focus:outline-none focus:ring-2 focus:ring-[#92a417]/20 transition-all"
                />
                {query && (
                    <button
                        onClick={() => handleSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>

            {/* Table */}
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
                        {pageUsers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-16 text-center text-sm text-slate-400">
                                    No users match &quot;<span className="font-medium text-slate-600">{query}</span>&quot;
                                </td>
                            </tr>
                        ) : (
                            pageUsers.map((user, index) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors group animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                                    style={{ animationDelay: `${index * 40}ms`, animationDuration: "400ms" }}
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
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {filtered.length > 0 && (
                <div className="flex items-center justify-between px-1">
                    <p className="text-sm text-slate-500">
                        Showing{" "}
                        <span className="font-medium text-[#041334]">{start + 1}</span>–
                        <span className="font-medium text-[#041334]">
                            {Math.min(start + PAGE_SIZE, filtered.length)}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium text-[#041334]">{filtered.length}</span>{" "}
                        {q ? "results" : "users"}
                    </p>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={safePage === 1}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-[#92a417] hover:text-[#92a417] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                                    p === safePage
                                        ? "border-[#92a417] bg-[#92a417] text-white shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-[#92a417] hover:text-[#92a417]"
                                }`}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={safePage === totalPages}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-[#92a417] hover:text-[#92a417] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
