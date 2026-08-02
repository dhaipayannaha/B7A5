"use client";

import { useTransition, useState } from "react";
import { updateOrderStatus } from "../_actions/updateOrderStatus";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";

type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

// ── Badge styles per status ──────────────────────────────────────────────────
const BADGE_STYLES: Record<PaymentStatus, string> = {
    PENDING:   "bg-amber-100  text-amber-700  border border-amber-200",
    COMPLETED: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    FAILED:    "bg-red-100    text-red-700    border border-red-200",
    REFUNDED:  "bg-purple-100 text-purple-700 border border-purple-200",
};

const ALL_STATUSES: PaymentStatus[] = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];

export function PaymentStatusSelect({
    orderId,
    currentStatus,
}: {
    orderId: string;
    currentStatus: string;
}) {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const status = (currentStatus as PaymentStatus) in BADGE_STYLES
        ? (currentStatus as PaymentStatus)
        : "PENDING";

    const badgeStyle = BADGE_STYLES[status];

    const handleSelect = (nextStatus: PaymentStatus) => {
        if (nextStatus === status) {
            setIsOpen(false);
            return;
        }
        setIsOpen(false);
        startTransition(async () => {
            const result = await updateOrderStatus(orderId, undefined, nextStatus);
            if (!result.success) {
                toast.error(result.message ?? "Failed to update payment status", { position: "top-right" });
            } else {
                toast.success(
                    `Payment status updated to ${nextStatus}`,
                    { position: "top-right" }
                );
            }
        });
    };

    return (
        <div className="relative">
            {/* Trigger button */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                disabled={isPending}
                className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all disabled:opacity-60 disabled:cursor-not-allowed ${badgeStyle}`}
            >
                {isPending && <Loader2 className="h-3 w-3 animate-spin" />}
                <span>{status}</span>
                {!isPending && (
                    <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                )}
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Options */}
                    <div className="absolute right-0 z-20 mt-1.5 min-w-[140px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg shadow-slate-200/60 ring-1 ring-black/5">
                        <div className="py-1">
                            {ALL_STATUSES.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleSelect(s)}
                                    className={`flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-slate-50 ${
                                        s === status ? "cursor-default" : "cursor-pointer"
                                    }`}
                                >
                                    <span
                                        className={`inline-flex w-full whitespace-nowrap items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${BADGE_STYLES[s]} ${
                                            s === status ? "opacity-50" : ""
                                        }`}
                                    >
                                        {s}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
