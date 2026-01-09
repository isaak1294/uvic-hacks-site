import Image from 'next/image';

export default function PortfolioSprintPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="bg-neutral-900/90 py-14 md:py-20 border-b border-neutral-800/50">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        Workshop Series • UVic Hacks
                    </p>

                    <h1 className="mt-4 text-4xl font-display font-bold tracking-tight md:text-6xl">
                        Portfolio <span className="text-goldenrod-400">Sprint</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        Stop procrastinating on your personal site. Build, deploy, and get
                        expert recruiter feedback in one intensive 6-hour session.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-cool-steel-200">
                        <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-baltic-blue-300">
                            TBD
                        </span>
                        <span className="rounded-full bg-cool-steel-800/50 px-3 py-1 text-cool-steel-200">
                            Feb 7, 2026
                        </span>
                        <span className="rounded-full bg-cool-steel-800/50 px-3 py-1 text-cool-steel-200">
                            6-Hour Intensive
                        </span>
                        <span className="rounded-full bg-baltic-blue-600/20 px-3 py-1 text-baltic-blue-400 border border-baltic-blue-500/30">
                            Registration Open Soon
                        </span>
                    </div>
                    {/*
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="/register"
                            className="rounded-full bg-baltic-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            Save my spot
                        </a>
                    </div>
                    */}
                </div>
            </section>


            {/* Mentors Section */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                            Meet the Mentors
                        </h2>
                        <p className="mt-2 text-cool-steel-300">
                            Get 1-on-1 help from industry pros who know what gets a site noticed.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            name: "Jacob Ketcheson",
                            role: "Design Systems Tech Lead // Dropbox",
                            expert: "UX and Design Systems",
                            img: "/images/partners/jacob-ketcheson.png"
                        },
                        {
                            name: "Josh",
                            role: "Staff Engineer // Ocado",
                            expert: "Frontend UI",
                            img: "/images/partners/josh.png"
                        },
                        {
                            name: "Jem Bezooyen",
                            role: "Indie Full-Stack Design Engineer",
                            expert: "Full-Stack Design",
                            img: "/images/partners/jam.png"
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
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16 border-t border-neutral-900">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Why the Portfolio Sprint?
                </h2>

                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200 leading-relaxed">
                    Most students have the projects, but struggle to present them. In this workshop,
                    we move beyond the code. We focus on **narrative**, **performance**, and **impact**.
                    By the end of the 6 hours, you will have a live URL to put on your LinkedIn.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border-l-2 border-baltic-blue-500">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Recruiter Insights
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Learn exactly which sections recruiters scroll to first.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border-l-2 border-goldenrod-400">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Active Assistance
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Stuck on a CSS bug or a deployment error? Mentors will be walking the floor all day.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border-l-2 border-baltic-blue-500">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Ready to Ship
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We'll show you how to create and deploy a sleek website from scratch.
                        </p>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14 bg-neutral-900/30 rounded-3xl">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    The 6-Hour Roadmap
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-1">
                    <div className="rounded-2xl bg-neutral-900/70 p-8 shadow-sm shadow-black/40">
                        <div className="grid gap-8 md:grid-cols-2">
                            <ul className="space-y-4 text-sm text-cool-steel-200">
                                <li className="flex gap-4">
                                    <span className="font-mono text-baltic-blue-400">12:00 PM</span>
                                    <span>Setup, Template Selection & Deployment Zero</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="font-mono text-baltic-blue-400">1:00 PM</span>
                                    <span>The "Recruiter Hook": Writing project descriptions that sell</span>
                                </li>
                            </ul>
                            <ul className="space-y-4 text-sm text-cool-steel-200">
                                <li className="flex gap-4">
                                    <span className="font-mono text-baltic-blue-400">03:30 PM</span>
                                    <span>Deep Work: Building out project pages & bio</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="font-mono text-baltic-blue-400">06:00 PM</span>
                                    <span>Group Judging and Prizes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* What to Bring */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Prepare for Success
                </h2>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Digital Assets
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>3-4 Projects (GitHub links/Screenshots)</li>
                            <li>A high-quality headshot</li>
                            <li>Current Resume (PDF)</li>
                            <li>Personal bio or "About Me" draft</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40 border border-neutral-800">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Technical Requirements
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            A laptop with a code editor (VS Code recommended) and a GitHub account already set up.
                            We will be using Vercel or Netlify for hosting. Accounts are free!
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Workshop FAQ
                </h2>

                <div className="mt-6 space-y-6 text-sm text-cool-steel-200">
                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            What if I don't know React or Tailwind?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            That's fine! We provide beginner-friendly templates and mentors
                            can help you customize simple HTML/CSS sites too.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Will there be food?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            Yes, lunch and coffee will be provided to keep the momentum going.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Is this only for CS students?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            Nope. Designers, engineers, and even data scientists need portfolios.
                            As long as you have projects to show, you belong here.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-neutral-900 text-center text-xs text-cool-steel-500">
                <p>UVic Hacks • Portfolio Sprint 2026 • Build your future.</p>
            </footer>
        </main>
    );
}