"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "../_actions/updateOrderStatus";
import { toast } from "sonner";

type OrderStatus = "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";

// ── Badge styles per status ──────────────────────────────────────────────────
const BADGE_STYLES: Record<OrderStatus, string> = {
    PLACED:    "bg-orange-100 text-orange-700 border border-orange-200",
    CONFIRMED: "bg-blue-100   text-blue-700   border border-blue-200",
    PAID:      "bg-purple-100 text-purple-700 border border-purple-200",
    PICKED_UP: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    RETURNED:  "bg-slate-100  text-slate-600  border border-slate-200",
    CANCELLED: "bg-red-100    text-red-700    border border-red-200",
};

const STATUS_LABELS: Record<OrderStatus, string> = {
    PLACED:    "Placed",
    CONFIRMED: "Confirmed",
    PAID:      "Paid",
    PICKED_UP: "Picked Up",
    RETURNED:  "Returned",
    CANCELLED: "Cancelled",
};

// ── What action (button label + next status) the PROVIDER can take ───────────
const PROVIDER_ACTIONS: Partial<Record<OrderStatus, { label: string; nextStatus: OrderStatus; color: string }>> = {
    PLACED:    { label: "✓ Confirm Order",    nextStatus: "CONFIRMED", color: "bg-blue-600 hover:bg-blue-700 text-white" },
    PAID:      { label: "📦 Mark Picked Up",  nextStatus: "PICKED_UP", color: "bg-emerald-600 hover:bg-emerald-700 text-white" },
    PICKED_UP: { label: "↩ Mark Returned",    nextStatus: "RETURNED",  color: "bg-slate-600 hover:bg-slate-700 text-white" },
};

export function OrderStatusSelect({
    orderId,
    currentStatus,
}: {
    orderId: string;
    currentStatus: string;
}) {
    const [isPending, startTransition] = useTransition();
    const status = currentStatus as OrderStatus;

    const providerAction = PROVIDER_ACTIONS[status];
    const badgeStyle = BADGE_STYLES[status] ?? "bg-slate-100 text-slate-600 border border-slate-200";
    const label = STATUS_LABELS[status] ?? status;

    const advance = (nextStatus: OrderStatus) => {
        startTransition(async () => {
            const result = await updateOrderStatus(orderId, nextStatus);
            if (!result.success) {
                toast.error(result.message ?? "Failed to update order status", { position: "top-right" });
            } else {
                toast.success(`Order status updated to ${STATUS_LABELS[nextStatus] ?? nextStatus}`, { position: "top-right" });
            }
        });
    };

    return (
        <div className="flex flex-col items-start gap-2">
            {/* Status badge */}
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${badgeStyle}`}>
                {label}
            </span>

            {/* Action button — only shown when provider can act */}
            {providerAction && (
                <button
                    onClick={() => advance(providerAction.nextStatus)}
                    disabled={isPending}
                    className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${providerAction.color}`}
                >
                    {isPending ? "Updating…" : providerAction.label}
                </button>
            )}
        </div>
    );
}