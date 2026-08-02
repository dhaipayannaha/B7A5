import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
    return (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-8 bg-background">
            <div className="relative flex items-center justify-center">
                {/* Outer spinning ring with brand color */}
                <div className="absolute h-24 w-24 rounded-full border-[3px] border-[#92a417]/20 border-t-[#92a417] animate-spin shadow-lg shadow-[#92a417]/10" />
                
                {/* Inner pulsing container with spinning icon */}
                <div className="h-16 w-16 rounded-full bg-[#92a417]/10 flex items-center justify-center animate-pulse">
                    <Loader2 className="h-8 w-8 text-[#92a417] animate-spin duration-700" />
                </div>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                    Preparing Workspace
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span className="animate-pulse delay-75">Fetching data</span>
                    <span className="flex gap-0.5">
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                        <span className="animate-bounce delay-300">.</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
