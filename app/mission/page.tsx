"use client";

import { Suspense } from "react";
import Link from "next/link";
import Navbar from "../components/NavBar";

export default function MissionPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-neutral-950/80 backdrop-blur-md">
                <Suspense fallback={<div className="h-16 border-b border-neutral-900" />}>
                    <Navbar />
                </Suspense>
            </header>

            {/* Hero Section */}
            <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                <div className="max-w-3xl border-l-2 border-gold-500 pl-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-500 mb-4">
                        Our Mission
                    </p>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight">
                        Practical software education <br />
                        <span className="text-blue-500 italic">for all.</span>
                    </h1>
                    <p className="mt-8 text-lg md:text-xl text-neutral-400 leading-relaxed font-medium">
                        UVic Hacks is a student-led initiative dedicated to bridging the gap
                        between academic learning and real-world engineering through
                        high-intensity build sprints.
                    </p>
                </div>
            </section>

            {/* Values Grid */}
            <section className="bg-neutral-900/30 border-y border-neutral-900 py-24">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        {/* Value 1: Inclusivity */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-white">Inclusivity</h3>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                We believe hackathons are for everyone.
                                We prioritize creating a space where beginners and marginalized communities feel empowered to
                                ship their first lines of code alongside veteran builders.
                            </p>
                        </div>

                        {/* Value 2: Education */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-white">Education</h3>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Our events are labs, not just competitions. We provide the
                                infrastructure, workshops, and resources necessary to learn
                                new stacks in a single weekend.
                            </p>
                        </div>

                        {/* Value 3: Mentorship */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-gold-500"></div>
                                <h3 className="text-xs font-black uppercase tracking-widest text-white">Mentorship</h3>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                                Connection is our core output. By bringing in industry professionals
                                as mentors, we provide students with direct access to the
                                engineers currently shaping the tech landscape.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Methodology Section */}
            <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 text-center">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-8">
                    Our Methodology
                </h2>
                <div className="inline-block relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-gold-500 rounded-none blur opacity-20"></div>
                    <div className="relative bg-neutral-900 p-12 md:p-20 border border-neutral-800">
                        <p className="text-2xl md:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight italic">
                            "We believe community and competition are the driving forces for innovation."
                        </p>
                        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-blue-500 tracking-tighter">48h</span>
                                <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Sprints</span>
                            </div>
                            <div className="hidden md:block w-[1px] h-8 bg-neutral-800"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-blue-500 tracking-tighter">100+</span>
                                <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Hackers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="bg-neutral-900/30 py-16 text-center">
                <div className="mx-auto max-w-4xl px-6">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-6 italic">
                        Ready to contribute?
                    </h3>
                    <Link
                        href="/#upcoming"
                        className="inline-block bg-white text-black px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-neutral-950 hover:text-white transition-all duration-300 shadow-xl shadow-blue-900/40"
                    >
                        Register for the next event!
                    </Link>
                </div>
            </section>
        </main>
    );
}