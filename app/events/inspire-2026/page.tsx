"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InspireHackathonPage() {
    const [registrantCount, setRegistrantCount] = useState<number | null>(null);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

    const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
    const API_BASE = isLocal ? "http://localhost:3002" : "https://strudel-hackathon.onrender.com";

    useEffect(() => {
        // Fetch Registrant Count
        fetch(`${API_BASE}/api/events/1/count`)
            .then(res => res.json())
            .then(data => setRegistrantCount(data.count))
            .catch(err => console.error(err));

        // Fetch Top 10 Results
        fetch(`${API_BASE}/api/submissions/1/results`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filtered = data
                        .filter(project =>
                            // Exclude if "test" is anywhere in the title
                            !project.title.toLowerCase().includes("test")
                        )
                        .slice(0, 10); // Then take the top 10 real projects

                    setLeaderboard(filtered);
                } else {
                    setLeaderboard([]);
                }
                setLoadingLeaderboard(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingLeaderboard(false);
            });
    }, [API_BASE]);

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="bg-neutral-950 py-24 md:py-32 border-y border-neutral-900">
                <div className="mx-auto max-w-6xl px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side: Content */}
                        <div className="lg:col-span-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-6">
                                Completed Event • Jan 2026
                            </p>

                            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl text-white">
                                Inspire <span className="text-blue-500">Hackathon</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed">
                                The high-intensity build sprint for social impact has concluded.
                                Browse the solutions built by UVic developers.
                            </p>

                            {/* Status Tags */}
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-neutral-600"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Event Concluded</span>
                                </div>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">Archived: Jan 31, 2026</span>
                            </div>

                            {/* CTAs */}
                            <div className="mt-12 flex flex-wrap gap-6">
                                <Link
                                    href="/events/inspire-2026/projects"
                                    className="relative group overflow-hidden bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-gold-500 active:scale-95"
                                >
                                    View Projects
                                </Link>
                                <Link
                                    href="/events/inspire-2026/prompts"
                                    className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition border border-neutral-800 hover:border-neutral-700"
                                >
                                    View Prompts
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Final Stats */}
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                            <div className="text-center lg:text-right p-8 bg-neutral-900/30 rounded-2xl border border-neutral-900/50 backdrop-blur-sm">
                                <span className="block text-6xl md:text-7xl font-black tracking-tighter text-white">
                                    {registrantCount !== null ? registrantCount : "--"}
                                </span>
                                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
                                    Total Participants
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Leaderboard Section */}
            <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                            Top 10 <span className="text-gold-500">Standings</span>
                        </h2>
                        <p className="mt-2 text-cool-steel-400">The highest rated builds based on peer and judge evaluations.</p>
                    </div>

                    {loadingLeaderboard ? (
                        <div className="py-10 text-center text-xs uppercase tracking-widest text-neutral-600 animate-pulse">Calculating Standings...</div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50">
                            <div className="grid grid-cols-12 bg-neutral-800/50 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                <div className="col-span-1">Rank</div>
                                <div className="col-span-7">Project</div>
                                <div className="col-span-2 text-right">Reviews</div>
                                <div className="col-span-2 text-right">Avg Score / 100</div>
                            </div>
                            <div className="divide-y divide-neutral-800">
                                {leaderboard.map((item, index) => (
                                    <Link
                                        key={item.id}
                                        href={`/events/inspire-2026/projects/${item.id}`}
                                        className="grid grid-cols-12 px-6 py-4 items-center hover:bg-neutral-800/30 transition-colors group"
                                    >
                                        <div className="col-span-1 font-mono text-sm text-neutral-500">
                                            {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : index + 1 === 3 ? "🥉" : `#${index + 1}`}
                                        </div>
                                        <div className="col-span-7">
                                            <p className="font-bold text-white group-hover:text-gold-500 transition-colors">{item.title}</p>
                                            <p className="text-[10px] text-neutral-500 uppercase">{item.submitter}</p>
                                        </div>
                                        <div className="col-span-2 text-right font-mono text-xs text-neutral-400">
                                            {item.review_count}
                                        </div>
                                        <div className="col-span-2 text-right font-bold text-gold-500">
                                            {Number(item.total_avg * 2).toFixed(1)}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Overview Section */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Impact Summary
                </h2>
                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    The Inspire Hackathon brought together students to
                    solve pressing social challenges. Over the course of 24 hours, these teams turned ideas into functional prototypes.
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-blue-400">
                            Civic Engagement
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Teams addressed challenges ranging from food security to neurodivergent education accessibility.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-blue-400">
                            Code Quality
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            A focus on TypeScript, Next.js, and Python FastAPI led to high-fidelity, deployable solutions.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-blue-400">
                            Community Spirit
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Collaborative mentorship helped bridge the gap between ideation and technical execution.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-neutral-900 text-center text-xs text-cool-steel-500">
                <p>UVic Hacks &bull; Inspire Hackathon 2026 Archive</p>
            </footer>
        </main>
    );
}