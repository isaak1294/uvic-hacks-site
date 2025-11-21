"use client";

export default function StrudelHackathonPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            {/* Hero */}
            <section className="border-b border-cool-steel-800 bg-neutral-900/90 py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                        UVic Hacks Presents
                    </p>

                    <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-6xl">
                        Strudel <span className="text-goldenrod-400">Hackathon</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-cool-steel-100 md:text-xl">
                        A one-day creative coding sprint where developers, musicians, and
                        artists build generative music using{" "}
                        <span className="text-baltic-blue-300 font-semibold">
                            Strudel
                        </span>{" "}
                        — a live-coding environment for algorithmic beats.
                    </p>

                    <div className="mt-8 flex gap-4">
                        <a
                            href="/join"
                            className="rounded-full bg-baltic-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg"
                        >
                            Join UVic Hacks
                        </a>
                        <a
                            href="#register"
                            className="text-sm font-medium text-cool-steel-200 underline-offset-4 hover:text-baltic-blue-300 hover:underline"
                        >
                            Register for the Hackathon
                        </a>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    What is the Strudel Hackathon?
                </h2>
                <p className="mt-4 max-w-3xl text-sm text-cool-steel-200">
                    The Strudel Hackathon is a fast, creative event where participants
                    use{" "}
                    <span className="text-baltic-blue-300 font-medium">Strudel</span>—
                    a browser-based live-coding environment—to generate beats, melodies,
                    soundscapes, and experimental audio patterns. No prior music theory
                    or Strudel experience is required: you learn by doing, remixing, and
                    hacking ideas together.
                </p>

                <p className="mt-3 max-w-3xl text-sm text-cool-steel-200">
                    You can work solo or form a small team. Mentors will be available
                    throughout the day to help with code, structure, sound design, and
                    creativity prompts.
                </p>
            </section>

            {/* Schedule */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Event Schedule
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border border-cool-steel-800 bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Workshop & Kickoff
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-cool-steel-300">
                            <li>12:00 PM – Light snacks, intros, setup</li>
                            <li>12:15 PM – Intro to Strudel</li>
                            <li>12:45 PM – Live coding demo</li>
                            <li>1:00 PM – Hacking begins</li>
                        </ul>
                    </div>

                    <div className="rounded-lg border border-cool-steel-800 bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-cool-steel-50">
                            Hacking & Judging
                        </h3>
                        <ul className="mt-3 space-y-2 text-sm text-cool-steel-300">
                            <li>1:00–5:30 PM – Build, remix, compose</li>
                            <li>5:30 PM – Pizza arrives</li>
                            <li>6:00 PM – Judging & listening session</li>
                            <li>7:00 PM – Winners announced</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* What to Expect */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    What to Expect
                </h2>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-lg border border-cool-steel-800 bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            No experience needed
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Total beginners are welcome. Strudel runs in your browser and is
                            easy to learn.
                        </p>
                    </div>
                    <div className="rounded-lg border border-cool-steel-800 bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Creative freedom
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Make a song, a beat generator, an ambient landscape, a musical
                            game—anything counts.
                        </p>
                    </div>
                    <div className="rounded-lg border border-cool-steel-800 bg-neutral-900/70 p-6">
                        <h3 className="text-lg font-semibold text-baltic-blue-300">
                            Chance to collaborate
                        </h3>
                        <p className="mt-2 text-sm text-cool-steel-200">
                            Build alone or team up with other coders, musicians, and artists.
                        </p>
                    </div>
                </div>
            </section>

            {/* Judging */}
            <section className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    Judging Criteria
                </h2>

                <ul className="mt-6 space-y-3 text-sm text-cool-steel-200">
                    <li>🎵 **Creativity** — originality of patterns, structure, or sound</li>
                    <li>💻 **Technical skill** — interesting code techniques or generative logic</li>
                    <li>🎨 **Aesthetics** — musicality, vibe, “listenability”</li>
                    <li>✨ **Presentation** — clarity, storytelling, performances welcome</li>
                </ul>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
                <h2 className="text-2xl font-display font-semibold tracking-tight md:text-3xl">
                    FAQ
                </h2>

                <div className="mt-6 space-y-6 text-sm text-cool-steel-200">
                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Do I need music experience?
                        </p>
                        <p>Nope! Many participants are total beginners.</p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            What is Strudel?
                        </p>
                        <p>
                            Strudel is a web-based live coding environment for generative
                            music. You write small expressions and patterns that Strudel
                            interprets as sound.
                        </p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            Can I bring a friend?
                        </p>
                        <p>Yes! Teams are welcome, or you can build solo.</p>
                    </div>

                    <div>
                        <p className="font-semibold text-cool-steel-100">
                            What do I need to bring?
                        </p>
                        <p>A laptop, charger, and headphones.</p>
                    </div>
                </div>
            </section>

            {/* Registration */}
            <section
                id="register"
                className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20"
            >
                <div className="rounded-2xl border border-cool-steel-800 bg-neutral-900/80 p-8 shadow-sm shadow-black/40">
                    <h3 className="text-xl font-display font-semibold text-cool-steel-50">
                        Register for the Strudel Hackathon
                    </h3>
                    <p className="mt-2 text-sm text-cool-steel-300">
                        Sign up through our club registration page and you’ll receive all
                        event details, updates, and reminders.
                    </p>

                    <a
                        href="/join"
                        className="mt-6 inline-block rounded-full bg-goldenrod-500 px-6 py-3 text-sm font-semibold text-black shadow-md shadow-yellow-900/50 transition hover:bg-goldenrod-400 hover:shadow-lg"
                    >
                        Join & Register
                    </a>
                </div>
            </section>
        </main>
    );
}
