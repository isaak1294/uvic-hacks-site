import NavBar from "@/app/components/NavBar";

export default function FirstMeetingEventPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="bg-neutral-900/90 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        UVic Hacks Event
                    </p>

                    <h1 className="mt-4 text-4xl font-display font-bold tracking-tight md:text-6xl">
                        First Meeting{" "}
                        <span className="text-goldenrod-400">Kickoff</span>
                    </h1>

                    <p className="mt-4 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        Join us for our first official UVic Hacks meeting! We’re kicking
                        off the semester by introducing the team, sharing our exciting
                        event lineup, and getting to know each other through some fun challenges.
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-cool-steel-200">
                        <span className="rounded-full bg-baltic-blue-500/15 px-3 py-1 text-baltic-blue-300">
                            ECS 123
                        </span>
                        <span className="rounded-full bg-cool-steel-800/60 px-3 py-1 text-cool-steel-200">
                            Jan 15, 2026
                        </span>
                        <span className="rounded-full bg-cool-steel-800/60 px-3 py-1 text-cool-steel-200">
                            5:30–6:30 PM
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
                    What to expect
                </h2>

                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    This kickoff meeting is a casual social event to get UVic Hacks rolling.
                    No pressure and no formal role assignments, just a great chance to meet
                    fellow builders and find out what we have planned for the 2026 season.
                </p>

                <div className="mt-7 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Meet the Team
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Get to know the executive team behind the club and learn how we
                            can help you succeed in your hackathon journey.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Activity Outline
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            We’ll walk you through our planned workshops, guest speakers,
                            and upcoming hackathons for the semester.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Icebreakers
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Participate in short, low-stakes games and networking activities
                            designed to help you find potential teammates.
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

                <div className="mt-6 rounded-xl bg-neutral-900/70 p-6">
                    <ol className="space-y-4 text-sm text-cool-steel-200">
                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                1.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Welcome & Exec Intro
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    A quick hello from the club organizers and our vision for the year.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                2.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    The "UVic Hacks" Roadmap
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    A walkthrough of every workshop and hackathon we’ve got on the calendar.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                3.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Icebreaker & Social
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    A high-energy activity to help you meet people with similar tech interests.
                                </p>
                            </div>
                        </li>

                        <li className="flex gap-3">
                            <span className="mt-0.5 text-baltic-blue-300 font-semibold">
                                4.
                            </span>
                            <div>
                                <p className="font-semibold text-cool-steel-100">
                                    Q&A
                                </p>
                                <p className="mt-1 text-cool-steel-300">
                                    Ask us anything about the club while hanging out with new friends.
                                </p>
                            </div>
                        </li>
                    </ol>
                </div>
            </section>

            {/* Games Section */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Kickoff Activities
                </h2>
                <p className="mt-3 max-w-3xl text-sm text-cool-steel-200">
                    We believe the best projects start with great friendships. We've
                    planned a few things to break the ice:
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-neutral-900/70 p-6 border border-cool-steel-800/50">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Tech Stack Speed Dating
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-300">
                            Find your "technical soulmate" in 60-second rounds. Whether you
                            love Rust, React, or just Hardware, you'll find your crowd.
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/70 p-6 border border-cool-steel-800/50">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Paper Hackathon
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-300">
                            A 10-minute rapid-fire game where teams "design" a solution
                            to a ridiculous problem using only a few basic supplies.
                        </p>
                    </div>
                </div>
            </section>

            {/* Get ready */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <div className="rounded-2xl bg-neutral-900/80 p-8 shadow-sm shadow-black/40 border border-cool-steel-800/50">
                    <h3 className="text-xl font-display font-semibold text-cool-steel-50">
                        Ready to join the community?
                    </h3>
                    <p className="mt-2 text-sm text-cool-steel-200">
                        You don't need a project idea or a team to attend. Just bring
                        yourself and a positive attitude.
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