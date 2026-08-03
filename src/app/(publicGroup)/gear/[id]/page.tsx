import { getGearById } from "@/app/(publicGroup)/_actions/getGearById";
import { RentNowDialog } from "@/app/(publicGroup)/_components/payment/RentNowDialog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeftIcon,
    BadgeCheckIcon,
    BoxIcon,
    CalendarIcon,
    LayersIcon,
    MapPinIcon,
    PackageIcon,
    ShieldCheckIcon,
    SparklesIcon,
    StarIcon,
    TagIcon,
    UserIcon,
    WrenchIcon,
    ZapIcon,
    MessageCircleIcon,
    UserCircleIcon,
} from "lucide-react";
// ── Helpers ─────────────────────────────────────────────────────────────────

const CONDITION_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
    NEW: { label: "New", color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: "🌟" },
    EXCELLENT: { label: "Excellent", color: "bg-blue-100   text-blue-700   border-blue-200", icon: "✨" },
    GOOD: { label: "Good", color: "bg-amber-100  text-amber-700  border-amber-200", icon: "👍" },
    FAIR: { label: "Fair", color: "bg-orange-100 text-orange-700 border-orange-200", icon: "🔧" },
    POOR: { label: "Poor", color: "bg-red-100    text-red-700    border-red-200", icon: "⚠️" },
};

const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
    AVAILABLE: { label: "Available", dot: "bg-emerald-500" },
    UNAVAILABLE: { label: "Unavailable", dot: "bg-red-500" },
    RENTED: { label: "Rented", dot: "bg-amber-500" },
    MAINTENANCE: { label: "Maintenance", dot: "bg-slate-400" },
};

