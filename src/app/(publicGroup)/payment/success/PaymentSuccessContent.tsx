"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPaymentAction } from "../../_actions/confirmPayment";
import { CheckCircleIcon, XCircleIcon, Loader2Icon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import { toast } from "sonner";

export function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Read rentalOrderId from cookie (more reliable than sessionStorage across Stripe redirect)
        const getCookie = (name: string) => {
            const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
            return match ? decodeURIComponent(match[2]) : null;
        };

        // session_id is the Stripe checkout session ID (transactionId for backend)
        const sessionId = searchParams?.get("session_id");

        // rentalOrderId comes directly from URL param or falls back to cookie
        const rentalOrderId =
            searchParams?.get("rentalOrderId") ||
            getCookie("pendingRentalOrderId");

        // transactionId must be the Stripe session_id — NOT the rentalOrderId
        const transactionId = sessionId;

        // Debug log
        console.log("[SuccessPage] session_id (transactionId):", transactionId);
        console.log("[SuccessPage] rentalOrderId:", rentalOrderId);
        console.log("[SuccessPage] URL params:", window.location.search);

        if (!transactionId || !rentalOrderId) {
            setStatus("error");
            setMessage("We could not verify your payment details. Please check your dashboard or contact support.");
            return;
        }


        // Clear the cookie now that we've read it
        document.cookie = "pendingRentalOrderId=; max-age=0; path=/";

        let isMounted = true;

        const confirmPayment = async () => {
            const result = await confirmPaymentAction({ transactionId, rentalOrderId });

            if (!isMounted) return;

            if (result?.success) {
                setStatus("success");
                setMessage("Payment confirmed successfully! Redirecting to your dashboard...");
                toast.success("Payment confirmed! Booking is active.");

                // Redirect to dashboard after 2 seconds so the user can see the success UI
                setTimeout(() => {
                    if (isMounted) router.push("/dashboard/customer");
                }, 2000);
            } else {
                setStatus("error");
                setMessage(result?.message || "Failed to confirm payment. Please contact support.");
            }
        };

        confirmPayment();

        return () => { isMounted = false; };
    }, [searchParams, router]);

    /* ── Loading ─────────────────────────────────────────────── */
    if (status === "loading") {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-[#92a417]/10 flex items-center justify-center">
                        <Loader2Icon className="h-10 w-10 animate-spin text-[#92a417]" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-[#041334]">Confirming your payment...</h2>
                <p className="text-muted-foreground text-sm">Please don't close this page.</p>
            </div>
        );
    }

    /* ── Error ───────────────────────────────────────────────── */
    if (status === "error") {
        return (
            <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">
                <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
                    <XCircleIcon className="h-12 w-12 text-red-500" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-red-600">Payment Confirmation Failed</h2>
                    <p className="text-muted-foreground text-sm">{message}</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/dashboard/customer" className={buttonVariants({ variant: "outline" })}>
                        Go to Dashboard
                    </Link>
                    <Link href="/gear" className={buttonVariants({ variant: "default" }) + " bg-[#92a417] hover:bg-[#829214] text-white"}>
                        Browse Gear
                    </Link>
                </div>
            </div>
        );
    }

    /* ── Success ─────────────────────────────────────────────── */
    return (
        <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">
            {/* Animated checkmark ring */}
            <div className="relative">
                <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center animate-pulse">
                    <CheckCircleIcon className="h-12 w-12 text-green-500" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
                <p className="text-muted-foreground text-sm">{message}</p>
            </div>

            {/* Countdown indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2Icon className="h-4 w-4 animate-spin text-[#92a417]" />
                Redirecting to dashboard in 2 seconds...
            </div>
        </div>
    );
}
