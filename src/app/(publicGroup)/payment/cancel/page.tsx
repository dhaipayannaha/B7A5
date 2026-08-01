import Link from "next/link";
import { XCircleIcon, ArrowLeftIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Payment Cancelled — Gear Rentals",
    description: "Your payment was cancelled. No charges were made.",
};

export default function PaymentCancelPage() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
            <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">

                {/* Icon */}
                <div className="h-24 w-24 rounded-full bg-orange-50 flex items-center justify-center">
                    <XCircleIcon className="h-12 w-12 text-orange-400" />
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-[#041334]">Payment Cancelled</h1>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        You cancelled the checkout. <strong>No charges were made</strong> to your account.
                        Your rental was not confirmed.
                    </p>
                </div>

                {/* Info box */}
                <div className="w-full rounded-xl border border-orange-100 bg-orange-50/60 p-4 text-sm text-orange-700 text-left space-y-1">
                    <p className="font-semibold">What happened?</p>
                    <p>You pressed the back button or closed the Stripe Checkout page before completing payment.</p>
                </div>

                {/* Actions */}
                <div className="flex w-full flex-col sm:flex-row gap-3">
                    <Button
                        asChild
                        variant="outline"
                        className="flex-1 gap-2"
                    >
                        <Link href="/gear">
                            <ArrowLeftIcon size={15} />
                            Back to Gear
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="flex-1 gap-2 bg-[#92a417] hover:bg-[#829214] text-white"
                    >
                        <Link href="/gear">
                            <RefreshCwIcon size={15} />
                            Try Again
                        </Link>
                    </Button>
                </div>

            </div>
        </div>
    );
}
