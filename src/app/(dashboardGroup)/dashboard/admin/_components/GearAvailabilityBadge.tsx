const AVAILABILITY_STYLES: Record<string, string> = {
    AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    RENTED: "bg-blue-50 text-blue-700 border-blue-200",
    MAINTENANCE: "bg-amber-50 text-amber-700 border-amber-200",
    UNAVAILABLE: "bg-red-50 text-red-700 border-red-200",
};

export function GearAvailabilityBadge({ availability }: { availability: string }) {
    const style = AVAILABILITY_STYLES[availability] ?? "bg-gray-50 text-gray-700 border-gray-200";
    return (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>
            {availability}
        </span>
    );
}