const PAYMENT_STYLES: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
    FAILED: "bg-red-50 text-red-700 border-red-200",
    REFUNDED: "bg-gray-50 text-gray-700 border-gray-200",
};

export function PaymentStatusBadge({ status }: { status: string }) {
    const style = PAYMENT_STYLES[status] ?? "bg-gray-50 text-gray-700 border-gray-200";
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
            {status}
        </span>
    );
}