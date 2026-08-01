import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function GearDetailsLoading() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white animate-pulse">
            {/* Breadcrumb Skeleton */}
            <div className="border-b border-slate-100 bg-white/80 sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2">
                    <div className="h-3 w-12 bg-slate-200 rounded-md" />
                    <span className="text-slate-200">/</span>
                    <div className="h-3 w-10 bg-slate-200 rounded-md" />
                    <span className="text-slate-200">/</span>
                    <div className="h-3 w-32 bg-slate-200 rounded-md" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {/* Back button */}
                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 mb-8">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to All Gear
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
                    {/* ── LEFT: Images + Details ── */}
                    <div className="space-y-8">
                        {/* Image Gallery Skeleton */}
                        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm p-2">
                            <div className="aspect-[16/9] w-full rounded-2xl bg-slate-200" />
                            <div className="flex gap-2 overflow-x-auto pt-2 pb-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-20 w-28 flex-shrink-0 rounded-xl bg-slate-200" />
                                ))}
                            </div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm p-7 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-slate-200" />
                                <div className="h-4 w-24 bg-slate-200 rounded-md" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 w-full bg-slate-200 rounded-md" />
                                <div className="h-3 w-full bg-slate-200 rounded-md" />
                                <div className="h-3 w-4/5 bg-slate-200 rounded-md" />
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Sticky Booking Card ── */}
                    <div className="lg:sticky lg:top-20 self-start space-y-5">
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-sm p-7 space-y-5">
                            {/* Title skeleton */}
                            <div>
                                <div className="h-5 w-20 bg-slate-200 rounded-full mb-3" />
                                <div className="h-8 w-3/4 bg-slate-200 rounded-lg" />
                                <div className="h-4 w-1/2 bg-slate-200 rounded-md mt-2" />
                            </div>

                            {/* Price block skeleton */}
                            <div className="rounded-2xl bg-slate-200 h-28 w-full" />

                            {/* Stats grid skeleton */}
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="rounded-2xl bg-slate-100 border border-slate-200 h-20 w-full" />
                                ))}
                            </div>

                            {/* CTA button skeleton */}
                            <div className="h-14 w-full bg-slate-200 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
