import { providerOrders } from "@/app/(dashboardGroup)/_actions/providerOrders";
import { providerPost } from "@/app/(dashboardGroup)/_actions/ProviderPost";
import { Equipment } from "@/lib/types";
import { Order } from "@/lib/ordersType";
import { Store, Package, Clock, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ProviderDashboardPage() {
    const [ordersResult, myGears] = await Promise.all([
        providerOrders(),
        providerPost(),
    ]);

    const myOrders: Order[] = ordersResult.success ? ordersResult.data : [];

    const totalGear = (myGears as Equipment[]).length;
    const pendingOrders = myOrders.filter((o) => o.status === "PLACED").length;
    const activeRentals = myOrders.filter((o) => 
        ["CONFIRMED", "PAID", "PICKED_UP"].includes(o.status)
    ).length;

    return (
        <div className="space-y-6 p-6">
            
            {/* Overview Cards */}
            <div className="grid gap-5 sm:grid-cols-3">
                {/* Total Gear */}
                <div className="group rounded-2xl bg-white border border-slate-100/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <Package className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-[#041334]">{totalGear}</span>
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">Total Gear Listed</span>
                    </div>
                </div>

                {/* Active Rentals */}
                <div className="group rounded-2xl bg-white border border-slate-100/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Activity className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-[#041334]">{activeRentals}</span>
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">Active Rentals</span>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="group rounded-2xl bg-white border border-slate-100/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] p-6 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                            <Clock className="h-6 w-6" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-3xl font-bold text-[#041334]">{pendingOrders}</span>
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider mt-1">Pending Orders</span>
                    </div>
                </div>
            </div>

            {/* Welcome & Quick Actions */}
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white border border-slate-100/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] py-20 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417] mb-6 shadow-sm">
                    <Store className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold text-[#041334] mb-3">Manage Your Inventory</h1>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Easily track your active orders, add new gear, and keep an eye on your earnings all in one place.
                </p>
                <div className="flex gap-4">
                    <Link 
                        href="/dashboard/provider/gear" 
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#92a417] text-white font-medium shadow-md shadow-[#92a417]/20 hover:bg-[#829214] transition-colors"
                    >
                        View My Gear <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link 
                        href="/dashboard/provider/orders" 
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                    >
                        View Orders <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}