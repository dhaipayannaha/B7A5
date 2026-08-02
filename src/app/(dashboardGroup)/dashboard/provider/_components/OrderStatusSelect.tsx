"use client";

import { useTransition, useState } from "react";
import { updateOrderStatus } from "../_actions/updateOrderStatus";
import { toast } from "sonner";
import { ChevronDown, Loader2 } from "lucide-react";

type OrderStatus = "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED" | "REFUNDED";

// ── Badge styles per status ──────────────────────────────────────────────────
const BADGE_STYLES: Record<OrderStatus, string> = {
    PLACED:    "bg-orange-100 text-orange-700 border border-orange-200",
    CONFIRMED: "bg-blue-100   text-blue-700   border border-blue-200",
    PAID:      "bg-purple-100 text-purple-700 border border-purple-200",
    PICKED_UP: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    RETURNED:  "bg-slate-100  text-slate-600  border border-slate-200",
    CANCELLED: "bg-red-100    text-red-700    border border-red-200",
    REFUNDED:  "bg-purple-100 text-purple-700 border border-purple-200",
};

const STATUS_ICONS: Record<OrderStatus, string> = {
    PLACED:    "📋",
    CONFIRMED: "✔️",
    PAID:      "💳",
    PICKED_UP: "📦",
    RETURNED:  "↩️",
    CANCELLED: "❌",
    REFUNDED:  "💸",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
    PLACED:    "Placed",
    CONFIRMED: "Confirmed",
    PAID:      "Paid",
    PICKED_UP: "Picked Up",
    RETURNED:  "Returned",
    CANCELLED: "Cancelled",
    REFUNDED:  "Refunded",
};

const ALL_STATUSES: OrderStatus[] = ["PLACED", "CONFIRMED", "PAID", "PICKED_UP", "RETURNED", "CANCELLED", "REFUNDED"];

export function OrderStatusSelect({
    orderId,
    currentStatus,
}: {
    orderId: string;
    currentStatus: string;
}) {
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const status = (currentStatus as OrderStatus) in BADGE_STYLES
        ? (currentStatus as OrderStatus)
        : "PLACED";

    const badgeStyle = BADGE_STYLES[status];
    const label = STATUS_LABELS[status];

    const handleSelect = (nextStatus: OrderStatus) => {
        if (nextStatus === status) {
            setIsOpen(false);
            return;
        }
        setIsOpen(false);
        startTransition(async () => {
            let result;
            if (nextStatus === "REFUNDED") {
                result = await updateOrderStatus(orderId, undefined, "REFUNDED");
            } else {
                result = await updateOrderStatus(orderId, nextStatus);
            }
            if (!result.success) {
                toast.error(result.message ?? "Failed to update order status", { position: "top-right" });
            } else {
                toast.success(
                    `Status updated to ${STATUS_ICONS[nextStatus]} ${STATUS_LABELS[nextStatus]}`,
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
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60 disabled:cursor-not-allowed ${badgeStyle}`}
            >
                {isPending ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                    <span>{STATUS_ICONS[status]}</span>
                )}
                <span>{label}</span>
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
                    <div className="absolute right-0 z-20 mt-1.5 min-w-[180px] overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg shadow-slate-200/60 ring-1 ring-black/5">
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
                                        className={`inline-flex w-full whitespace-nowrap items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${BADGE_STYLES[s]} ${
                                            s === status ? "opacity-50" : ""
                                        }`}
                                    >
                                        <span className="mr-1.5">{STATUS_ICONS[s]}</span>
                                        {STATUS_LABELS[s]}
                                        {s === status && (
                                            <span className="ml-auto text-[9px] font-normal normal-case tracking-normal opacity-70">
                                                current
                                            </span>
                                        )}
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