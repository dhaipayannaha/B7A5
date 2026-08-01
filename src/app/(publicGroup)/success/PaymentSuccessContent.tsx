"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmPaymentAction } from "../../_actions/confirmPayment";
import { CheckCircleIcon, XCircleIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const transactionId = searchParams?.get("transactionId") || searchParams?.get("session_id");

        const getCookie = (name: string) => {
            const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
            return match ? decodeURIComponent(match[2]) : null;
        };

        const rentalOrderId =
            searchParams?.get("rentalOrderId") ||
            getCookie("pendingRentalOrderId");

        console.log("[SuccessPage] transactionId:", transactionId);
        console.log("[SuccessPage] rentalOrderId:", rentalOrderId);
        console.log("[SuccessPage] all cookies:", document.cookie);

        if (!transactionId || !rentalOrderId) {
            setStatus("error");
            setMessage(`Missing IDs — transactionId: ${transactionId ?? "MISSING"}, rentalOrderId: ${rentalOrderId ?? "MISSING"}`);
            return;
        }

        document.cookie = "pendingRentalOrderId=; max-age=0; path=/";
        let isMounted = true;

        const confirmPayment = async () => {
            const result = await confirmPaymentAction({ transactionId, rentalOrderId });

            if (!isMounted) return;

            if (result?.success) {
                setStatus("success");
                setMessage("Payment confirmed successfully! Redirecting to your dashboard...");
                toast.success("Payment confirmed!");

                // Redirect to dashboard after a short delay so the user can see the success state
                setTimeout(() => {
                    if (isMounted) {
                        router.push("/dashboard/customer");
                    }
                }, 2000);
            } else {
                setStatus("error");
                setMessage(result?.message || "Failed to confirm payment.");
            }
        };

        confirmPayment();

        return () => {
            isMounted = false;
        };
    }, [searchParams, router]);

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center gap-4">
                <Loader2Icon className="h-10 w-10 animate-spin text-[#92a417]" />
                <h2 className="text-xl font-semibold">Confirming your payment...</h2>
                <p className="text-muted-foreground">Please don't close this page.</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex flex-col items-center gap-4 text-center">
                <XCircleIcon className="h-16 w-16 text-red-500" />
                <h2 className="text-2xl font-bold text-red-600">Payment Confirmation Failed</h2>
                <p className="text-muted-foreground max-w-sm">{message}</p>
                <div className="mt-4 flex gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/customer">Go to Dashboard</Link>
                    </Button>
                    <Button asChild className="bg-[#92a417] hover:bg-[#829214]">
                        <Link href="/gear">Browse Gear</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="text-muted-foreground max-w-sm">{message}</p>
            <div className="mt-6 flex gap-4">
                <Loader2Icon className="h-5 w-5 animate-spin text-[#92a417] mx-auto" />
            </div>
        </div>
    );
}
