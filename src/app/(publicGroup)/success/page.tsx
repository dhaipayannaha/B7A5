import { Suspense } from "react";
import { PaymentSuccessContent } from "./PaymentSuccessContent";
import { Loader2Icon } from "lucide-react";

export default function PaymentSuccessPage() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
            <Suspense
                fallback={
                    <div className="flex flex-col items-center gap-4">
                        <Loader2Icon className="h-10 w-10 animate-spin text-[#92a417]" />
                        <h2 className="text-xl font-semibold">Confirming your payment...</h2>
                        <p className="text-muted-foreground">Please don't close this page.</p>
                    </div>
                }
            >
                <PaymentSuccessContent />
            </Suspense>
        </div>
    );
}
