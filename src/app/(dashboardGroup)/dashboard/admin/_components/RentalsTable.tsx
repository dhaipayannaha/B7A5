"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X, ShoppingBag, Calendar, CreditCard } from "lucide-react";
import { Order } from "@/lib/ordersType";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { RentalStatusBadge } from "./RentalStatusBadge";

const PAGE_SIZE = 10;

const ALL_STATUSES = ["All", "PLACED", "CONFIRMED", "CANCELLED", "COMPLETED"] as const;
type StatusFilter = (typeof ALL_STATUSES)[number];

export function RentalsTable({ rentals }: { rentals: Order[] }) {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
    const [page, setPage] = useState(1);

    const q = query.toLowerCase().trim();

    const filtered = rentals.filter((r) => {
        const matchesStatus = statusFilter === "All" || r.status === statusFilter;
        const matchesSearch =
            !q ||
            r.customer.name?.toLowerCase().includes(q) ||
            r.customer.email?.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const pageRentals = filtered.slice(start, start + PAGE_SIZE);

    const handleSearch = (value: string) => {
        setQuery(value);
        setPage(1);
    };

    const handleStatus = (value: StatusFilter) => {
        setStatusFilter(value);
        setPage(1);
    };

    return (
        <div className="space-y-6">
            {/* Header & Search Bar */}
            <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/60">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417]">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#041334]">Platform Rentals</h2>
                            <p className="text-sm font-medium text-slate-500">
                                Monitor {rentals.length} active and past rental{rentals.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search customer name or email..."
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

                {/* Status Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {ALL_STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={() => handleStatus(s)}
                            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                                statusFilter === s
                                    ? "bg-[#92a417] text-white shadow-md shadow-[#92a417]/20"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/60">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <tr>
                                <th className="px-6 py-4 rounded-tl-2xl">Customer</th>
                                <th className="px-6 py-4">Rental Period</th>
                                <th className="px-6 py-4">Financials</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 rounded-tr-2xl">Placed On</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {pageRentals.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                                                <Search className="h-8 w-8" />
                                            </div>
                                            <p className="text-base font-medium text-slate-600">No rentals found</p>
                                            <p className="text-sm text-slate-400">
                                                No orders match your current search and filters.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pageRentals.map((rental, index) => (
                                    <tr
                                        key={rental.id}
                                        className="hover:bg-slate-50/60 transition-colors group animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                                        style={{ animationDelay: `${index * 30}ms`, animationDuration: "300ms" }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800">{rental.customer.name}</span>
                                                <span className="text-xs text-slate-500 font-medium">{rental.customer.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                <div className="flex flex-col text-xs font-medium">
                                                    <span>{new Date(rental.startDate).toLocaleDateString()}</span>
                                                    <span className="text-slate-400">to {new Date(rental.endDate).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                                                    <CreditCard className="h-4 w-4 text-slate-400" />
                                                    <span>৳{rental.totalAmount.toLocaleString()}</span>
                                                </div>
                                                <PaymentStatusBadge status={rental.paymentStatus} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <RentalStatusBadge status={rental.status} />
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">
                                            {new Date(rental.createdAt).toLocaleDateString(undefined, {
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
                            {q || statusFilter !== "All" ? "results" : "rentals"}
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
