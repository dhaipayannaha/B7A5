import { getOrderById } from "@/app/(dashboardGroup)/_actions/payment";
import PayButton from "./_components/PayButton";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PayOrderPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getOrderById(id);

    if (!result.success || !result.data) {
        return notFound();
    }

    const order = result.data;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8 text-white">

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-4">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Complete Payment</h1>
                    <p className="text-sm text-white/50 mt-1">Secure checkout via Stripe</p>
                </div>

                {/* Order Summary */}
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Order ID</span>
                        <span className="text-xs font-mono text-white/80 truncate max-w-[160px]">{order.id}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Gear</span>
                        <span className="text-sm font-medium">{order.gearItem?.name ?? "—"}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Start Date</span>
                        <span className="text-sm">{new Date(order.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">End Date</span>
                        <span className="text-sm">{new Date(order.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-white/60 text-sm">Status</span>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {order.paymentStatus}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pt-3">
                        <span className="text-white font-semibold">Total Amount</span>
                        <span className="text-2xl font-bold text-emerald-400">
                            ${order.totalAmount?.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* Pay Button (client component handles the action) */}
                <PayButton rentalOrderId={order.id} />

                <p className="text-center text-xs text-white/30 mt-4">
                    You will be redirected to Stripe&apos;s secure payment page
                </p>
            </div>
        </div>
    );
}
