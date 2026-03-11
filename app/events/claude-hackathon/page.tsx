"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const EVENT_ID = 5;

export default function ClaudeHackathonPage() {
    const { user, token, login } = useAuth();
    const [registrantCount, setRegistrantCount] = useState<number | null>(null);
    const [unregistering, setUnregistering] = useState(false);

    const isRegistered = user?.registeredEventIds?.includes(EVENT_ID);

    const handleUnregister = async () => {
        if (!user || !token) return;
        setUnregistering(true);
        try {
            const res = await fetch(`${API_BASE}/api/events/register`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: user.id, eventId: EVENT_ID }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            login(token, { ...user, registeredEventIds: data.registeredEventIds }, true);
            setRegistrantCount(c => (c !== null ? c - 1 : c));
        } catch (e) {
            console.error(e);
        } finally {
            setUnregistering(false);
        }
    };

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
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6">
                                Claude Builder Club × UVicHacks // Mar 2026
                            </p>

                            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl text-white italic uppercase">
                                Claude <span className="text-orange-500">Hackathon</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed font-light">
                                First place walks away with $1,500 in Anthropic API credits. What are you building?
                            </p>

                            {/* Status Tags */}
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Registration Open</span>
                                </div>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">March 21, 2026</span>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">Teams of 2–4</span>
                            </div>

                            {/* CTAs */}
                            <div className="mt-12 flex flex-wrap gap-6">
                                {isRegistered ? (
                                    <button
                                        onClick={handleUnregister}
                                        disabled={unregistering}
                                        className="group flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/30 px-10 py-4 hover:bg-red-500/10 hover:border-red-500/40 transition disabled:opacity-50"
                                    >
                                        <span className="text-orange-400 text-sm group-hover:hidden">✓</span>
                                        <span className="text-xs font-black uppercase tracking-widest text-orange-400 group-hover:hidden">
                                            {unregistering ? "Unregistering..." : "Registered"}
                                        </span>
                                        <span className="hidden group-hover:inline text-xs font-black uppercase tracking-widest text-red-400">
                                            {unregistering ? "Unregistering..." : "Unregister"}
                                        </span>
                                    </button>
                                ) : (
                                    <Link
                                        href="/join/claude-hackathon"
                                        className="bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-orange-500 active:scale-95"
                                    >
                                        Register Now
                                    </Link>
                                )}
                                <a
                                    href="#schedule"
                                    className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition border border-neutral-800 hover:border-neutral-700"
                                >
                                    See Schedule
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Registrant Count */}
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                            <div className="text-center lg:text-right p-8 bg-neutral-900/30 rounded-2xl border border-neutral-900/50 backdrop-blur-sm">
                                <span className="block text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums">
                                    {registrantCount !== null ? registrantCount : "--"}
                                </span>
                                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
                                    Registered
                                </p>
                                <div className="mt-4 w-full h-1 bg-neutral-800 overflow-hidden">
                                    <div
                                        className="h-full bg-orange-500 transition-all duration-1000"
                                        style={{ width: `${Math.min((registrantCount || 0) / 1.5, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                            About the <span className="text-orange-500">Event</span>
                        </h2>
                        <p className="mt-4 text-cool-steel-400 max-w-2xl leading-relaxed">
                            Anthropic's Claude Hackathon, hosted by the Claude Builder Club @ UVic in collaboration with UVicHacks,
                            is coming on March 21st. Teams of 2 to 4 will have a full day to build something that actually matters
                            using Claude. Five tracks to choose from. Your ideas, your execution, your shot at the top spot.
                            Track themes drop a few days before the event in our Discord — come ready to act on your ideas.
                        </p>
                        <p className="mt-4 text-cool-steel-500 max-w-2xl leading-relaxed text-sm">
                            This is not a classroom assignment. There are no guardrails. Just you, your team, Claude, and a problem
                            worth solving. Whether this is your tenth hackathon or your first, come build something you are
                            genuinely proud of.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: "🥇",
                                title: "$1,500 API Credits",
                                desc: "First place takes home $1,500 in Anthropic API credits — split however your team sees fit."
                            },
                            {
                                icon: "🎁",
                                title: "Claude Merch",
                                desc: "Second and third place each receive an exclusive Claude goodie bag with a cap, stickers, and pins."
                            },
                            {
                                icon: "🤖",
                                title: "Claude as Co-Pilot",
                                desc: "Build with Claude at the center of your stack. Five tracks, one day, unlimited upside."
                            }
                        ].map((item, i) => (
                            <div key={i} className="rounded-2xl bg-neutral-950 border border-neutral-800 p-8 hover:border-orange-500/50 transition-all group cursor-default">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                                <h3 className="text-lg font-bold text-white uppercase italic mb-3 tracking-tighter group-hover:text-orange-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule Section */}
            <section id="schedule" className="bg-neutral-950 py-24 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="text-center md:text-left mb-16">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-600 mb-2">The Plan</h2>
                        <h3 className="text-3xl font-bold italic uppercase tracking-tighter text-white">Event <span className="text-orange-500">Schedule</span></h3>
                    </div>

                    <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8 max-w-2xl">
                        <h4 className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-neutral-800">March 21, 2026</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">11:00</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Doors Open & Check-In</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Arrive, grab your name tag, meet other builders</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-orange-500 pt-1 w-14 shrink-0">11:30</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Welcome & Kickoff</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Opening remarks, judge intros, track reveal, rules & criteria</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-orange-500 pt-1 w-14 shrink-0">12:00</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Hacking Begins</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Lock in your track — Claude is your co-pilot</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">12:30</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Optional: Claude Code Tips</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Quick primer on getting the most out of Claude Code</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">15:30</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Pizza Break</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Step away, grab a slice, recharge</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-orange-500 pt-1 w-14 shrink-0">18:30</span>
                                <div>
                                    <p className="text-sm font-bold text-orange-400 uppercase italic">Submission Deadline</p>
                                    <p className="text-[10px] text-neutral-500 uppercase font-black">Hard deadline — no exceptions</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">18:30</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Judging Period</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Judges review, teams rest and prepare presentations</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">19:30</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Top 3 Presentations</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">Finalist teams present — 5 minutes each</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-xs font-mono text-orange-500 pt-1 w-14 shrink-0">20:00</span>
                                <div>
                                    <p className="text-sm font-bold text-white uppercase italic">Winners & Award Ceremony</p>
                                    <p className="text-[10px] text-neutral-500 uppercase">1st, 2nd, 3rd announced — closing remarks to follow</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Judging Criteria */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl uppercase italic tracking-tighter">
                    What We're Looking For
                </h2>
                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    Projects are judged on how well you use Claude, the quality of your build, and how clearly you can communicate
                    what you made and why it matters.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">30 pts</p>
                        <h3 className="text-lg font-semibold text-orange-400">
                            Technical Execution
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Does it work? Is it deployed and usable? Clean code and a live demo speak louder than a mockup.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">25 pts</p>
                        <h3 className="text-lg font-semibold text-orange-400">
                            Claude Integration
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            How creatively and effectively did you use Claude? Is Claude central to the experience or just bolted on?
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">25 pts</p>
                        <h3 className="text-lg font-semibold text-orange-400">
                            Impact & Idea
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Is there a real problem being solved? Would people actually use this? Originality counts.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">20 pts</p>
                        <h3 className="text-lg font-semibold text-orange-400">
                            Presentation
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Can you sell it? Five minutes to show the room what you built. Make every second count.
                        </p>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 border-t border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-white mb-4">
                        Ready to <span className="text-orange-500">Build?</span>
                    </h2>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto mb-10">
                        Registration is free. Spots are limited. Tracks drop in Discord before the event.
                    </p>
                    {isRegistered ? (
                        <button
                            onClick={handleUnregister}
                            disabled={unregistering}
                            className="group inline-flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/30 px-10 py-4 hover:bg-red-500/10 hover:border-red-500/40 transition disabled:opacity-50"
                        >
                            <span className="text-orange-400 group-hover:hidden">✓</span>
                            <span className="text-xs font-black uppercase tracking-widest text-orange-400 group-hover:hidden">
                                {unregistering ? "Unregistering..." : "You're Registered"}
                            </span>
                            <span className="hidden group-hover:inline text-xs font-black uppercase tracking-widest text-red-400">
                                {unregistering ? "Unregistering..." : "Unregister"}
                            </span>
                        </button>
                    ) : (
                        <Link
                            href="/join/claude-hackathon"
                            className="inline-block bg-white px-12 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-orange-500 active:scale-95"
                        >
                            Register Now
                        </Link>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-neutral-900 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                <p>Claude Builder Club × UVicHacks &bull; Claude Hackathon 2026</p>
            </footer>
        </main>
    );
}
