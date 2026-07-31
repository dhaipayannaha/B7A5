import React from 'react';
import { Users, Dumbbell, ArrowRightLeft, Activity } from 'lucide-react';
import Link from 'next/link';
import { getAllUsers } from './_actions/getAllUsers';
import { getAllGear } from './_actions/getAllGear';
import { getAllRentals } from './_actions/getAllRentals';

export default async function adminDashboardPages() {
    // Fetch all data in parallel
    const [usersResult, gearResult, rentalsResult] = await Promise.all([
        getAllUsers(),
        getAllGear(),
        getAllRentals(),
    ]);

    const users: any[] = usersResult?.success ? usersResult.data : [];
    const gear: any[] = gearResult?.success ? gearResult.data : [];
    const rentals: any[] = rentalsResult?.success ? rentalsResult.data : [];

    const totalUsers = users.length;
    const totalGear = gear.length;
    const activeGear = gear.filter((g) =>
        g.status === "AVAILABLE" || g.availability === "AVAILABLE"
    ).length;
    const totalRentals = rentals.length;
    const activeRentals = rentals.filter((r) =>
        r.status === "ACTIVE" || r.status === "ONGOING" || r.rentalStatus === "ACTIVE"
    ).length;

    const stats = [
        {
            label: "Total Users",
            value: totalUsers,
            sub: `Platform members`,
            icon: Users,
            accent: "#041334",
            bg: "bg-[#041334]/5",
            hoverBg: "group-hover:bg-[#041334]",
        },
        {
            label: "Total Gear",
            value: totalGear,
            sub: `${activeGear} currently available`,
            icon: Dumbbell,
            accent: "#92a417",
            bg: "bg-[#92a417]/10",
            hoverBg: "group-hover:bg-[#92a417]",
        },
        {
            label: "Total Rentals",
            value: totalRentals,
            sub: `${activeRentals} active right now`,
            icon: ArrowRightLeft,
            accent: "#041334",
            bg: "bg-[#041334]/5",
            hoverBg: "group-hover:bg-[#041334]",
        },
    ];

    return (
        <div className="space-y-8 p-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className="z-10">
                    <h1 className="text-3xl font-bold tracking-tight text-[#041334]">
                        Welcome to <span className="text-[#92a417]">GearUp</span> Admin
                    </h1>
                    <p className="text-sm text-slate-500 mt-2 max-w-xl">
                        Live overview of platform health — users, gear inventory, and rental activity.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-64 h-full bg-[#041334]/5 skew-x-12 translate-x-12" />
                <div className="absolute right-12 top-0 w-16 h-full bg-[#92a417]/10 skew-x-12 translate-x-12" />
            </div>

            {/* Live Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-[#92a417]/30 transition-all hover:shadow-md"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
                                <h3 className="text-4xl font-bold text-[#041334]">
                                    {stat.value.toLocaleString()}
                                </h3>
                            </div>
                            <div
                                className={`h-12 w-12 ${stat.bg} rounded-xl flex items-center justify-center ${stat.hoverBg} group-hover:scale-110 transition-all duration-300`}
                            >
                                <stat.icon
                                    className="h-6 w-6 transition-colors duration-300"
                                    style={{ color: stat.accent }}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-slate-500 font-medium">
                            <Activity className="h-4 w-4 mr-1" />
                            <span>{stat.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-[#041334] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#92a417]/20 blur-2xl" />
                <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />

                <h3 className="text-lg font-bold mb-2 relative z-10">Quick Actions</h3>
                <p className="text-sm text-slate-300 mb-6 relative z-10">
                    Manage your gym equipment platform efficiently.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                    <Link
                        href="/dashboard/admin/users"
                        className="bg-white/10 hover:bg-[#92a417] transition-all p-4 rounded-xl flex flex-col items-center justify-center gap-2 group"
                    >
                        <Users className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Manage Users</span>
                    </Link>
                    <Link
                        href="/dashboard/admin/gear"
                        className="bg-white/10 hover:bg-[#92a417] transition-all p-4 rounded-xl flex flex-col items-center justify-center gap-2 group"
                    >
                        <Dumbbell className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Review Gear</span>
                    </Link>
                    <Link
                        href="/dashboard/admin/rented"
                        className="bg-white/10 hover:bg-[#92a417] transition-all p-4 rounded-xl flex flex-col items-center justify-center gap-2 group"
                    >
                        <ArrowRightLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">View Rentals</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}