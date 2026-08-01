import React from "react";
import { getMyRentals } from "../../_actions/getMyRentals";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PackageIcon, CreditCardIcon, CheckCircle2Icon } from "lucide-react";

export default async function CustomerDashboardPage() {
    // Fetch rentals from backend
    const rentalsRes = await getMyRentals();
    const rentals = rentalsRes?.data || [];

    return (
        <div className="space-y-8 p-6 lg:p-10 max-w-6xl mx-auto">
            {/* Dashboard Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#041334]">My Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your active rentals and payment history.
                </p>
            </div>

            {/* Rentals List Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <PackageIcon className="text-[#92a417]" />
                    My Rentals
                </h2>

                {rentals.length === 0 ? (
                    // Empty State
                    <Card className="border-dashed border-2 shadow-none bg-slate-50/50">
                        <CardContent className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                            <div className="p-4 rounded-full bg-[#92a417]/10">
                                <PackageIcon size={32} className="text-[#92a417]" />
                            </div>
                            <div>
                                <p className="text-lg font-medium text-[#041334]">No active rentals</p>
                                <p className="text-sm text-muted-foreground">You haven't rented any gear yet.</p>
                            </div>
                            <a
                                href="/gear"
                                className="mt-4 px-6 py-2.5 bg-[#041334] text-white rounded-lg text-sm font-medium hover:bg-[#041334]/90 transition"
                            >
                                Browse Gear
                            </a>
                        </CardContent>
                    </Card>
                ) : (
                    // Rentals Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rentals.map((rental: any, index: number) => (
                            <Card key={rental.id || index} className="overflow-hidden border-border/60 hover:shadow-md transition-shadow">
                                <div className="h-2 w-full bg-[#92a417]" />
                                <CardHeader className="pb-3 border-b border-border/50 bg-slate-50/50">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">Order #{rental.id?.slice(-6).toUpperCase() || "N/A"}</CardTitle>
                                        <Badge className={rental.paymentStatus === "PAID" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"}>
                                            {rental.paymentStatus || "PENDING"}
                                        </Badge>
                                    </div>
                                    <CardDescription>
                                        {rental.gearItem?.name || "Gear Item"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-4 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs flex items-center gap-1"><CalendarIcon size={12}/> Start</p>
                                            <p className="font-medium mt-0.5">{rental.startDate ? new Date(rental.startDate).toLocaleDateString() : "N/A"}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs flex items-center gap-1"><CalendarIcon size={12}/> End</p>
                                            <p className="font-medium mt-0.5">{rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "N/A"}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                                            <CreditCardIcon size={14} /> Total
                                        </p>
                                        <p className="font-bold text-[#92a417]">৳ {rental.totalAmount?.toLocaleString() || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}