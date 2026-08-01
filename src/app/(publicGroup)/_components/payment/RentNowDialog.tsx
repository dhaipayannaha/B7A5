"use client";

import { useState, useTransition } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, CreditCardIcon, Loader2Icon, ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";
import { handlePayment } from "../../_actions/handlePayment";

interface RentNowDialogProps {
    gearId: string;
    gearTitle: string;
    dailyRate: number;
    availableQuantity: number;
}

export function RentNowDialog({ gearId, gearTitle, dailyRate, availableQuantity }: RentNowDialogProps) {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();

    const today = new Date().toISOString().split("T")[0];

    const computedDays = (() => {
        if (!startDate || !endDate) return 0;
        const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    })();

    const totalAmount = computedDays * dailyRate * quantity;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }
        if (computedDays <= 0) {
            toast.error("End date must be after start date.");
            return;
        }

        // Build payload matching the backend schema
        const payload = {
            gearItemId: gearId,
            startDate: new Date(startDate).toISOString(),  // "2026-08-05T00:00:00.000Z"
            endDate: new Date(endDate).toISOString(),      // "2026-08-10T00:00:00.000Z"
            totalAmount,
        };

        // ✅ Log in browser console too
        console.log("[RentNowDialog] Submitting payload:", payload);

        startTransition(async () => {
            try {
                const result = await handlePayment(payload);
                console.log("[RentNowDialog] handlePayment result:", result);

                if (result?.success) {
                    // Look for the payment URL in the response
                    // It might be at result.url, result.data.url, or result.payment_url
                    const paymentUrl = result.url || result.payment_url || result.data?.url || result.data?.payment_url || (typeof result.data === 'string' ? result.data : null);
                    
                    if (typeof paymentUrl === "string" && paymentUrl.startsWith("http")) {
                        // Redirect to the payment gateway (Stripe Checkout)
                        toast.loading("Redirecting to Stripe Checkout...");
                        window.location.href = paymentUrl;
                        return; // Stop execution here
                    }

                    // Fallback if no URL is found but success is true
                    toast.success("Rental booked successfully! Check your dashboard.", {
                        position: "top-right",
                    });
                    setOpen(false);
                    setStartDate("");
                    setEndDate("");
                    setQuantity(1);
                } else {
                    toast.error(result?.message || "Failed to book rental. Please try again.", {
                        position: "top-right",
                    });
                }
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Something went wrong.";
                toast.error(msg, { position: "top-right" });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <button
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#92a417] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#92a417]/30 transition-all duration-300 hover:bg-[#829214] hover:shadow-xl hover:shadow-[#92a417]/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={availableQuantity === 0}
                    >
                        <ShoppingCartIcon className="h-5 w-5" />
                        {availableQuantity === 0 ? "Out of Stock" : "Rent Now"}
                    </button>
                }
            />

            <DialogContent className="max-w-md p-0 gap-0 overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#92a417]/15 via-[#92a417]/8 to-transparent px-6 py-5 border-b border-border/50">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2 text-[#041334]">
                            <div className="p-1.5 rounded-lg bg-[#92a417]/15">
                                <CreditCardIcon size={16} className="text-[#92a417]" />
                            </div>
                            Book Rental
                        </DialogTitle>
                        <p className="text-xs text-muted-foreground mt-0.5 pl-9 line-clamp-1">{gearTitle}</p>
                    </DialogHeader>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                <CalendarIcon size={11} /> Start Date
                            </Label>
                            <Input
                                type="date"
                                min={today}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                <CalendarIcon size={11} /> End Date
                            </Label>
                            <Input
                                type="date"
                                min={startDate || today}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Quantity
                        </Label>
                        <Input
                            type="number"
                            min={1}
                            max={availableQuantity}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                        <p className="text-xs text-muted-foreground">{availableQuantity} unit(s) available</p>
                    </div>

                    {/* Order Summary */}
                    <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Daily rate</span>
                            <span className="font-semibold">৳{dailyRate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-semibold">{computedDays} day{computedDays !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Quantity</span>
                            <span className="font-semibold">×{quantity}</span>
                        </div>
                        <div className="border-t border-slate-200 pt-2 flex justify-between">
                            <span className="font-bold text-[#041334]">Total</span>
                            <span className="font-bold text-[#92a417] text-lg">৳{totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 pt-1">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending || computedDays === 0}
                            className="flex-1 gap-2 bg-[#92a417] hover:bg-[#829214] text-white shadow hover:shadow-md transition-all"
                        >
                            {isPending ? (
                                <><Loader2Icon size={14} className="animate-spin" /> Processing…</>
                            ) : (
                                <><CreditCardIcon size={14} /> Confirm & Pay</>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}