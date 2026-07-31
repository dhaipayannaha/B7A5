import React from 'react';
import { Users, Dumbbell, ArrowRightLeft, DollarSign, Activity, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function adminDashboardPages() {
    return (
        <div className="space-y-8 p-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="z-10">
                    <h1 className="text-3xl font-bold tracking-tight text-[#041334]">
                        Welcome to <span className="text-[#92a417]">GearUp</span> Admin
                    </h1>
                    <p className="text-sm text-slate-500 mt-2 max-w-xl">
                        Monitor your gym instrument rental platform. Overview of active rentals, revenue, user registrations, and inventory status.
                    </p>
                </div>
                {/* Decorative background element */}
                <div className="absolute right-0 top-0 w-64 h-full bg-[#041334]/5 skew-x-12 translate-x-12"></div>
                <div className="absolute right-12 top-0 w-16 h-full bg-[#92a417]/10 skew-x-12 translate-x-12"></div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#92a417]/30 transition-all hover:shadow-md cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Total Users</p>
                            <h3 className="text-3xl font-bold text-[#041334]">1,248</h3>
                        </div>
                        <div className="h-12 w-12 bg-[#041334]/5 rounded-xl flex items-center justify-center group-hover:bg-[#041334] group-hover:scale-110 transition-all duration-300">
                            <Users className="h-6 w-6 text-[#041334] group-hover:text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+12% from last month</span>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#92a417]/30 transition-all hover:shadow-md cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Active Rentals</p>
                            <h3 className="text-3xl font-bold text-[#041334]">342</h3>
                        </div>
                        <div className="h-12 w-12 bg-[#92a417]/10 rounded-xl flex items-center justify-center group-hover:bg-[#92a417] group-hover:scale-110 transition-all duration-300">
                            <ArrowRightLeft className="h-6 w-6 text-[#92a417] group-hover:text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+5% from last week</span>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#92a417]/30 transition-all hover:shadow-md cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Total Gear</p>
                            <h3 className="text-3xl font-bold text-[#041334]">890</h3>
                        </div>
                        <div className="h-12 w-12 bg-[#041334]/5 rounded-xl flex items-center justify-center group-hover:bg-[#041334] group-hover:scale-110 transition-all duration-300">
                            <Dumbbell className="h-6 w-6 text-[#041334] group-hover:text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-slate-500 font-medium">
                        <Activity className="h-4 w-4 mr-1" />
                        <span>45 currently maintenance</span>
                    </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#92a417]/30 transition-all hover:shadow-md cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Monthly Revenue</p>
                            <h3 className="text-3xl font-bold text-[#041334]">$12.4k</h3>
                        </div>
                        <div className="h-12 w-12 bg-[#92a417]/10 rounded-xl flex items-center justify-center group-hover:bg-[#92a417] group-hover:scale-110 transition-all duration-300">
                            <DollarSign className="h-6 w-6 text-[#92a417] group-hover:text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+18% from last month</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Activity Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Health */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-[#041334] mb-4">Platform Activity</h3>
                    <div className="flex flex-col gap-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-[#041334]/5 flex items-center justify-center shrink-0">
                                    <ArrowRightLeft className="h-5 w-5 text-[#041334]" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-700">New rental booked: <span className="text-[#92a417]">Pro Squat Rack</span></p>
                                    <p className="text-xs text-slate-500">2 minutes ago • by Alex Johnson</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href="/dashboard/admin/rented" className="block mt-4 text-center text-sm font-medium text-[#92a417] hover:text-[#041334] transition-colors">
                        View all rentals &rarr;
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="bg-[#041334] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#92a417]/20 blur-2xl"></div>
                    <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5 blur-2xl"></div>
                    
                    <h3 className="text-lg font-bold mb-2 relative z-10">Quick Actions</h3>
                    <p className="text-sm text-slate-300 mb-6 relative z-10">Manage your gym equipment platform efficiently.</p>
                    
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        <Link href="/dashboard/admin/users" className="bg-white/10 hover:bg-[#92a417] transition-all p-4 rounded-xl flex flex-col items-center justify-center gap-2 group">
                            <Users className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Manage Users</span>
                        </Link>
                        <Link href="/dashboard/admin/posts" className="bg-white/10 hover:bg-[#92a417] transition-all p-4 rounded-xl flex flex-col items-center justify-center gap-2 group">
                            <Dumbbell className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Review Gear</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}