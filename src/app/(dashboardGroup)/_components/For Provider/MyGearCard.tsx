"use client";

import { Equipment } from "@/lib/types";
import { SparklesIcon, Calendar, Package, DollarSign } from "lucide-react";
import Image from "next/image";

export function MyGearCard({ gear }: { gear: Equipment }) {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100/80 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1">
            
            {/* Image Container */}
            <div className="relative h-48 w-full bg-slate-50">
                {gear.images?.[0] ? (
                    <Image
                        src={gear.images[0]}
                        alt={gear.title}
                        fill
                        className="object-cover"
                        unoptimized
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300">
                        <Package className="h-10 w-10" />
                    </div>
                )}
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm">
                        {gear.condition}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${
                        gear.status === 'AVAILABLE' ? 'bg-emerald-500/90 text-white' : 
                        gear.status === 'RENTED' ? 'bg-amber-500/90 text-white' : 'bg-slate-800/90 text-white'
                    }`}>
                        {gear.status}
                    </span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col p-5">
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#92a417] transition-colors">{gear.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {gear.description}
                    </p>
                </div>

                {/* Metrics */}
                <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-emerald-50 p-1.5 text-emerald-600">
                            <DollarSign className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">Rate/Day</span>
                            <span className="text-sm font-bold text-slate-700">৳{gear.dailyRate}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-50 p-1.5 text-blue-600">
                            <Package className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-semibold text-slate-400 uppercase">Stock</span>
                            <span className="text-sm font-bold text-slate-700">{gear.availableQuantity}/{gear.quantity}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}