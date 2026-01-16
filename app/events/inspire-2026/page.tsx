"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InspireHackathonPage() {

    const [registrantCount, setRegistrantCount] = useState<number | null>(null);

    useEffect(() => {
        const isLocal =
            typeof window !== "undefined" &&
            window.location.hostname === "localhost";

        const API_BASE = isLocal
            ? "http://localhost:3002"
            : "https://strudel-hackathon.onrender.com";

        fetch(`${API_BASE}/api/events/1/count`)
            .then(res => res.json())
            .then(data => setRegistrantCount(data.count))
            .catch(err => console.error(err));
    }, []);

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="bg-neutral-950 py-24 md:py-32 border-y border-neutral-900">
                <div className="mx-auto max-w-6xl px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Side: Content */}
                        <div className="lg:col-span-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-6">
                                Featured Event • Jan 2026
                            </p>

                            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl text-white">
                                Inspire <span className="text-blue-500">Hackathon</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed">
                                A high-intensity build sprint focused on social impact.
                                Join developers at UVic to build the future of civic tech.
                            </p>

                            {/* Status Tags */}
                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Registration Open</span>
                                </div>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight">Jan 30 - 31</span>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight">Victoria, BC</span>
                            </div>

                            {/* CTAs */}
                            <div className="mt-12 flex flex-wrap gap-6">
                                <Link
                                    href="/join/inspire-2026"
                                    className="relative group overflow-hidden bg-blue-600 px-10 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-blue-500 active:scale-95"
                                >
                                    Register Now
                                </Link>
                                <a
                                    href="#schedule"
                                    className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition border border-neutral-800 hover:border-neutral-700"
                                >
                                    View Schedule
                                </a>
                            </div>
                        </div>

                        {/* Right Side: Registrant Counter */}
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                            <div className="text-center lg:text-right p-8 bg-neutral-900/30 rounded-2xl border border-neutral-900/50 backdrop-blur-sm">
                                <span className="block text-6xl md:text-7xl font-black tracking-tighter text-white">
                                    {registrantCount !== null ? registrantCount : "0"}
                                </span>
                                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.4em] text-gold-500">
                                    registrations
                                </p>
                                <div className="mt-4 w-full h-1 bg-neutral-800 overflow-hidden">
                                    <div
                                        className="h-full bg-gold-500 transition-all duration-1000"
                                        style={{ width: `${Math.min((registrantCount || 0) / 2, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Mentors Section */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                            Meet the Judges
                        </h2>
                        <p className="mt-2 text-cool-steel-300">
                            Get 1-on-1 help from industry pros who know what gets a site noticed.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            name: "TBA",
                            role: "...",
                            expert: "...",
                            img: "/images/partners/image.png"
                        },
                        {
                            name: "TBA",
                            role: "...",
                            expert: "...",
                            img: "/images/partners/image.png"
                        },
                        {
                            name: "TBA",
                            role: "...",
                            expert: "...",
                            img: "/images/partners/image.png"
                        },

                    ].map((mentor) => (
                        <div key={mentor.name} className="flex items-center gap-4 rounded-2xl bg-neutral-900/40 p-5 border border-neutral-800/50">
                            <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center text-baltic-blue-300 font-bold border border-neutral-700">
                                <Image
                                    src={mentor.img}
                                    alt={mentor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-cool-steel-50">{mentor.name}</h3>
                                <p className="text-xs text-baltic-blue-400">{mentor.role}</p>
                                <p className="mt-1 text-xs text-cool-steel-400 leading-relaxed">
                                    Ask about: <span className="text-cool-steel-200">{mentor.expert}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Build for Social Impact
                </h2>

                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    The Inspire Hackathon brings together students from all disciplines to
                    solve pressing social challenges. Whether it's accessibility,
                    environmental sustainability, or community health, we’re providing
                    the space and mentorship to turn your ideas into functional prototypes.
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Real-World Problems
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Work on prompts provided by local non-profits and campus
                            groups to ensure your hack has an immediate impact.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Collaborative Mentoring
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Industry experts and senior students will be on-site to help with
                            everything from backend logic to impact assessment.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Inclusive Environment
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We value diverse perspectives. You don't need to be a CS major
                            to help design a solution that changes lives.
                        </p>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section id="schedule" className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Hackathon Schedule
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Day 1 - Intro: Friday, Jan 30
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-cool-steel-200">
                            <li>5:00 PM: Check-in & Networking</li>
                            <li>5:30 PM: Opening Ceremony + Inspire Prompts</li>
                            <li>6:00 PM: Team Formation & Ideation</li>
                            <li>6:30 PM: Hacking Commences</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Day 2 - Grind: Saturday, Jan 31
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-cool-steel-200">
                            <li>9:00 AM: Breakfast & Morning Standup</li>
                            <li>12:00 PM: Pizza Lunch</li>
                            <li>3:00 PM: Code Freeze & Slide Submissions</li>
                            <li>4:00 PM: Project Expo & Social Impact Pitch</li>
                            <li>6:00 PM: Awards Ceremony</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* What to Bring */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    The Essentials
                </h2>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Hardware & Gear
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>Laptop and chargers</li>
                            <li>Reusable water bottle</li>
                            <li>A positive, collaborative mindset</li>
                            <li>Optional: External monitor or keyboard</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            The Teams
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Build in teams of 2–4. No team? No problem. We have a
                            dedicated team-matching session right after the opening ceremony
                            to help you find partners with complementary skills.
                        </p>
                    </div>
                </div>
            </section>

            {/* Judging Criteria */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 border-t border-neutral-900">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Impact Criteria
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    {[
                        { title: "Social Utility", desc: "Potential to improve lives." },
                        { title: "Execution", desc: "How functional is the build?" },
                        { title: "User Experience", desc: "Ease of use and accessibility." },
                        { title: "Innovation", desc: "Creative use of technology." }
                    ].map((item, i) => (
                        <div key={i} className="rounded-xl bg-neutral-900/70 p-5 shadow-sm border border-neutral-800">
                            <p className="text-sm font-semibold text-cool-steel-50">{item.title}</p>
                            <p className="mt-2 text-xs text-cool-steel-300">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Common Questions
                </h2>

                <div className="mt-6 space-y-6 text-sm text-cool-steel-200">
                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            What if I can't code?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            Impact projects need designers, researchers, and project
                            managers just as much as developers. Your skills are needed!
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Is this an overnight event?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            No. We wrap up Day 1 in the evening and resume on Friday morning
                            to ensure everyone stays rested and productive.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-neutral-900 text-center text-xs text-cool-steel-500">
                <p>UVic Hacks &bull; Inspire Hackathon 2026 &bull; TBD</p>
            </footer>
        </main>
    );
}