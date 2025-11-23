// app/events/first-meeting/page.tsx

export default function FirstMeetingEventPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="  bg-neutral-900/90 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        UVic Hacks Event
                    </p>

                    <h1 className="mt-4 text-4xl font-display font-bold tracking-tight md:text-6xl">
                        First Meeting{" "}
                        <span className="text-goldenrod-400">Kickoff</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        Join us for our first official UVic Hacks meeting. We’ll introduce
                        the club, walk through our tentative hackathon schedule, and set up
                        teams and roles for the semester.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-cool-steel-200">
                        <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-baltic-blue-300">
                            ECS 123
                        </span>
                        <span className="rounded-full bg-cool-steel-800/60 px-3 py-1 text-cool-steel-200">
                            Jan 15, 2026
                        </span>
                        <span className="rounded-full bg-cool-steel-800/60 px-3 py-1 text-cool-steel-200">
                            6:00–7:30 PM
                        </span>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <a
                            href="/join"
                            className="rounded-full bg-baltic-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            Join the Club
                        </a>
                        <a
                            href="#agenda"
                            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            See Agenda
                        </a>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    What this meeting is about
                </h2>

                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    This kickoff meeting is where UVic Hacks officially gets rolling for
                    the semester. Whether you’re brand new to hackathons or already a
                    hardened builder, this is the best way to get plugged into the club,
                    meet people, and find your place in the community.
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Meet the club
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Who we are, what we do, and how UVic Hacks fits into the hackathon
                            scene on campus and beyond.
                        </p>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Plan the semester
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We’ll review a tentative hackathon/workshop schedule and talk
                            about upcoming opportunities.
                        </p>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Assign roles
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We’ll set up organizing teams and responsibilities so everyone
                            knows how to contribute.
                        </p>
                    </div>
                </div>
            </section>

            {/* Agenda */}
            <section
                id="agenda"
                className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14"
            >
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Agenda
                </h2>

                <div className="mt-6 rounded-xl   bg-neutral-900/70 p-6">
                    <ol className="space-y-4 text-sm text-cool-steel-200">
                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                1.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Welcome & introductions
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    Quick intro from organizers and a short icebreaker to meet
                                    other members.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                2.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    What is UVic Hacks?
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    Who we are, our goals as a UVSS-registered club, and why
                                    hackathons matter.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                3.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Tentative semester schedule
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    Walkthrough of planned hackathons, workshops, and external
                                    events we want UVic teams to attend.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                4.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Roles & responsibilities
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    We’ll outline teams and let people opt into roles based on
                                    interest.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                5.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Q&A + next steps
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    Open floor for questions, then we’ll share how to stay involved.
                                </p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>

            {/* Roles */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Roles we’ll assign
                </h2>
                <p className="mt-3 max-w-3xl text-sm text-cool-steel-200">
                    UVic Hacks runs because students step up. You don’t need prior club
                    experience — just interest and reliability. We’ll form small teams for:
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Events Team
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>Plan hackathon formats and themes</li>
                            <li>Coordinate rooms, food, and schedules</li>
                            <li>Run day-of logistics</li>
                        </ul>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Outreach & Sponsors
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>Contact local companies and alumni</li>
                            <li>Secure prizes and mentorship</li>
                            <li>Build long-term partnerships</li>
                        </ul>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Teams & Competitions
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>Form strong UVic teams</li>
                            <li>Track external hackathon opportunities</li>
                            <li>Prep groups to represent UVic well</li>
                        </ul>
                    </div>

                    <div className="rounded-lg   bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Marketing & Media
                        </h3>
                        <ul className="mt-2 list-disc pl-5 text-sm text-cool-steel-200 space-y-1">
                            <li>Posters, social posts, announcements</li>
                            <li>Photo/video coverage at events</li>
                            <li>Keep the site and Discord active</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Get ready */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <div className="rounded-2xl   bg-neutral-900/80 p-8 shadow-sm shadow-black/40">
                    <h3 className="text-xl font-display font-semibold text-cool-steel-50">
                        Come say hi
                    </h3>
                    <p className="mt-2 text-sm text-cool-steel-200">
                        Bring a laptop if you want, but you don’t need one. The only
                        requirement is showing up curious and ready to build stuff with
                        people.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                            href="/join"
                            className="rounded-full bg-goldenrod-500 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-yellow-900/50 transition hover:bg-goldenrod-400 hover:shadow-lg"
                        >
                            Join UVic Hacks
                        </a>
                        <a
                            href="/"
                            className="text-sm font-medium text-cool-steel-200 underline-offset-4 hover:text-baltic-blue-300 hover:underline"
                        >
                            Back to home
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
