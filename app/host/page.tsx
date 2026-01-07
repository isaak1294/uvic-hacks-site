// app/host/page.tsx

export default function HostHackathonPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="-b  bg-neutral-900/90 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        Partner with UVic Hacks
                    </p>

                    <h1 className="mt-4 text-4xl font-display font-bold tracking-tight md:text-6xl">
                        Host Your Own{" "}
                        <span className="text-goldenrod-400">Hackathon</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        We’ll run a hackathon or build sprint for your company, lab, club, or
                        idea tailored to your goals, timeline, and budget.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-cool-steel-200">
                        <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-baltic-blue-300">
                            Student-run • UVSS-registered
                        </span>
                        <span className="rounded-full bg-cool-steel-800/60 px-3 py-1 text-cool-steel-200">
                            Any size • Any theme
                        </span>
                        <span className="rounded-full bg-cool-steel-800/60 px-3 py-1 text-cool-steel-200">
                            Any budget
                        </span>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="#contact"
                            className="rounded-full bg-baltic-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            Get in touch
                        </a>
                        <a
                            href="/"
                            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 hover:shadow-lg"
                        >
                            Back to home
                        </a>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    What we offer
                </h2>

                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    UVic Hacks is a thriving student hackathon community. If you want to
                    engage students, explore ideas quickly, or build something exciting
                    on campus, we can host an event for you. We handle logistics, recruiting,
                    promotion, and event-day operations. You bring the theme, goals, and
                    any resources you want participants to use.
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Full event hosting
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We’ll run the hackathon end-to-end: schedule, space, judging
                            format, mentors, registration, and day-of coordination.
                        </p>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Custom to your goals
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Product challenges, data sprints, creative coding jams, workshops,
                            or themed build nights, whatever fits your vision.
                        </p>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Budget-flexible
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We keep costs low and can tailor an event to almost any budget.
                            Smaller events are totally welcome.
                        </p>
                    </div>
                </div>
            </section>

            {/* Companies vs Individuals */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* Companies */}
                    <div className="rounded-2xl   bg-neutral-900/80 p-7 shadow-sm shadow-black/40">
                        <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                            For companies
                        </h2>
                        <p className="mt-3 text-sm text-cool-steel-200">
                            Hosting with UVic Hacks puts your name directly in front of a
                            motivated, builder-focused student community.
                        </p>

                        <ul className="mt-5 space-y-3 text-sm text-cool-steel-200">
                            <li className="flex gap-3">
                                <span className="mt-0.5 text-goldenrod-400 font-semibold">•</span>
                                <p>
                                    <span className="text-cool-steel-100 font-semibold">
                                        Brand presence.
                                    </span>{" "}
                                    Get your company associated with UVic’s growing hackathon scene.
                                </p>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 text-goldenrod-400 font-semibold">•</span>
                                <p>
                                    <span className="text-cool-steel-100 font-semibold">
                                        Promotion that feels real.
                                    </span>{" "}
                                    Students lead the energy, and your challenge becomes the center
                                    of the story.
                                </p>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 text-goldenrod-400 font-semibold">•</span>
                                <p>
                                    <span className="text-cool-steel-100 font-semibold">
                                        Talent scouting.
                                    </span>{" "}
                                    Meet some of UVic’s top builders in a high-signal environment.
                                </p>
                            </li>
                        </ul>

                        <p className="mt-5 text-xs text-cool-steel-400">
                            Great for: recruiting pipelines, product exploration, community
                            engagement, or launching something new.
                        </p>
                    </div>

                    {/* Individuals */}
                    <div className="rounded-2xl   bg-neutral-900/80 p-7 shadow-sm shadow-black/40">
                        <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                            For individuals
                        </h2>
                        <p className="mt-3 text-sm text-cool-steel-200">
                            Got a cool skill, tool, or idea you want to share? We’ll help you
                            turn it into a fun build event on campus.
                        </p>

                        <ul className="mt-5 space-y-3 text-sm text-cool-steel-200">
                            <li className="flex gap-3">
                                <span className="mt-0.5 text-baltic-blue-300 font-semibold">•</span>
                                <p>
                                    <span className="text-cool-steel-100 font-semibold">
                                        Teach something awesome.
                                    </span>{" "}
                                    Run a workshop-style hackathon around a skill you love.
                                </p>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 text-baltic-blue-300 font-semibold">•</span>
                                <p>
                                    <span className="text-cool-steel-100 font-semibold">
                                        Start a campus project.
                                    </span>{" "}
                                    Gather a team and build something meaningful for UVic students.
                                </p>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 text-baltic-blue-300 font-semibold">•</span>
                                <p>
                                    <span className="text-cool-steel-100 font-semibold">
                                        Plug into a community.
                                    </span>{" "}
                                    We bring participants, structure, and momentum.
                                </p>
                            </li>
                        </ul>

                        <p className="mt-5 text-xs text-cool-steel-400">
                            Great for: creative coding jams, data sprints, design/build nights,
                            research prototypes, or learning-focused mini-hackathons.
                        </p>
                    </div>
                </div>
            </section>

            {/* Costs / Budget */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Costs & budget
                </h2>

                <div className="mt-4 max-w-3xl text-sm text-cool-steel-200 space-y-3">
                    <p>
                        We’re a student-run club, which means we{" "}
                        <span className="text-cool-steel-100 font-semibold">
                            cannot directly cover event costs
                        </span>{" "}
                        (food, prizes, supplies, travel, etc.).
                    </p>
                    <p>
                        What we *are* great at is keeping costs low. We know what works on
                        campus, how to share resources, and how to scale an event to match
                        your constraints.
                    </p>
                    <p>
                        Whether you’re aiming for a large 24-hour hackathon or a small evening
                        build sprint, we’ll tailor the format to fit your budget.
                    </p>
                </div>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Low-budget option
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            2–4 hour sprint, no prizes required, minimal supplies. Perfect for
                            workshops or idea challenges.
                        </p>
                    </div>
                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Standard hackathon
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Half-day or full-day build with judging, mentors, and modest prizes.
                        </p>
                    </div>
                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Big showcase event
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            24-hour hackathon with full promotion, sponsors, prizes, and a
                            high-energy finale.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact / CTA */}
            <section
                id="contact"
                className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14"
            >
                <div className="rounded-2xl   bg-neutral-900/80 p-8 shadow-sm shadow-black/40">
                    <h3 className="text-xl font-display font-semibold text-cool-steel-50">
                        Want to host with us?
                    </h3>
                    <p className="mt-2 text-sm text-cool-steel-200">
                        Send us a quick note with what you’re thinking, even if it’s rough.
                        We’ll help shape it into a great event.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg   bg-neutral-950 p-4 text-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-cool-steel-400">
                                Tell us
                            </p>
                            <p className="mt-1 text-cool-steel-200">
                                Your idea, theme, or goal
                            </p>
                        </div>
                        <div className="rounded-lg   bg-neutral-950 p-4 text-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-cool-steel-400">
                                Constraints
                            </p>
                            <p className="mt-1 text-cool-steel-200">
                                Target budget + timeline
                            </p>
                        </div>
                        <div className="rounded-lg   bg-neutral-950 p-4 text-sm">
                            <p className="text-xs font-semibold uppercase tracking-wide text-cool-steel-400">
                                Audience
                            </p>
                            <p className="mt-1 text-cool-steel-200">
                                Who you want participating
                            </p>
                        </div>
                    </div>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <a
                            href="mailto:isaak@uvichacks.com"
                            className="rounded-full bg-goldenrod-500 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-yellow-900/50 transition hover:bg-goldenrod-400 hover:shadow-lg"
                        >
                            Email UVic Hacks
                        </a>
                        <a
                            href="/join"
                            className="text-sm font-medium text-cool-steel-200 underline-offset-4 hover:text-baltic-blue-300 hover:underline"
                        >
                            Join the club
                        </a>
                    </div>

                    <p className="mt-3 text-xs text-cool-steel-500">
                        You can also reach out on Discord or through any UVic Hacks organizer.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="-t  py-6 text-center text-xs text-cool-steel-500">
                <p>UVic Hacks: student-run hackathons, workshops, and build sprints.</p>
            </footer>
        </main >
    );
}
