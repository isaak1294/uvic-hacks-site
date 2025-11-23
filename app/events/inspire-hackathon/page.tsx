// app/events/inspire-hackathon/page.tsx

export default function InspireHackathonPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="bg-neutral-900/90 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        Featured Event • UVic Hacks x Inspire UVic
                    </p>

                    <h1 className="mt-4 text-4xl font-display font-bold tracking-tight md:text-6xl">
                        Inspire{" "}
                        <span className="text-goldenrod-400">Hackathon</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        Team up with Inspire UVic to work on software projects for social
                        impact in this two-day hackathon.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-cool-steel-200">
                        <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-baltic-blue-300">
                            Hickman 105
                        </span>
                        <span className="rounded-full bg-cool-steel-800/50 px-3 py-1 text-cool-steel-200">
                            Oct 3–4, 2025
                        </span>
                        <span className="rounded-full bg-cool-steel-800/50 px-3 py-1 text-cool-steel-200">
                            2-Day Hackathon
                        </span>
                        <span className="rounded-full bg-green-700/80 px-3 py-1 text-cool-steel-200">
                            Completed
                        </span>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="/join"
                            className="rounded-full bg-baltic-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            Join UVic Hacks
                        </a>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    What is the Inspire Hackathon?
                </h2>

                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    The Inspire Hackathon is a two-day build sprint focused on creating
                    software for social impact. You’ll work in teams to ship prototypes
                    that support real causes, with mentors on hand for guidance on
                    product, engineering, and pitching.
                </p>

                <p className="mt-3 max-w-3xl text-sm text-cool-steel-200">
                    This event is open to everyone at UVic. Whether you’re brand new to
                    hackathons or already a seasoned builder, there’s a place for you.
                    You can come with a team or find one at kickoff.
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Social impact focus
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Build tools, apps, or experiences that improve life on campus or
                            beyond.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Mentors & support
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We’ll have organizers and mentors around for debugging,
                            brainstorming, and feedback.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Beginner friendly
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            No experience required. We’ll help you get started and find a
                            role that fits you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Tentative Schedule
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Day 1: Kickoff & Build
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-cool-steel-200">
                            <li>5:00 PM: Doors open + snacks</li>
                            <li>5:30 PM: Welcome + theme reveal</li>
                            <li>6:00 PM: Team formation</li>
                            <li>6:30 PM: Hacking begins</li>
                            <li>Evening: Mentor check-ins</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Day 2: Finish & Present
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-cool-steel-200">
                            <li>9:00 AM: Build continues</li>
                            <li>12:00 PM: Final push</li>
                            <li>12:30 PM: Project expo & demos</li>
                            <li>2:00 PM: Awards + wrap-up</li>
                        </ul>
                    </div>
                </div>

                <p className="mt-4 text-xs text-cool-steel-400">
                    Schedule may shift slightly, registrants will receive the final plan
                    closer to the event.
                </p>
            </section>

            {/* What to Bring / How Teams Work */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    What to Bring
                </h2>

                <div className="mt-4 grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Essentials
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>Laptop + charger</li>
                            <li>Headphones</li>
                            <li>Water bottle</li>
                            <li>Any hardware you want to use</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Teams
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Teams are typically 2–4 people. If you come solo, we’ll help you
                            find teammates at kickoff. Designers, developers, and idea-people
                            are all valuable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Judging */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Judging Criteria
                </h2>

                <div className="mt-5 grid gap-6 md:grid-cols-4">
                    <div className="rounded-xl bg-neutral-900/70 p-5 shadow-sm shadow-black/40">
                        <p className="text-sm font-semibold text-cool-steel-50">
                            Social Impact
                        </p>
                        <p className="mt-2 text-xs text-cool-steel-200">
                            Does it help people in a real way?
                        </p>
                    </div>
                    <div className="rounded-xl bg-neutral-900/70 p-5 shadow-sm shadow-black/40">
                        <p className="text-sm font-semibold text-cool-steel-50">
                            Creativity
                        </p>
                        <p className="mt-2 text-xs text-cool-steel-200">
                            Originality of concept and execution.
                        </p>
                    </div>
                    <div className="rounded-xl bg-neutral-900/70 p-5 shadow-sm shadow-black/40">
                        <p className="text-sm font-semibold text-cool-steel-50">
                            Technical Quality
                        </p>
                        <p className="mt-2 text-xs text-cool-steel-200">
                            How solid and thoughtful is the build?
                        </p>
                    </div>
                    <div className="rounded-xl bg-neutral-900/70 p-5 shadow-sm shadow-black/40">
                        <p className="text-sm font-semibold text-cool-steel-50">
                            Presentation
                        </p>
                        <p className="mt-2 text-xs text-cool-steel-200">
                            Clarity, story, and demo strength.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    FAQ
                </h2>

                <div className="mt-6 space-y-6 text-sm text-cool-steel-200">
                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Do I need experience?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            No. We’ll support beginners with mentors, prompts, and team
                            matching.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Can I work on a project I already started?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            We prefer new builds during the event, but using old ideas,
                            libraries, or partial prototypes is totally fine.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            What should I build?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            Anything aligned with the social impact theme. We’ll share
                            challenge prompts at kickoff.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Is there food?
                        </p>
                        <p className="mt-1 text-cool-steel-300">
                            There will be snacks and meals throughout the event.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 text-center text-xs text-cool-steel-500">
                <p>UVic Hacks • Inspire Hackathon • Build for social impact.</p>
            </footer>
        </main>
    );
}