function StatCard({ icon: Icon, label, value, accent = false }: {
    icon: React.ElementType;
    label: string;
    value: string;
    accent?: boolean;
}) {
    return (
        <div className={`flex flex-col items-center gap-1 rounded-2xl p-4 border transition-all ${accent
                ? "bg-[#92a417]/8 border-[#92a417]/20 text-[#92a417]"
                : "bg-slate-50 border-slate-100 text-slate-600"
            }`}>
            <Icon className="h-5 w-5 mb-0.5" />
            <span className={`text-xl font-bold ${accent ? "text-[#92a417]" : "text-[#041334]"}`}>{value}</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        </div>
    );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default async function GearByIdPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getGearById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const gear = result.data;
    const condition = CONDITION_CONFIG[gear.condition] ?? { label: gear.condition, color: "bg-slate-100 text-slate-600 border-slate-200", icon: "📦" };
    const statusInfo = STATUS_CONFIG[gear.status] ?? { label: gear.status, dot: "bg-slate-400" };
    const isAvailable = gear.status === "AVAILABLE" && gear.availableQuantity > 0;

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            {/* ── Breadcrumb ── */}
            <div className="border-b border-slate-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-[#041334] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/gear" className="hover:text-[#041334] transition-colors">Gear</Link>
                    <span>/</span>
                    <span className="text-[#041334] font-semibold line-clamp-1 max-w-60">{gear.title}</span>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                {/* Back button */}
                <Link
                    href="/gear"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[#041334] transition-colors mb-8 group"
                >
                    <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to All Gear
                </Link>

                <div className="grid gap-10 lg:grid-cols-[1fr_400px]">

                    {/* ── LEFT: Images + Details ── */}
                    <div className="space-y-8">

                        {/* Hero image gallery */}
                        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_4px_24px_-6px_rgba(6,81,237,0.1)]">
                            {gear.images && gear.images.length > 0 ? (
                                <div className="space-y-2 p-2">
                                    {/* Main image */}
                                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
                                        <Image
                                            src={gear.images[0]}
                                            alt={gear.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                            priority
                                        />
                                        {/* Status badge overlay */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border bg-white/90 backdrop-blur-sm shadow-sm`}>
                                                <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                        {/* Condition badge overlay */}
                                        <div className="absolute top-4 right-4">
                                            <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold border ${condition.color} bg-white/90 backdrop-blur-sm shadow-sm`}>
                                                {condition.icon} {condition.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Thumbnails */}
                                    {gear.images.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto pb-1">
                                            {gear.images.slice(1).map((src, i) => (
                                                <div
                                                    key={i}
                                                    className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200 cursor-pointer hover:border-[#92a417] transition-colors"
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`${gear.title} ${i + 2}`}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex aspect-[16/9] items-center justify-center rounded-2xl m-2 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
                                    <PackageIcon className="h-16 w-16" />
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_2px_12px_-4px_rgba(6,81,237,0.08)] p-7">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-1.5 rounded-lg bg-[#92a417]/10">
                                    <LayersIcon className="h-4 w-4 text-[#92a417]" />
                                </div>
                                <h2 className="text-base font-bold text-[#041334] uppercase tracking-wide">Description</h2>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
                                {gear.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_2px_12px_-4px_rgba(6,81,237,0.08)] p-7">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="p-1.5 rounded-lg bg-[#92a417]/10">
                                    <WrenchIcon className="h-4 w-4 text-[#92a417]" />
                                </div>
                                <h2 className="text-base font-bold text-[#041334] uppercase tracking-wide">Specifications</h2>
                            </div>
                            <dl className="grid grid-cols-2 gap-y-4 gap-x-8 sm:grid-cols-3">
                                {[
                                    { label: "Brand", value: gear.brand, icon: TagIcon },
                                    { label: "Model", value: gear.model, icon: BoxIcon },
                                    { label: "Category", value: gear.category?.name, icon: LayersIcon },
                                    { label: "Condition", value: condition.label, icon: SparklesIcon },
                                    { label: "Status", value: statusInfo.label, icon: ZapIcon },
                                    { label: "Listed", value: new Date(gear.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }), icon: CalendarIcon },
                                ].map(({ label, value, icon: Icon }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex-shrink-0 p-1.5 rounded-lg bg-slate-50 text-slate-500">
                                            <Icon className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0">
                                            <dt className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</dt>
                                            <dd className="mt-0.5 text-sm font-semibold text-[#041334] truncate">{value ?? "—"}</dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        {/* Provider info */}
                        {gear.provider && (
                            <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_2px_12px_-4px_rgba(6,81,237,0.08)] p-7">
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="p-1.5 rounded-lg bg-[#92a417]/10">
                                        <UserIcon className="h-4 w-4 text-[#92a417]" />
                                    </div>
                                    <h2 className="text-base font-bold text-[#041334] uppercase tracking-wide">Listed By</h2>
                                </div>
                                <div className="flex items-center gap-4">
                                    {gear.provider.image ? (
                                        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#92a417]/30">
                                            <Image
                                                src={gear.provider.image}
                                                alt={gear.provider.name}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#92a417]/10 text-[#92a417] text-xl font-bold border-2 border-[#92a417]/20">
                                            {gear.provider.name?.[0]?.toUpperCase() ?? "P"}
                                        </div>
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-base font-bold text-[#041334]">{gear.provider.name}</p>
                                            <BadgeCheckIcon className="h-4 w-4 text-[#92a417]" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">{gear.provider.email}</p>
                                        {gear.provider.phone && (
                                            <p className="text-sm text-muted-foreground">{gear.provider.phone}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Customer Reviews */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_2px_12px_-4px_rgba(6,81,237,0.08)] p-7">
                            <div className="flex items-center gap-2 mb-5">
                                <div className="p-1.5 rounded-lg bg-[#92a417]/10">
                                    <MessageCircleIcon className="h-4 w-4 text-[#92a417]" />
                                </div>
                                <h2 className="text-base font-bold text-[#041334] uppercase tracking-wide">Customer Reviews</h2>
                                <span className="ml-auto inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                                    {gear.reviews?.length || 0}
                                </span>
                            </div>

                            {(!gear.reviews || gear.reviews.length === 0) ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                                    <StarIcon className="h-8 w-8 text-slate-300 mb-3" />
                                    <p className="text-sm font-medium text-slate-500">No reviews yet</p>
                                    <p className="text-xs text-slate-400 mt-1">Be the first to review this gear after renting!</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {gear.reviews.map((review) => (
                                        <div key={review.id} className="flex gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                            {/* Avatar */}
                                            {review.customer?.image ? (
                                                <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-slate-200">
                                                    <Image
                                                        src={review.customer.image}
                                                        alt={review.customer.name}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 border border-slate-200">
                                                    <UserCircleIcon className="h-6 w-6" />
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#041334] truncate">
                                                            {review.customer?.name || "Anonymous User"}
                                                        </p>
                                                        <p className="text-[10px] text-muted-foreground">
                                                            {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map((_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                                        {review.comment}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── RIGHT: Sticky Booking Card ── */}
                    <div className="lg:sticky lg:top-20 self-start space-y-5">

                        {/* Title + category */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_4px_24px_-6px_rgba(6,81,237,0.1)] p-7 space-y-5">
                            <div>
                                {gear.category && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#92a417]/10 px-3 py-1 text-xs font-bold text-[#92a417] mb-3">
                                        <MapPinIcon className="h-3 w-3" />
                                        {gear.category.name}
                                    </span>
                                )}
                                <h1 className="text-2xl font-extrabold text-[#041334] leading-tight">{gear.title}</h1>
                                <p className="text-sm text-muted-foreground mt-1">{gear.brand} · {gear.model}</p>
                            </div>

                            {/* Price */}
                            <div className="rounded-2xl bg-gradient-to-br from-[#041334] to-[#0a1f52] p-5 text-white">
                                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">Daily Rental Rate</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-4xl font-extrabold tracking-tight">৳{gear.dailyRate.toLocaleString()}</span>
                                    <span className="text-white/60 mb-1 text-sm">/day</span>
                                </div>
                                <p className="text-xs text-white/50 mt-2">Price per unit. Final total shown at checkout.</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <StatCard icon={PackageIcon} label="Total Qty" value={String(gear.quantity)} />
                                <StatCard icon={ShieldCheckIcon} label="Available" value={String(gear.availableQuantity)} accent />
                                <StatCard icon={StarIcon} label="Condition" value={condition.icon} />
                            </div>

                            {/* Availability indicator */}
                            <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold border ${isAvailable
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                    : "bg-red-50 border-red-200 text-red-700"
                                }`}>
                                <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${isAvailable ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                                {isAvailable
                                    ? `${gear.availableQuantity} unit${gear.availableQuantity !== 1 ? "s" : ""} ready to rent`
                                    : "Currently not available for rent"
                                }
                            </div>

                            {/* CTA Button */}
                            <RentNowDialog
                                gearId={gear.id}
                                gearTitle={gear.title}
                                dailyRate={gear.dailyRate}
                                availableQuantity={gear.availableQuantity}
                            />

                            <p className="text-center text-xs text-muted-foreground">
                                No upfront charge · Pay after confirmation
                            </p>
                        </div>

                        {/* Trust Badges */}
                        <div className="rounded-3xl border border-slate-100 bg-white shadow-[0_2px_12px_-4px_rgba(6,81,237,0.08)] p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Why Rent With Us</p>
                            <div className="space-y-3">
                                {[
                                    { icon: ShieldCheckIcon, title: "Verified Providers", desc: "All gear providers are identity-verified" },
                                    { icon: BadgeCheckIcon, title: "Quality Guaranteed", desc: "Gear is inspected before every rental" },
                                    { icon: ZapIcon, title: "Fast Confirmation", desc: "Get a response within 24 hours" },
                                ].map(({ icon: Icon, title, desc }) => (
                                    <div key={title} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 p-2 rounded-xl bg-[#92a417]/8 text-[#92a417]">
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-[#041334]">{title}</p>
                                            <p className="text-xs text-muted-foreground">{desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}