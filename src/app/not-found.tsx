import Link from 'next/link'
import { FileQuestion, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-slate-400 mb-6 shadow-sm border border-slate-100">
                <FileQuestion className="h-12 w-12" />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-[#041334] mb-3">
                404 Not Found
            </h1>
            
            <p className="text-slate-500 max-w-md mx-auto mb-8 text-lg">
                Oops! We couldn't find the page you were looking for. It might have been moved or deleted.
            </p>
            
            <Link href="/">
                <Button 
                    className="flex items-center gap-2 px-8 py-2.5 h-12 rounded-xl bg-[#92a417] hover:bg-[#829214] text-white text-base font-medium transition-all shadow-md hover:shadow-lg"
                >
                    <Home className="h-5 w-5" />
                    Return Home
                </Button>
            </Link>
        </div>
    )
}