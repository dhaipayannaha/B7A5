"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
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
        <div className="space-y-5">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by title, category, brand or provider…"
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

            {/* Empty state */}
            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                    <p className="text-sm font-medium">
                        No gear matched &quot;<span className="text-slate-600">{query}</span>&quot;
                    </p>
                </div>
            ) : (
                <>
                    {/* Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {pageItems.map((gear) => (
                            <GearCard key={gear.id} gear={gear} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-1">
                        <p className="text-sm text-slate-500">
                            Showing{" "}
                            <span className="font-medium text-[#041334]">{start + 1}</span>–
                            <span className="font-medium text-[#041334]">
                                {Math.min(start + PAGE_SIZE, filtered.length)}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-[#041334]">{filtered.length}</span>{" "}
                            {q ? "results" : "items"}
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
                </>
            )}
        </div>
    );
}
