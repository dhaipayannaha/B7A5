"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Order } from "@/lib/ordersType";
import { PaymentStatusBadge } from "./PaymentStatusBadge";
import { RentalStatusSelect } from "./RentalStatusSelect";

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
        <div className="space-y-4">
            {/* Search + Status Filter Row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by customer name or email…"
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

                {/* Status filter pills */}
                <div className="flex items-center gap-1 flex-wrap">
                    {ALL_STATUSES.map((s) => (
                        <button
                            key={s}
                            onClick={() => handleStatus(s)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                                statusFilter === s
                                    ? "bg-[#92a417] text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-slate-100">
                <table className="w-full text-sm">
                    <thead className="border-b border-slate-100 bg-slate-50/50">
                        <tr className="text-left">
                            <th className="p-4 font-semibold text-[#041334]">Customer</th>
                            <th className="p-4 font-semibold text-[#041334]">Dates</th>
                            <th className="p-4 font-semibold text-[#041334]">Amount</th>
                            <th className="p-4 font-semibold text-[#041334]">Payment</th>
                            <th className="p-4 font-semibold text-[#041334]">Status</th>
                            <th className="p-4 font-semibold text-[#041334]">Placed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageRentals.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-16 text-center text-sm text-slate-400">
                                    No rentals match your filters
                                </td>
                            </tr>
                        ) : (
                            pageRentals.map((rental, index) => (
                                <tr
                                    key={rental.id}
                                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                                    style={{ animationDelay: `${index * 40}ms`, animationDuration: "400ms" }}
                                >
                                    <td className="p-4">
                                        <div className="font-medium text-slate-700">{rental.customer.name}</div>
                                        <div className="text-xs text-slate-400">{rental.customer.email}</div>
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        {new Date(rental.startDate).toLocaleDateString()} —{" "}
                                        {new Date(rental.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 font-medium text-[#041334]">৳{rental.totalAmount}</td>
                                    <td className="p-4">
                                        <PaymentStatusBadge status={rental.paymentStatus} />
                                    </td>
                                    <td className="p-4">
                                        <RentalStatusSelect rentalId={rental.id} currentStatus={rental.status} />
                                    </td>
                                    <td className="p-4 text-slate-500">
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

            {/* Pagination */}
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
                        {q || statusFilter !== "All" ? "results" : "rentals"}
                    </p>

                    {totalPages > 1 && (
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
                    )}
                </div>
            )}
        </div>
    );
}
