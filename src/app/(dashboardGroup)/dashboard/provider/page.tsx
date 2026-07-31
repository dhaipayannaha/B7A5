import { Store } from "lucide-react";
import Link from "next/link";

export default function ProviderDashboardPage() {
    return (
        <div className="p-6">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white border border-slate-100/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] py-32 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417] mb-6 shadow-sm">
                    <Store className="h-10 w-10" />
                </div>
                <h1 className="text-3xl font-bold text-[#041334] mb-3">Welcome to your Dashboard</h1>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Manage your gear inventory, track your active orders, and keep an eye on your earnings all in one place.
                </p>
                <div className="flex gap-4">
                    <Link 
                        href="/dashboard/provider/gear" 
                        className="px-6 py-2.5 rounded-full bg-[#92a417] text-white font-medium shadow-md shadow-[#92a417]/20 hover:bg-[#829214] transition-colors"
                    >
                        View My Gear
                    </Link>
                    <Link 
                        href="/dashboard/provider/orders" 
                        className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                    >
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}