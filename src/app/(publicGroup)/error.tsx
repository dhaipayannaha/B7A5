"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, RotateCcwIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function PublicError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service if configured
        console.error("Public Error Boundary caught:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
            {/* Icon Container */}
            <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-75" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-xl shadow-red-100/50">
                    <AlertCircleIcon className="h-12 w-12" />
                </div>
            </div>

            {/* Content */}
            <h1 className="mb-3 text-3xl font-extrabold text-[#041334] tracking-tight">Oops! Something went wrong.</h1>
            <p className="mb-8 max-w-md text-base text-slate-500">
                We encountered an unexpected error while trying to load this page. It might be a temporary connection issue.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                    onClick={reset}
                    className="h-12 px-8 rounded-full bg-[#92a417] hover:bg-[#829214] text-white shadow-md shadow-[#92a417]/20 font-bold gap-2 transition-all hover:-translate-y-0.5"
                >
                    <RotateCcwIcon className="h-4 w-4" />
                    Try Again
                </Button>

                <Button 
                    asChild
                    variant="outline"
                    className="h-12 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 font-bold gap-2 transition-all hover:-translate-y-0.5"
                >
                    <Link href="/">
                        <HomeIcon className="h-4 w-4" />
                        Go Back Home
                    </Link>
                </Button>
            </div>
            
            {/* Technical Detail (optional for users, good for debugging) */}
            {process.env.NODE_ENV === "development" && (
                <div className="mt-12 max-w-2xl w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-left overflow-auto">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Developer Details</p>
                    <pre className="text-[10px] text-red-600 font-mono whitespace-pre-wrap">{error.message}</pre>
                </div>
            )}
        </div>
    );
}
