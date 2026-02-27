"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const EVENT_ID = 3;

export default function StartupHackathonPage() {
    const { user, token } = useAuth();
    const [registrantCount, setRegistrantCount] = useState<number | null>(null);
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);
    const [scoresVisible, setScoresVisible] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const isRegistered = user?.registeredEventIds?.includes(EVENT_ID);
    const isJudge = user?.role === "judge";

    useEffect(() => {
        fetch(`${API_BASE}/api/events/${EVENT_ID}/count`)
            .then(res => res.json())
            .then(data => setRegistrantCount(data.count))
            .catch(err => console.error(err));

        fetch(`${API_BASE}/api/admin/settings`)
            .then(res => res.json())
            .then(data => setScoresVisible(data.scoresVisible ?? false))
            .catch(console.error);

        fetch(`${API_BASE}/api/submissions/${EVENT_ID}/results`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setLeaderboard(data.filter(p => p.title && !p.title.toLowerCase().includes("test")).slice(0, 10));
                }
            })
            .catch(console.error)
            .finally(() => setLoadingLeaderboard(false));
    }, []);

    useEffect(() => {
        if (!token) return;
        fetch(`${API_BASE}/api/submissions/my-submission/${EVENT_ID}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => setHasSubmitted(!!data.submission))
            .catch(console.error);
    }, [token]);

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-neutral-950 py-24 md:py-32 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side */}
                        <div className="lg:col-span-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-6">
                                Main Event // Feb 2026
                            </p>

                            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl text-white italic uppercase">
                                Startup <span className="text-emerald-500">Hackathon</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed font-light">
                                48 hours to build something real. Come with an idea, leave with a project. Build whatever you want — then pitch it to a panel of judges.
                            </p>

                            {/* Status Tags */}
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-neutral-500"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Registration Closed</span>
                                </div>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic text-emerald-100/50">Feb 27 - 28</span>
                            </div>

                            {/* CTAs */}
                            <div className="mt-12 flex flex-wrap gap-4">
                                {isJudge ? (
                                    <Link href="/events/startup-hackathon/projects"
                                        className="bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-500 active:scale-95">
                                        Grade Projects
                                    </Link>
                                ) : isRegistered ? (
                                    <>
                                        <div className="flex items-center gap-2.5 px-8 py-4 bg-emerald-500/10 border border-emerald-500/30 rounded-sm">
                                            <span className="text-emerald-400 text-sm">✓</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Registered</span>
                                        </div>
                                        {hasSubmitted ? (
                                            <Link href="/events/startup-hackathon/projects"
                                                className="bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-500 active:scale-95">
                                                View Projects
                                            </Link>
                                        ) : (
                                            <Link href="/events/startup-hackathon/submit"
                                                className="bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-500 active:scale-95">
                                                Submit Project
                                            </Link>
                                        )}
                                    </>
                                ) : (
                                    <div className="px-8 py-4 border border-neutral-700 rounded-sm">
                                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Registration Closed</span>
                                    </div>
                                )}
                                <Link
                                    href="#schedule"
                                    className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition border border-neutral-800 hover:border-neutral-700"
                                >
                                    See Schedule
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Registrant Count */}
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                            <div className="text-center lg:text-right p-8 bg-neutral-900/30 rounded-2xl border border-neutral-900/50 backdrop-blur-sm">
                                <span className="block text-6xl md:text-7xl font-black tracking-tighter text-white tabular-nums">
                                    {registrantCount !== null ? registrantCount : "--"}
                                </span>
                                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">
                                    Registrations
                                </p>
                                <div className="mt-4 w-full h-1 bg-neutral-800 overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 transition-all duration-1000"
                                        style={{ width: `${Math.min((registrantCount || 0) / 1.5, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Leaderboard Section — only shown when scores are revealed */}
            {(scoresVisible || isJudge) && (
                <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                    <div className="mx-auto max-w-6xl px-4 md:px-6">
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                                Top 10 <span className="text-emerald-500">Standings</span>
                            </h2>
                            <p className="mt-2 text-cool-steel-400">The highest rated builds based on peer and judge evaluations.</p>
                        </div>

                        {loadingLeaderboard ? (
                            <div className="py-10 text-center text-xs uppercase tracking-widest text-neutral-600 animate-pulse">Calculating Standings...</div>
                        ) : leaderboard.length === 0 ? (
                            <div className="py-10 text-center text-sm text-cool-steel-500">No scored projects yet.</div>
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
                                            href={`/events/startup-hackathon/projects/${item.id}`}
                                            className="grid grid-cols-12 px-6 py-4 items-center hover:bg-neutral-800/30 transition-colors group"
                                        >
                                            <div className="col-span-1 font-mono text-sm text-neutral-500">
                                                {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : index + 1 === 3 ? "🥉" : `#${index + 1}`}
                                            </div>
                                            <div className="col-span-7">
                                                <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{item.title}</p>
                                                <p className="text-[10px] text-neutral-500 uppercase">{item.submitter}</p>
                                            </div>
                                            <div className="col-span-2 text-right font-mono text-xs text-neutral-400">
                                                {item.review_count}
                                            </div>
                                            <div className="col-span-2 text-right font-bold text-emerald-400">
                                                {item.total_avg != null ? Number(item.total_avg * 2).toFixed(1) : "—"}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* What to Build Section */}
            <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                            Build <span className="text-emerald-500">Anything</span>
                        </h2>
                        <p className="mt-2 text-cool-steel-400 max-w-xl">
                            There's no theme. Build whatever you want — a web app, a game, a tool, a hardware project. The only rule is that it has to be something you made this weekend.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: "🛠",
                                title: "A useful tool",
                                desc: "Scratch your own itch. Build something that solves a problem you actually have."
                            },
                            {
                                icon: "🤖",
                                title: "Something with AI",
                                desc: "Use a model, build an agent, make something that feels a little like magic."
                            },
                            {
                                icon: "🎮",
                                title: "A game or experience",
                                desc: "Fun counts. Make something people want to play with."
                            }
                        ].map((idea, i) => (
                            <div key={i} className="rounded-2xl bg-neutral-950 border border-neutral-800 p-8 hover:border-emerald-500/50 transition-all group cursor-default">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{idea.icon}</div>
                                <h3 className="text-lg font-bold text-white uppercase italic mb-3 tracking-tighter group-hover:text-emerald-400 transition-colors">
                                    {idea.title}
                                </h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">
                                    {idea.desc}
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
                        <h3 className="text-3xl font-bold italic uppercase tracking-tighter text-white">Event <span className="text-emerald-500">Schedule</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Friday */}
                        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
                            <h4 className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-neutral-800">Day 01 // Feb 27</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">17:30</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Check-in</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Arrive, meet people</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-emerald-500 pt-1">18:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Deployment Workshop</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Fullstack deployments, start to finish</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">19:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Hacking Begins</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Build through the night</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Saturday */}
                        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
                            <h4 className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-neutral-800">Day 02 // Feb 28</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">12:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Regroup</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Back to campus, final push</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-emerald-500 pt-1">15:30</span>
                                    <div>
                                        <p className="text-sm font-bold text-emerald-500 uppercase italic">Submissions Close</p>
                                        <p className="text-[10px] text-neutral-500 uppercase font-black">Hard deadline</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1">16:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Presentations & Pizza</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Show what you built</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-emerald-500 pt-1">18:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Closing & Prizes</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Winners announced</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* What we're judging on */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl uppercase italic tracking-tighter">
                    What We're Looking For
                </h2>
                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    Projects are scored by judges and fellow participants. You don't need to build a company — just build something you're proud of and can explain clearly.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-emerald-400">
                            Did it work?
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Does it do the thing it's supposed to do? A working demo beats a polished deck.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-emerald-400">
                            Is it interesting?
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            Does it solve a real problem, or is it just fun? Either is fine.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-emerald-400">
                            Can you explain it?
                        </h3>
                        <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">
                            You'll get a few minutes to show it off. Tell us what it does and why you built it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-neutral-900 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                <p>UVic Hacks &bull; Startup Hackathon 2026</p>
            </footer>
        </main>
    );
}
