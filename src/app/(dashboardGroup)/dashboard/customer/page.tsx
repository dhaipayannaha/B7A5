import React from "react";
import { getMyRentals } from "../../_actions/getMyRentals";
import { Badge } from "@/components/ui/badge";
import {
    CalendarIcon,
    PackageIcon,
    CreditCardIcon,
    ClockIcon,
    CheckCircle2Icon,
    TruckIcon,
    RotateCcwIcon,
    XCircleIcon,
    ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";
import { ReviewDialog } from "./_components/ReviewDialog";

// ── Status badge config ──────────────────────────────────────────────────────
type RentalStatus =
    | "PLACED"
    | "CONFIRMED"
    | "PAID"
    | "PICKED_UP"
    | "RETURNED"
    | "CANCELLED";

const STATUS_CONFIG: Record<
    RentalStatus,
    { label: string; className: string; icon: React.ReactNode }
> = {
    PLACED: {
        label: "Placed",
        className: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100",
        icon: <ClockIcon size={11} />,
    },
    CONFIRMED: {
        label: "Confirmed",
        className: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
        icon: <CheckCircle2Icon size={11} />,
    },
    PAID: {
        label: "Paid",
        className: "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
        icon: <CreditCardIcon size={11} />,
    },
    PICKED_UP: {
        label: "Picked Up",
        className: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
        icon: <TruckIcon size={11} />,
    },
    RETURNED: {
        label: "Returned",
        className: "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-100",
        icon: <RotateCcwIcon size={11} />,
    },
    CANCELLED: {
        label: "Cancelled",
        className: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
        icon: <XCircleIcon size={11} />,
    },
};

function StatusBadge({ status }: { status: string }) {
    const config = STATUS_CONFIG[status as RentalStatus] ?? {
        label: status,
        className: "bg-slate-100 text-slate-600",
        icon: null,
    };
    return (
        <Badge
            variant="outline"
            className={`inline-flex items-center gap-1 text-xs font-semibold ${config.className}`}
        >
            {config.icon}
            {config.label}
        </Badge>
    );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
export default async function CustomerDashboardPage() {
    const rentalsRes = await getMyRentals();
    const rentals: any[] = rentalsRes?.data || [];

    return (
        <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#041334]">My Dashboard</h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Track your rentals, payments, and booking history.
                    </p>
                </div>
                <Link
                    href="/gear"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#92a417] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#829214] transition-colors"
                >
                    <ShoppingBagIcon size={15} />
                    Rent More Gear
                </Link>
            </div>

            {/* Stats strip */}
            {rentals.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        {
                            label: "Total Orders",
                            value: rentals.length,
                            icon: <PackageIcon size={18} className="text-[#92a417]" />,
                            bg: "bg-[#92a417]/8",
                        },
                        {
                            label: "Active",
                            value: rentals.filter((r) => ["CONFIRMED", "PAID", "PICKED_UP"].includes(r.status)).length,
                            icon: <TruckIcon size={18} className="text-blue-600" />,
                            bg: "bg-blue-50",
                        },
                        {
                            label: "Returned",
                            value: rentals.filter((r) => r.status === "RETURNED").length,
                            icon: <RotateCcwIcon size={18} className="text-slate-500" />,
                            bg: "bg-slate-50",
                        },
                        {
                            label: "Total Spent",
                            value: `৳${rentals.reduce((sum, r) => sum + (r.totalAmount || 0), 0).toLocaleString()}`,
                            icon: <CreditCardIcon size={18} className="text-purple-600" />,
                            bg: "bg-purple-50",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className={`rounded-2xl ${stat.bg} border border-border/50 p-4 flex items-center gap-3`}
                        >
                            <div className="p-2 rounded-xl bg-white/70 shadow-sm">{stat.icon}</div>
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-xl font-bold text-[#041334]">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Rental Orders Table */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-[#041334]">
                    <PackageIcon size={18} className="text-[#92a417]" />
                    Rental Order History
                </h2>

                {rentals.length === 0 ? (
                    // Empty state
                    <div className="rounded-2xl border-2 border-dashed border-border/60 bg-slate-50/40 flex flex-col items-center justify-center py-20 gap-4 text-center">
                        <div className="p-5 rounded-full bg-[#92a417]/10">
                            <PackageIcon size={36} className="text-[#92a417]" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-[#041334]">No rentals yet</p>
                            <p className="text-sm text-muted-foreground mt-0.5">
                                Browse our gear catalogue and make your first booking.
                            </p>
                        </div>
                        <Link
                            href="/gear"
                            className="mt-2 px-6 py-2.5 bg-[#041334] text-white rounded-xl text-sm font-semibold hover:bg-[#041334]/90 transition"
                        >
                            Browse Gear
                        </Link>
                    </div>
                ) : (
                    // Full table
                    <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/60 bg-slate-50/80">
                                        <th className="text-left px-5 py-3.5 font-semibold text-[#041334] text-xs uppercase tracking-wide">
                                            Order
                                        </th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-[#041334] text-xs uppercase tracking-wide">
                                            Gear Item
                                        </th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-[#041334] text-xs uppercase tracking-wide">
                                            <span className="flex items-center gap-1"><CalendarIcon size={11} /> Rental Period</span>
                                        </th>
                                        <th className="text-left px-5 py-3.5 font-semibold text-[#041334] text-xs uppercase tracking-wide">
                                            Status
                                        </th>
                                        <th className="text-right px-5 py-3.5 font-semibold text-[#041334] text-xs uppercase tracking-wide">
                                            Amount
                                        </th>
                                        <th className="text-center px-5 py-3.5 font-semibold text-[#041334] text-xs uppercase tracking-wide">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {rentals.map((rental: any, index: number) => {
                                        const status: RentalStatus = rental.status || "PLACED";
                                        const orderId = rental.id?.slice(-8).toUpperCase() ?? `#${index + 1}`;
                                        const gearName = rental.gearItem?.name ?? rental.gearItemId ?? "Gear Item";
                                        const start = rental.startDate ? new Date(rental.startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
                                        const end = rental.endDate ? new Date(rental.endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

                                        return (
                                            <tr
                                                key={rental.id ?? index}
                                                className="hover:bg-slate-50/60 transition-colors"
                                            >
                                                {/* Order ID */}
                                                <td className="px-5 py-4">
                                                    <span className="font-mono text-xs font-semibold text-[#041334] bg-slate-100 px-2 py-1 rounded-md">
                                                        #{orderId}
                                                    </span>
                                                </td>

                                                {/* Gear name */}
                                                <td className="px-5 py-4">
                                                    <span className="font-medium text-[#041334]">{gearName}</span>
                                                </td>

                                                {/* Dates */}
                                                <td className="px-5 py-4 text-muted-foreground">
                                                    <div className="flex items-center gap-1 text-xs">
                                                        <span>{start}</span>
                                                        <span className="text-border">→</span>
                                                        <span>{end}</span>
                                                    </div>
                                                </td>

                                                {/* Status badge */}
                                                <td className="px-5 py-4">
                                                    <StatusBadge status={status} />
                                                </td>

                                                {/* Amount */}
                                                <td className="px-5 py-4 text-right">
                                                    <span className="font-bold text-[#92a417]">
                                                        ৳{(rental.totalAmount ?? 0).toLocaleString()}
                                                    </span>
                                                </td>

                                                {/* Context action per status */}
                                                <td className="px-5 py-4 text-center">
                                                    {status === "CONFIRMED" && (
                                                        <Link
                                                            href={`/payment?rentalOrderId=${rental.id}`}
                                                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg px-3 py-1.5 transition"
                                                        >
                                                            <CreditCardIcon size={12} /> Pay Now
                                                        </Link>
                                                    )}
                                                    {status === "RETURNED" && (
                                                        <ReviewDialog rentalOrderId={rental.id} gearItemId={rental.gearItem?.id || rental.gearItemId} />
                                                    )}
                                                    {!["CONFIRMED", "RETURNED"].includes(status) && (
                                                        <span className="text-xs text-muted-foreground">—</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}