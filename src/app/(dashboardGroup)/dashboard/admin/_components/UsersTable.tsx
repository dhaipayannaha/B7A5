"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search, X, Users, Mail, Phone } from "lucide-react";
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
        <div className="space-y-6">
            {/* Header & Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/60">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417]">
                        <Users className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#041334]">Platform Users</h2>
                        <p className="text-sm font-medium text-slate-500">
                            Manage {users.length} registered member{users.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full rounded-full border border-slate-200/80 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm focus:border-[#92a417] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#92a417]/10 transition-all duration-300"
                    />
                    {query && (
                        <button
                            onClick={() => handleSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>

            {/* Table Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/60">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-2xl">Member</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 rounded-tr-2xl">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pageUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                                                <Search className="h-8 w-8" />
                                            </div>
                                            <p className="text-base font-medium text-slate-600">No users found</p>
                                            <p className="text-sm text-slate-400">
                                                We couldn&apos;t find anyone matching &quot;<span className="text-slate-700 font-medium">{query}</span>&quot;
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pageUsers.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-slate-50/60 transition-colors group animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                                        style={{ animationDelay: `${index * 30}ms`, animationDuration: "300ms" }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-10 w-10 shrink-0">
                                                    <Image
                                                        src={
                                                            user.image?.startsWith("http") || user.image?.startsWith("/")
                                                                ? user.image
                                                                : `https://i.pravatar.cc/150?u=${user.id}`
                                                        }
                                                        alt={user.name}
                                                        fill
                                                        sizes="40px"
                                                        className="rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-[#92a417]/20 transition-all"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-slate-800">{user.name}</span>
                                                    <span className="text-xs text-slate-500 font-medium">{user.id.slice(0, 8)}...</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col space-y-1.5">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                                                    <span className="truncate">{user.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                                                    <span>{user.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <UserRoleSelect userId={user.id} currentRole={user.role} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <UserStatusSelect userId={user.id} currentStatus={user.status} />
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
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
                    <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                        <p className="text-sm text-slate-500 font-medium">
                            Showing{" "}
                            <span className="text-slate-800 font-semibold">{start + 1}</span> to{" "}
                            <span className="text-slate-800 font-semibold">
                                {Math.min(start + PAGE_SIZE, filtered.length)}
                            </span>{" "}
                            of{" "}
                            <span className="text-slate-800 font-semibold">{filtered.length}</span>{" "}
                            {q ? "results" : "users"}
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-[#92a417] hover:text-[#92a417] hover:shadow-sm disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 disabled:hover:shadow-none disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                                            p === safePage
                                                ? "bg-[#92a417] text-white shadow-md shadow-[#92a417]/20"
                                                : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={safePage === totalPages}
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-[#92a417] hover:text-[#92a417] hover:shadow-sm disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 disabled:hover:shadow-none disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
