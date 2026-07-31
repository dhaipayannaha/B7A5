"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X, PackageOpen, Plus } from "lucide-react";
import { Equipment } from "@/lib/types";
import { GearCard } from "./GearCard";

const PAGE_SIZE = 12;

export function GearGrid({ items }: { items: Equipment[] }) {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const q = query.toLowerCase().trim();
    const filtered = q
        ? items.filter(
              (g) =>
                  g.title?.toLowerCase().includes(q) ||
                  g.description?.toLowerCase().includes(q) ||
                  g.category?.name?.toLowerCase().includes(q) ||
                  g.brand?.toLowerCase().includes(q) ||
                  g.provider?.name?.toLowerCase().includes(q)
          )
        : items;

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    const handleSearch = (value: string) => {
        setQuery(value);
        setPage(1);
    };

    return (
        <div className="space-y-6">
            {/* Header & Search Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100/60">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417]">
                        <PackageOpen className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#041334]">Platform Gear</h2>
                        <p className="text-sm font-medium text-slate-500">
                            {items.length} gear item{items.length !== 1 ? 's' : ''} available
                        </p>
                    </div>
                </div>
                
                <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search by title, brand, category..."
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

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-100/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] py-24 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-4">
                        <Search className="h-8 w-8" />
                    </div>
                    <p className="text-base font-medium text-slate-600">No gear found</p>
                    <p className="text-sm text-slate-400">
                        We couldn&apos;t find anything matching &quot;<span className="text-slate-700 font-medium">{query}</span>&quot;
                    </p>
                </div>
            ) : (
                <>
                    {/* Grid */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {pageItems.map((gear, index) => (
                            <div 
                                key={gear.id}
                                className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
                                style={{ animationDelay: `${index * 30}ms`, animationDuration: "300ms" }}
                            >
                                <GearCard gear={gear} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {filtered.length > 0 && (
                        <div className="flex items-center justify-between rounded-2xl border border-slate-100/60 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] px-6 py-4">
                            <p className="text-sm text-slate-500 font-medium">
                                Showing{" "}
                                <span className="text-slate-800 font-semibold">{start + 1}</span> to{" "}
                                <span className="text-slate-800 font-semibold">
                                    {Math.min(start + PAGE_SIZE, filtered.length)}
                                </span>{" "}
                                of{" "}
                                <span className="text-slate-800 font-semibold">{filtered.length}</span>{" "}
                                {q ? "results" : "items"}
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
                </>
            )}
        </div>
    );
}
