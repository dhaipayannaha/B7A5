"use client";

import { Order } from "@/lib/ordersType";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { Calendar, CreditCard, User } from "lucide-react";

export function MyOrderList({ order }: { order: Order }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 p-5 space-y-4">

            {/* Header: Amount and Status */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Amount</span>
                    <span className="text-xl font-bold text-[#041334]">৳{order.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Order Status</span>
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">

                {/* Customer */}
                <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full bg-blue-50 p-1.5 text-blue-600">
                        <User className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-medium text-slate-400">Customer</span>
                        <span className="truncate text-sm font-semibold text-slate-700">{order.customer.name}</span>
                        <span className="truncate text-[10px] text-slate-400">{order.customer.email}</span>
                    </div>
                </div>

                {/* Payment */}
                <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 rounded-full bg-emerald-50 p-1.5 text-emerald-600">
                        <CreditCard className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-400">Payment</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded-full w-fit ${
                            order.paymentStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                            order.paymentStatus === 'PENDING' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                            order.paymentStatus === 'REFUNDED' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 
                            'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                            {order.paymentStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-50">
                <div className="rounded-full bg-slate-50 p-1.5 text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <span>{new Date(order.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="text-slate-300">—</span>
                    <span>{new Date(order.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

        </div>
    );
}