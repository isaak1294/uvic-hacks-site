import Head from "next/head"
import Link from "next/link"

// Event Data Configuration
const timelineEvents = [
    {
        month: "JAN",
        day: "15",
        title: "Winter Semester Kickoff",
        location: "ECS 116",
        description: "Join us a rundown of what's coming up this semester. Meet the new exec team and network with other club members.",
        highlight: false,
        type: "general",
        path: "/events/kickoff"
    },
    {
        month: "JAN",
        day: "30-31",
        title: "Inspire Hackathon for Social Impact",
        location: "TBD",
        description: "Create a project that can make a project that can make a difference with Inspire.",
        highlight: false,
        type: "sponsored",
        path: "/events/inspire-2025"
    },
    {
        month: "FEB",
        day: "15",
        title: "Workshop Hackathon 1",
        location: "TBD",
        description: "Learn a new skill at this hackathon.",
        highlight: false,
        type: "workshop",
        path: "/events/kickoff"
    },
    {
        month: "FEB",
        day: "21-22",
        title: "Sponsored Hackathon 2",
        location: "TBD",
        description: "This hackathon will have pizza, prizes, and industry professionals present!",
        highlight: true,
        type: "sponsored",
        path: "/events/kickoff"
    },
    {
        month: "MAR",
        day: "7",
        title: "Workshop Hackathon 2",
        location: "TBD",
        description: "Learn a new skill at this hackathon.",
        highlight: false,
        type: "workshop",
        path: "/events/kickoff"
    },
    {
        month: "MAR",
        day: "20-21",
        title: "Sponsored Hackathon 3",
        location: "TBD",
        description: "This hackathon will have pizza, prizes, and industry professionals present!",
        highlight: false,
        type: "sponsored",
        path: "/events/kickoff"
    },
    {
        month: "APR",
        day: "08",
        title: "End of Year Social",
        location: "Felicita's",
        description: "Wrap up the year with drinks, trivia, and the announcement of next year's executive team.",
        highlight: false,
        type: "general",
        path: "/events/kickoff"
    },
]

// Style mapping based on the 'type' key
const eventConfigs = {
    sponsored: {
        label: "Sponsored",
        tagClass: "bg-gold-950/20 text-gold-500 border-gold-900/50",
        dotClass: "bg-gold-500 shadow-[0_0_12px_rgba(234,179,8,0.4)]",
        cardClass: "border-gold-900/40 bg-gold-950/5",
        accent: "text-gold-100"
    },
    workshop: {
        label: "Workshop",
        tagClass: "bg-blue-950/20 text-blue-400 border-blue-900/50",
        dotClass: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]",
        cardClass: "border-blue-900/30 bg-blue-950/5",
        accent: "text-blue-100"
    },
    general: {
        label: "Meeting",
        tagClass: "bg-cool-steel-900/50 text-cool-steel-400 border-cool-steel-800",
        dotClass: "bg-blue-950",
        cardClass: "border-cool-steel-800 bg-neutral-900",
        accent: "text-white"
    }
}

export default function Roadmap() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Head>
                <title>Roadmap | UVic Hacks</title>
                <meta name="description" content="Upcoming events for UVic Hacks." />
            </Head>

            {/* Navbar */}
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900/80 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition">
                            <span className="text-blue-500">UVic</span>{" "}
                            <span className="text-gold-500">Hacks</span>
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-6 text-xs font-medium">
                        <div className="hidden items-center gap-6 md:flex">
                            <Link href="/#featured" className="transition hover:text-blue-300">Featured</Link>
                            <Link href="/#upcoming" className="transition hover:text-blue-300">Upcoming</Link>
                            <Link href="/#about" className="transition hover:text-blue-300">About</Link>
                            <Link href="/#contact" className="transition hover:text-blue-300">Contact Us</Link>
                        </div>
                        <Link
                            href="/join"
                            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-500 hover:shadow-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Header Section */}
            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
                    Roadmap
                </p>
                <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-5xl">
                    Events Spring <span className="text-gold-500">2026</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-cool-steel-200">
                    Mark your calendars. From workshops to our flagship hackathon,
                    here is everything happening this semester.
                </p>
            </section>

            {/* Vertical Timeline Section */}
            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-6 text-left">
                <div className="relative border-l border-cool-steel-800 ml-4 md:ml-6 space-y-12">
                    {timelineEvents.map((event, index) => {
                        // Select config based on the type defined in the data
                        const config = eventConfigs[event.type as keyof typeof eventConfigs] || eventConfigs.general;

                        return (
                            <div key={index} className="relative pl-8 md:pl-12 group">
                                {/* Left Aligned Dot */}
                                <span
                                    className={`absolute -left-[6px] top-2 h-[12px] w-[12px] rounded-full border-2 border-neutral-950 transition-all duration-300 group-hover:scale-125 z-10
                                    ${config.dotClass}`}
                                ></span>

                                {/* Date & Tag Row */}
                                <div className="mb-2 flex items-center gap-3">
                                    <span className="text-xs font-bold tracking-wider text-cool-steel-400">
                                        {event.month} <span className="text-white text-sm">{event.day}</span>
                                    </span>
                                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${config.tagClass}`}>
                                        {config.label}
                                    </span>
                                </div>

                                {/* Content Card */}
                                <div className={`relative rounded-xl border p-5 transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg
                                    ${config.cardClass}`}>

                                    <h3 className={`text-xl font-bold font-display tracking-tight ${config.accent}`}>
                                        {event.title}
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2 text-xs font-medium text-blue-400">
                                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {event.location}
                                    </div>

                                    <p className="mt-3 text-sm leading-relaxed text-cool-steel-300">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}