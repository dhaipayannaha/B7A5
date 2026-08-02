import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Globe, Camera, Tent, Bike } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
                <div className="absolute inset-0 bg-gradient-to-br from-[#92a417]/10 via-background to-background -z-10" />
                
                <div className="mx-auto max-w-6xl px-4 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
                        Rent the Best Gear, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#92a417] to-[#6a780e]">
                            Anywhere, Anytime.
                        </span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Whether you're camping in the mountains, shooting a film, or taking a weekend bike ride, we have the high-quality gear you need—from trusted local providers.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/gear">
                            <Button size="lg" className="h-14 px-8 text-base gap-2 bg-[#92a417] hover:bg-[#829214] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-full w-full sm:w-auto">
                                Browse Gear
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                        <Link href="/dashboard/provider">
                            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-border hover:bg-accent hover:-translate-y-0.5 transition-all duration-300 rounded-full w-full sm:w-auto">
                                List Your Gear
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Decorative blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#92a417]/10 blur-[120px] rounded-full -z-20 pointer-events-none" />
            </section>

            {/* Features Section */}
            <section className="py-24 bg-muted/30">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Why Choose Rental Gear?</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">Experience a seamless and secure platform designed to connect gear owners with enthusiasts.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-[#92a417]/10 text-[#92a417] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#92a417] group-hover:text-white transition-colors duration-300">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Our integrated payment system ensures every transaction is safe, secure, and hassle-free.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-[#92a417]/10 text-[#92a417] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#92a417] group-hover:text-white transition-colors duration-300">
                                <Zap size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Browse real-time availability and instantly book the gear you need without waiting days for a response.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group">
                            <div className="w-14 h-14 bg-[#92a417]/10 text-[#92a417] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#92a417] group-hover:text-white transition-colors duration-300">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verified Providers</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Rent with confidence. All our gear providers go through a strict verification process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight mb-2">Explore Categories</h2>
                            <p className="text-muted-foreground">Find exactly what you're looking for.</p>
                        </div>
                        <Link href="/gear" className="hidden sm:flex text-sm font-medium text-[#92a417] hover:underline items-center gap-1 group">
                            View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Category 1 */}
                        <Link href="/gear?category=Photography+%26+Film" className="group relative h-72 rounded-2xl overflow-hidden bg-accent flex items-end p-6 border border-border">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/10 z-10 transition-opacity duration-300 group-hover:opacity-80" />
                            {/* Abstract background for categories since we don't have images loaded */}
                            <div className="absolute inset-0 bg-[#041334] opacity-50 z-0"></div>
                            
                            <div className="relative z-20 flex flex-col items-start text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl mb-4 border border-white/20">
                                    <Camera size={28} />
                                </div>
                                <h3 className="text-2xl font-bold">Photography</h3>
                                <p className="text-white/80 text-sm mt-1">Cameras, Lenses, Lighting</p>
                            </div>
                        </Link>

                        {/* Category 2 */}
                        <Link href="/gear?category=Camping" className="group relative h-72 rounded-2xl overflow-hidden bg-accent flex items-end p-6 border border-border">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#92a417]/80 via-black/40 to-black/10 z-10 transition-opacity duration-300 group-hover:opacity-80 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-[#3a4507] opacity-60 z-0"></div>
                            
                            <div className="relative z-20 flex flex-col items-start text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl mb-4 border border-white/20">
                                    <Tent size={28} />
                                </div>
                                <h3 className="text-2xl font-bold">Camping & Outdoors</h3>
                                <p className="text-white/80 text-sm mt-1">Tents, Backpacks, Stoves</p>
                            </div>
                        </Link>

                        {/* Category 3 */}
                        <Link href="/gear?category=Cycling" className="group relative h-72 rounded-2xl overflow-hidden bg-accent flex items-end p-6 border border-border">
                            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/10 z-10 transition-opacity duration-300 group-hover:opacity-80" />
                            <div className="absolute inset-0 bg-[#1e293b] opacity-50 z-0"></div>
                            
                            <div className="relative z-20 flex flex-col items-start text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl mb-4 border border-white/20">
                                    <Bike size={28} />
                                </div>
                                <h3 className="text-2xl font-bold">Cycling</h3>
                                <p className="text-white/80 text-sm mt-1">Road Bikes, Mountain Bikes</p>
                            </div>
                        </Link>
                    </div>
                    
                    {/* Mobile View all */}
                    <div className="mt-8 sm:hidden text-center">
                        <Link href="/gear">
                            <Button variant="outline" className="w-full">
                                View all categories
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24 bg-gradient-to-br from-[#041334] to-[#0a204e] text-white relative overflow-hidden">
                {/* Abstract shape */}
                <div className="absolute right-0 top-0 w-96 h-96 bg-[#92a417]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="mx-auto max-w-4xl px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready to get started?</h2>
                    <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                        Join thousands of users who are renting high-quality gear for a fraction of the purchase cost, or start earning by renting out your own.
                    </p>
                    <Link href="/gear">
                        <Button size="lg" className="h-14 px-10 text-base bg-[#92a417] hover:bg-[#829214] text-white rounded-full border-none shadow-xl hover:-translate-y-1 transition-transform duration-300">
                            Start Exploring Now
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
