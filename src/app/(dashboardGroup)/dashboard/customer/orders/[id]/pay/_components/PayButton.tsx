"use client";

import { useState } from "react";
import { createPaymentSession } from "@/app/(dashboardGroup)/_actions/payment";

interface PayButtonProps {
    rentalOrderId: string;
}

export default function PayButton({ rentalOrderId }: PayButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePay = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await createPaymentSession(rentalOrderId);
            // If redirect didn't happen (e.g. error returned)
            if (result && !result.success) {
                setError(result.message);
            }
        } catch {
            // next/navigation redirect() throws internally — that's expected and fine
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 text-center">
                    {error}
                </div>
            )}
            <button
                onClick={handlePay}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:-translate-y-0.5 active:translate-y-0"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Redirecting to Stripe...
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Pay Now
                    </>
                )}
            </button>
        </div>
    );
}
