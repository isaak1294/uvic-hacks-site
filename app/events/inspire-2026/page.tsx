import Image from "next/image";

export default function InspireHackathonPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="bg-neutral-900/90 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        Upcoming Event • UVic Hacks x Inspire UVic
                    </p>

                    <h1 className="mt-4 text-4xl font-display font-bold tracking-tight md:text-6xl">
                        Inspire{" "}
                        <span className="text-goldenrod-400">Hackathon</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        A two-day build sprint dedicated to software solutions for social
                        impact. Team up to create tools that make a difference.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-cool-steel-200">
                        <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-baltic-blue-300 border border-baltic-blue-500/30">
                            TBD
                        </span>
                        <span className="rounded-full bg-cool-steel-800/50 px-3 py-1 text-cool-steel-200">
                            Jan 30-31, 2026
                        </span>
                        <span className="rounded-full bg-cool-steel-800/50 px-3 py-1 text-cool-steel-200">
                            2-Day Build Sprint
                        </span>
                        <span className="rounded-full bg-gold-950/20 px-3 py-1 text-gold-500 border border-gold-900/30">
                            Registration Open Soon
                        </span>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="/events/inspire-2026"
                            className="rounded-full bg-baltic-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            Register Now
                        </a>
                        <a
                            href="#schedule"
                            className="rounded-full bg-neutral-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
                        >
                            View Schedule
                        </a>
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