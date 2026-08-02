import Link from "next/link";
import RegisterFrom from "../_components/RegisterFrom";
import { ShieldCheck, Zap } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen">
            {/* Left side panel (hidden on small screens) */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#041334] to-[#0a204e] p-12 text-white flex-col justify-between relative overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#92a417]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 mb-12 w-fit">
                        <span className="flex size-8 items-center justify-center rounded-md bg-[#92a417] text-sm font-bold text-white shadow-sm">
                            RG
                        </span>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Rental Gear
                        </span>
                    </Link>

                    <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-6">
                        Start your journey with Rental Gear today.
                    </h1>
                    <p className="text-lg text-white/80 max-w-md">
                        Join our community of outdoor enthusiasts and professional creators. Rent the gear you need, or start earning from the gear you own.
                    </p>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <ShieldCheck size={24} className="text-[#92a417]" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Verified Community</h3>
                            <p className="text-sm text-white/70">A trusted network of renters and owners.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                            <Zap size={24} className="text-[#92a417]" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Instant Booking</h3>
                            <p className="text-sm text-white/70">Fast, secure, and hassle-free transactions.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center sm:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
                        <p className="text-muted-foreground">
                            Enter your details below to get started.
                        </p>
                    </div>

                    <RegisterFrom />

                    <div className="text-center sm:text-left text-sm text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-[#92a417] hover:underline transition-all">
                            Log in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}