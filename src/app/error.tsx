'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { AlertOctagon, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Global Error Boundary caught:", error)
    }, [error])

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500 mb-6 shadow-sm border border-red-100">
                <AlertOctagon className="h-12 w-12" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-[#041334] mb-3">
                Something went wrong
            </h1>
            
            <p className="text-slate-500 max-w-md mx-auto mb-8">
                We encountered an unexpected error while trying to load this page. Our team has been notified.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button 
                    onClick={() => reset()} 
                    className="flex items-center gap-2 px-6 py-2.5 h-12 rounded-xl bg-[#041334] text-white font-medium hover:bg-[#041334]/90 transition-all shadow-md"
                >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
                
                <Link href="/">
                    <Button 
                        variant="outline"
                        className="flex items-center gap-2 px-6 py-2.5 h-12 rounded-xl border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-all"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}