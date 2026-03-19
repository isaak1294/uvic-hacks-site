"use client"

import Link from "next/link";
import Navbar from "@/app/components/NavBar";

const REGISTER_URL = "https://forms.gle/7785jcZShuUmyxuXA";

export default function HealthcareHackathonPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Navbar />

            {/* Hero */}
            <section className="bg-neutral-950 py-24 md:py-32 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left */}
                        <div className="lg:col-span-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-6">
                                UVic Hacks // Mar 2026
                            </p>

                            <h1 className="text-5xl font-bold tracking-tighter md:text-7xl text-white italic uppercase">
                                Healthcare <span className="text-teal-500">Hackathon</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-lg text-neutral-400 leading-relaxed font-light">
                                Two days to build something that matters in healthcare. Real problems, real people, real impact. Open to all disciplines — you don't need to be in CS to change medicine.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">Registration Open</span>
                                </div>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">Mar 27–28, 2026</span>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">ECS First Floor</span>
                                <span className="h-4 w-[1px] bg-neutral-800 hidden md:block"></span>
                                <span className="text-xs font-medium text-neutral-500 uppercase tracking-tight italic">Teams of 2–4</span>
                            </div>

                            <div className="mt-12 flex flex-wrap gap-4">
                                <a
                                    href={REGISTER_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-teal-400 active:scale-95"
                                >
                                    Register Now
                                </a>
                                <a
                                    href="#schedule"
                                    className="px-10 py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition border border-neutral-800 hover:border-neutral-700"
                                >
                                    See Schedule
                                </a>
                            </div>
                        </div>

                        {/* Right — date card */}
                        <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                            <div className="text-center lg:text-right p-8 bg-neutral-900/30 rounded-2xl border border-neutral-900/50 backdrop-blur-sm w-full">
                                <span className="block text-5xl font-black tracking-tighter text-white">Mar 27</span>
                                <span className="block text-5xl font-black tracking-tighter text-teal-500">– 28</span>
                                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">
                                    ECS First Floor
                                </p>
                                <div className="mt-4 w-full h-[1px] bg-neutral-800"></div>
                                <p className="mt-3 text-[10px] text-neutral-600 uppercase tracking-widest">48 Hours to Build</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* About */}
            <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="mb-12 text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase italic">
                            About the <span className="text-teal-500">Event</span>
                        </h2>
                        <p className="mt-4 text-cool-steel-400 max-w-2xl leading-relaxed">
                            The Healthcare Hackathon brings together students from computer science, nursing, health information science, biology, and beyond to tackle real challenges in modern medicine. Whether you're building a patient-facing tool, a clinical workflow improvement, or a data pipeline for better diagnostics — if it helps people get better care, it belongs here.
                        </p>
                        <p className="mt-4 text-cool-steel-500 max-w-2xl leading-relaxed text-sm">
                            You don't need to have all the answers on day one. You need a team, a problem worth solving, and the drive to ship something real in 48 hours.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: "🏥",
                                title: "Real Problems",
                                desc: "Work on challenges sourced from healthcare professionals and patients — not textbook exercises."
                            },
                            {
                                icon: "🤝",
                                title: "All Disciplines Welcome",
                                desc: "The best health-tech teams are interdisciplinary. CS students, nurses, pre-med, designers — all are encouraged to apply."
                            },
                            {
                                icon: "🎖️",
                                title: "Prizes & Recognition",
                                desc: "Top teams walk away with prizes and the chance to present their work to healthcare industry contacts."
                            },
                        ].map((item, i) => (
                            <div key={i} className="rounded-2xl bg-neutral-950 border border-neutral-800 p-8 hover:border-teal-500/50 transition-all group cursor-default">
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                                <h3 className="text-lg font-bold text-white uppercase italic mb-3 tracking-tighter group-hover:text-teal-400 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section id="schedule" className="bg-neutral-950 py-24 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="text-center md:text-left mb-16">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-600 mb-2">The Plan</h2>
                        <h3 className="text-3xl font-bold italic uppercase tracking-tighter text-white">Event <span className="text-teal-500">Schedule</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Day 1 */}
                        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
                            <h4 className="text-teal-500 text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-neutral-800">Day 01 // Mar 27</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">17:30</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Doors Open & Check-In</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Arrive, get settled</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-teal-500 pt-1 w-14 shrink-0">18:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Opening Ceremony</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Welcome remarks, sponsor intros, challenge themes</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-teal-500 pt-1 w-14 shrink-0">18:30</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Hacking Begins</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Lock in your team and problem</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Day 2 */}
                        <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
                            <h4 className="text-teal-500 text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-neutral-800">Day 02 // Mar 28</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">10:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Morning Regroup</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Back to ECS — final push begins</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">12:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Lunch</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Step away, eat, recharge</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-teal-500 pt-1 w-14 shrink-0">15:30</span>
                                    <div>
                                        <p className="text-sm font-bold text-teal-400 uppercase italic">Submissions Close</p>
                                        <p className="text-[10px] text-neutral-500 uppercase font-black">Hard deadline — no exceptions</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-neutral-500 pt-1 w-14 shrink-0">16:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Presentations & Judging</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Teams present — judges visit tables</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-xs font-mono text-teal-500 pt-1 w-14 shrink-0">18:00</span>
                                    <div>
                                        <p className="text-sm font-bold text-white uppercase italic">Closing & Awards</p>
                                        <p className="text-[10px] text-neutral-500 uppercase">Winners announced — closing remarks</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Judging Criteria */}
            <section className="bg-neutral-900/20 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl uppercase italic tracking-tighter">
                        What We're Looking For
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                        Projects are judged on clinical relevance, technical execution, feasibility, and how clearly you can communicate the problem and your solution.
                    </p>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                pts: "30 pts",
                                title: "Clinical Relevance",
                                desc: "Does it address a real, meaningful healthcare problem? Is the target population clearly defined and would they actually benefit?"
                            },
                            {
                                pts: "25 pts",
                                title: "Technical Execution",
                                desc: "Does it work? Is it well-built and demonstrable? A live demo speaks louder than a slide deck."
                            },
                            {
                                pts: "25 pts",
                                title: "Feasibility & Safety",
                                desc: "Could this realistically be deployed in a healthcare setting? Did your team consider risks, privacy, and patient safety?"
                            },
                            {
                                pts: "20 pts",
                                title: "Presentation",
                                desc: "Can you clearly explain the problem, your solution, and what's next? Judges will visit your table — every conversation counts."
                            },
                        ].map(({ pts, title, desc }) => (
                            <div key={title} className="rounded-lg bg-neutral-900/40 p-6 border border-neutral-800">
                                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">{pts}</p>
                                <h3 className="text-lg font-semibold text-teal-400">{title}</h3>
                                <p className="mt-2 text-xs text-cool-steel-300 leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sponsors */}
            <section className="bg-neutral-950 border-b border-neutral-900 py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-xs font-black uppercase tracking-[0.5em] text-neutral-600 mb-2">Made Possible By</h2>
                        <h3 className="text-3xl font-bold italic uppercase tracking-tighter text-white">Our <span className="text-teal-500">Sponsors</span></h3>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-6">
                        {/* Red Bull Basement */}
                        <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 px-12 py-8 hover:border-teal-500/40 transition w-56">
                            <img src="/images/logos/red-bull-basement-logo.avif" alt="Red Bull Basement" className="h-14 w-auto object-contain" />
                        </div>

                        {/* Trelent */}
                        <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/40 px-12 py-8 hover:border-teal-500/40 transition w-56">
                            <img src="/images/logos/Trelent.png" alt="Trelent" className="h-14 w-auto object-contain" />
                        </div>
                    </div>

                    <p className="text-center mt-10 text-xs text-neutral-600">
                        Interested in sponsoring?{" "}
                        <a href="mailto:uvichacks@gmail.com" className="text-teal-500 hover:underline">
                            Get in touch
                        </a>
                    </p>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 border-b border-neutral-900">
                <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-white mb-4">
                        Ready to <span className="text-teal-500">Build?</span>
                    </h2>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto mb-10">
                        Registration is free. Spots are limited. Open to all UVic students regardless of background.
                    </p>
                    <a
                        href={REGISTER_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-white px-12 py-4 text-xs font-black uppercase tracking-widest text-black transition hover:bg-teal-400 active:scale-95"
                    >
                        Register Now
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 border-t border-neutral-900 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                <p>UVic Hacks &bull; Healthcare Hackathon 2026</p>
            </footer>
        </main>
    );
}
