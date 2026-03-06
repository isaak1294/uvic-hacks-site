"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const EVENT_ID = 4;

export default function StudyToolPitchPage() {
    const { user } = useAuth();
    const [registrantCount, setRegistrantCount] = useState<number | null>(null);

    const isRegistered = user?.registeredEventIds?.includes(EVENT_ID);

    useEffect(() => {
        fetch(`${API_BASE}/api/events/${EVENT_ID}/count`)
            .then(res => res.json())
            .then(data => setRegistrantCount(data.count))
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Navbar />

            {/* Hero */}
            <section className="bg-neutral-950 py-24 md:py-32 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side */}
                        <div className="lg:col-span-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">
                                Pitch Competition // Mar 2026
                            </p>

                            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl text-white">
                                Study Tool <span className="text-blue-500">Pitch</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed">
                                Do you have an idea to improve UVic's tools? Pitch it. No code required.
                                Just a problem worth solving and a clear vision for the solution.
                            </p>

                            {/* Status Tags */}
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Registration Open</span>
                                </div>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">March 20, 2026 // 6:00 PM</span>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">Beginner Friendly</span>
                            </div>

                            {/* CTAs */}
                            <div className="mt-12 flex flex-wrap gap-6">
                                {isRegistered ? (
                                    <div className="flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/30 px-10 py-4">
                                        <span className="text-blue-400 text-sm">✓</span>
                                        <span className="text-xs font-black uppercase tracking-widest text-blue-400">Registered</span>
                                    </div>
                                ) : (
                                    <Link
                                        href="/join/study-tool-pitch"
                                        className="relative group overflow-hidden bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-gold-500 active:scale-95"
                                    >
                                        Register Now
                                    </Link>
                                )}
                                <a
                                    href="#format"
                                    className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition border border-neutral-800 hover:border-neutral-700"
                                >
                                    See Format
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Registrant Count */}
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                            <div className="text-center lg:text-right p-8 bg-neutral-900/30 rounded-2xl border border-neutral-900/50 backdrop-blur-sm">
                                <span className="block text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums">
                                    {registrantCount !== null ? registrantCount : "--"}
                                </span>
                                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                                    Registered
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* What to Pitch */}
            <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                            What to <span className="text-blue-500">Build</span>
                        </h2>
                        <p className="mt-2 text-cool-steel-400 max-w-xl">
                            Your pitch should describe a study tool; something that helps students learn,
                            organize, focus, or retain information better. Think big or keep it simple.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: "🧠",
                                title: "Learning Tools",
                                desc: "Flashcard apps, spaced repetition systems, AI tutors, quiz generators — anything that helps knowledge stick."
                            },
                            {
                                icon: "📅",
                                title: "Organization Tools",
                                desc: "Study planners, deadline trackers, focus timers, note-taking systems. Help students stay on top of their workload."
                            },
                            {
                                icon: "🤝",
                                title: "Collaboration Tools",
                                desc: "Group study platforms, peer explanation tools, shared note-taking. Learning is better together."
                            }
                        ].map((idea, i) => (
                            <div key={i} className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800 hover:border-blue-500/40 transition-all group cursor-default">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{idea.icon}</div>
                                <h3 className="text-lg font-semibold text-blue-400 mb-3">
                                    {idea.title}
                                </h3>
                                <p className="text-sm text-cool-steel-200 leading-relaxed">
                                    {idea.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Format Section */}
            <section id="format" className="bg-neutral-950 py-24 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="text-center md:text-left mb-16">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-600 mb-2">How it Works</h2>
                        <h3 className="text-3xl font-bold italic uppercase tracking-tighter text-white">Event <span className="text-blue-500">Format</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
                            <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-neutral-800">Noon // March 14</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">11:30</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Doors Open</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Arrive, grab a seat, meet your fellow competitors</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-blue-500 pt-1">12:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Brief & Format Rundown</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Rules, judging criteria, and tips for a great pitch</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">12:15</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Pitch Prep Time</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Last 30 minutes to finalize your slides or notes</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-blue-500 pt-1">17:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Submission Deadline</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Finalize your slides or notes</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">17:15</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Pitching Begins</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">5 min pitch + 3 min judge Q&A per team</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">18:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Awards & Wrap-Up</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Winners announced, prizes distributed</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Judging Criteria */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl uppercase italic tracking-tighter">
                    What We're Looking For
                </h2>
                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    You don't need a prototype. You need a clear problem, a thoughtful solution, and a confident delivery.
                    Judges are evaluating your thinking, not your code.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">30 pts</p>
                        <h3 className="text-lg font-semibold text-blue-400">
                            Problem Clarity
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Is the problem real and well-defined? Do you clearly understand the pain point you're solving?
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">30 pts</p>
                        <h3 className="text-lg font-semibold text-blue-400">
                            Solution Quality
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Is the proposed solution creative, practical, and feasible? Bonus points for a mockup or demo.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">20 pts</p>
                        <h3 className="text-lg font-semibold text-blue-400">
                            Presentation
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Is your pitch clear, confident, and well-structured? Can you answer follow-up questions?
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">20 pts</p>
                        <h3 className="text-lg font-semibold text-blue-400">
                            Impact
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Would this actually help students? Is the market real and large enough to matter?
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-neutral-900/20 border-t border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic mb-10">
                        FAQ
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            {
                                q: "Do I need to know how to code?",
                                a: "Absolutely not. This is a pitch competition, not a hackathon. Slides, a Figma mockup, or even a paper sketch are all valid ways to present your idea."
                            },
                            {
                                q: "Can I participate solo?",
                                a: "Yes! You can pitch as an individual or as a team of up to 4. Solo pitches are welcome and judged on the same criteria."
                            },
                            {
                                q: "How polished does my pitch need to be?",
                                a: "Judges want to see that you understand the problem and have thought through a solution. A clear, confident 5-minute pitch is all you need."
                            },
                            {
                                q: "Why does this look good on a resume?",
                                a: "Pitching in front of an audience and a panel of judges demonstrates communication, critical thinking, and entrepreneurial skills — all highly valued by employers."
                            },
                            {
                                q: "What should I bring?",
                                a: "Your idea and a way to present it — slides on your laptop, a printout, or just talking points. There will be a projector available."
                            },
                            {
                                q: "Is this only for CS students?",
                                a: "Not at all. Business students, designers, educators — anyone with a fresh perspective on how students learn is encouraged to pitch."
                            }
                        ].map(({ q, a }, i) => (
                            <div key={i} className="rounded-lg bg-neutral-900/70 p-6 border border-neutral-800">
                                <p className="text-sm font-bold text-white mb-2">{q}</p>
                                <p className="text-sm text-cool-steel-300 leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-white mb-4">
                        Ready to <span className="text-blue-500">Pitch?</span>
                    </h2>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto mb-10">
                        Registration is free. Spots are limited. If you have an idea — even a rough one — sign up.
                    </p>
                    {isRegistered ? (
                        <div className="inline-flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/30 px-10 py-4">
                            <span className="text-blue-400">✓</span>
                            <span className="text-xs font-black uppercase tracking-widest text-blue-400">You're Registered</span>
                        </div>
                    ) : (
                        <Link
                            href="/join/study-tool-pitch"
                            className="inline-block bg-white px-12 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-gold-500 active:scale-95"
                        >
                            Register Now
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-neutral-900 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                <p>UVic Hacks &bull; Study Tool Pitch Competition 2026</p>
            </footer>
        </main>
    );
}
