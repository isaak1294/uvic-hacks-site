import Head from "next/head";
import Link from "next/link";

type Role = {
    title: string;
    name: string;
    focus: string;
};

type TimelineItem = {
    month: string;
    status: "Confirmed" | "Planned" | "TBD";
    items: string[];
};

type GoalCategory = {
    category: string;
    owner: string;
    tasks: string[];
};

export default function InternalRoadmap() {
    const roles: Role[] = [
        { title: "President", name: "You", focus: "General Oversight & Direction" },
        { title: "Social Media Manager", name: "Ella", focus: "Content Strategy & Documentation" },
        { title: "Director of Event Planning", name: "Harsh", focus: "Logistics & Operations" },
        { title: "Director of Sponsorship", name: "Arfaz", focus: "Funding & Industry Relations" },
        { title: "Director of Outreach", name: "Jake", focus: "Campus Marketing & Ads" },
        { title: "Travel & Tech Lead", name: "Isaak", focus: "Competitions & Web Infrastructure" },
    ];

    const timeline: TimelineItem[] = [
        {
            month: "January",
            status: "Confirmed",
            items: [
                "Jan 14-15: Clubs and Course Union Days (CCUD) booth",
                "Jan 15: First General Meeting",
                "Jan 24: First Low-Stakes Hackathon / Workshop",
                "Goal: Establish bi-weekly meeting cadence",
            ],
        },
        {
            month: "February",
            status: "Planned",
            items: [
                "2 General Meetings",
                "2 Hackathons (Mix of sponsored or workshop style)",
                "Begin screening for Travel Team",
            ],
        },
        {
            month: "March",
            status: "TBD",
            items: ["Schedule To Be Determined"],
        },
        {
            month: "April",
            status: "TBD",
            items: ["Schedule To Be Determined (Finals Season)"],
        },
    ];

    const goals: GoalCategory[] = [
        {
            category: "Hackathons & Events",
            owner: "All Executives",
            tasks: [
                "Execute 3 Sponsored Hackathons (Target: Inspire)",
                "Execute 3 Low-stakes / Workshop Hackathons",
                "Total Target: 6 Events",
                "Standardize food/logistics costs per participant",
            ],
        },
        {
            category: "Sponsorship",
            owner: "Arfaz",
            tasks: [
                "Secure 2 non-Inspire sponsors",
                "Attend local networking events for leads",
            ],
        },
        {
            category: "Marketing & Outreach",
            owner: "Ella & Jake",
            tasks: [
                "Jake: Campus posters up before Jan 1st",
                "Jake: Create visual ads",
                "Ella: One fun post per week",
                "Ella: Full coverage (pre/post) for every hackathon",
            ],
        },
        {
            category: "Travel & Infrastructure",
            owner: "Isaak",
            tasks: [
                "Select the external competition for UVic delegation",
                "Create qualification outline for students",
                "Setup mail server",
                "Maintain website updates",
            ],
        },
    ];

    const hackathonIdeas = [
        {
            type: "Edgy / Niche",
            ideas: ["Three.js (3js) Web Graphics", "Game Jam (Partner with Gamedev/Brandon Haworth)", "Low-level Systems", "CAD / Engineering", "Portfolio Website Build"],
        },
        {
            type: "Classic",
            ideas: ["Standard Problem/Solution Format"],
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-cool-steel-100 font-sans selection:bg-blue-900 selection:text-white">
            <Head>
                <title>Internal Roadmap | UVic Hacks</title>
            </Head>

            <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
                {/* Header */}
                <header className="mb-16 border-b border-cool-steel-800 pb-8">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                        Internal Documentation
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Spring 2026 Strategy Brief
                    </h1>
                    <p className="mt-4 text-lg text-cool-steel-400">
                        Operational outline, role assignments, and semester timeline.
                    </p>
                </header>

                {/* Section 1: Pre-Semester Checklist */}
                <section className="mb-16">
                    <h2 className="mb-6 text-xl font-semibold text-white">
                        Immediate Action Items (Pre-January)
                    </h2>
                    <div className="rounded-lg border border-red-900/30 bg-red-950/10 p-6">
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                <span>Establish Social Media presence</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                                <span>Distribute posters across campus (Outreach)</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Section 2: Roles */}
                <section className="mb-16">
                    <h2 className="mb-6 text-xl font-semibold text-white">
                        Core Leadership Roles
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        {roles.map((role) => (
                            <div
                                key={role.title}
                                className="rounded-md border border-cool-steel-800 bg-neutral-900/50 p-4"
                            >
                                <div className="text-xs font-medium uppercase tracking-wider text-blue-400">
                                    {role.name}
                                </div>
                                <div className="mt-1 text-lg font-semibold text-white">
                                    {role.title}
                                </div>
                                <div className="mt-2 text-sm text-cool-steel-400">
                                    {role.focus}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Timeline */}
                <section className="mb-16">
                    <h2 className="mb-6 text-xl font-semibold text-white">
                        Semester Timeline
                    </h2>
                    <div className="relative space-y-8 border-l-2 border-cool-steel-800 ml-3 pl-8 py-2">
                        {timeline.map((item) => (
                            <div key={item.month} className="relative">
                                {/* Dot on timeline */}
                                <div
                                    className={`absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-neutral-950 ${item.status === "TBD" ? "bg-cool-steel-700" : "bg-blue-500"
                                        }`}
                                />

                                <h3 className="flex items-center gap-3 text-lg font-bold text-white">
                                    {item.month}
                                    {item.status === "TBD" && (
                                        <span className="rounded-full bg-cool-steel-800 px-2 py-0.5 text-[10px] font-medium uppercase text-cool-steel-400">
                                            TBD
                                        </span>
                                    )}
                                </h3>

                                <ul className="mt-3 space-y-2">
                                    {item.items.map((point, idx) => (
                                        <li key={idx} className="text-sm text-cool-steel-300">
                                            • {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Goals by Department */}
                <section className="mb-16">
                    <h2 className="mb-6 text-xl font-semibold text-white">
                        Departmental Goals
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {goals.map((area) => (
                            <div
                                key={area.category}
                                className="flex flex-col rounded-lg border border-cool-steel-800 bg-neutral-900 p-6"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="font-semibold text-white">{area.category}</h3>
                                    <span className="text-xs text-blue-400">{area.owner}</span>
                                </div>
                                <ul className="space-y-2 text-sm text-cool-steel-300">
                                    {area.tasks.map((task, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 block h-1 w-1 min-w-[4px] rounded-full bg-cool-steel-600" />
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 5: Hackathon Concepts */}
                <section className="mb-16">
                    <h2 className="mb-6 text-xl font-semibold text-white">
                        Hackathon Theme Ideas
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        {hackathonIdeas.map((theme) => (
                            <div key={theme.type} className="rounded-lg bg-cool-steel-900/20 p-6">
                                <h3 className="mb-3 text-lg font-medium text-yellow-500">
                                    {theme.type}
                                </h3>
                                <ul className="list-disc pl-4 text-sm text-cool-steel-300 space-y-1">
                                    {theme.ideas.map((idea, idx) => (
                                        <li key={idx}>{idea}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-20 border-t border-cool-steel-800 pt-8 text-center text-xs text-cool-steel-500">
                    <p>Confidential Planning Document • UVic Hacks Executive Team</p>
                    <div className="mt-4">
                        <Link href="/" className="text-blue-500 hover:underline">
                            Back to Home
                        </Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}