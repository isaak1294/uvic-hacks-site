import Head from "next/head"
import Link from "next/link"

const analyticsFeatures = [
    {
        title: "The Talent Funnel",
        description: "A comprehensive breakdown of participant demographics. Know exactly who is in the room.",
        items: ["Year of study distribution", "Major & Specialization breakdown", "Primary programming languages used"],
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: "Engagement Metrics",
        description: "Hard data on how students interacted with your brand and technical challenges.",
        items: ["Booth interaction volume", "Workshop attendance rates", "Sponsor-challenge completion data"],
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        )
    },
    {
        title: "Curated Talent Heatmap",
        description: "Skip the manual screening. We identify the 'hidden gems' based on project performance.",
        items: ["Top performers in specific stacks", "Soft skill evaluations from mentors", "Verified technical 'Skill Tags'"],
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.99 7.99 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14l-1.121 2.121z" />
            </svg>
        )
    }
]

export default function RecruitmentAnalytics() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Head>
                <title>Recruitment ROI | UVic Hacks</title>
            </Head>

            {/* Navbar */}
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900/80 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    <Link href="/" className="text-lg font-semibold tracking-tight">
                        <span className="text-blue-500">UVic</span> <span className="text-gold-500">Hacks</span>
                    </Link>
                    <div className="ml-auto">
                        <Link href="/sponsor" className="text-sm font-medium text-cool-steel-400 hover:text-white transition">
                            &larr; Back to Tiers
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">
                        Sponsor Insights
                    </p>
                    <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-6xl">
                        Recruitment <span className="text-blue-500">Intelligence.</span>
                    </h1>
                    <p className="mt-6 text-lg text-cool-steel-200 leading-relaxed">
                        Don't just collect resumes. Get a deep-dive report that identifies the exact talent
                        Redbrick needs to grow, backed by 48 hours of hands-on performance data.
                    </p>
                </div>
            </section>

            {/* Value Grid */}
            <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {analyticsFeatures.map((feature, idx) => (
                        <div key={idx} className="group">
                            <div className="mb-4 inline-block rounded-xl bg-blue-500/10 p-3 text-blue-500 ring-1 ring-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                            <p className="mt-2 text-sm text-cool-steel-400">{feature.description}</p>
                            <ul className="mt-6 space-y-2">
                                {feature.items.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-cool-steel-200">
                                        <div className="h-1 w-1 rounded-full bg-gold-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mock Report Visualization */}
            <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
                <div className="rounded-3xl border border-cool-steel-800 bg-neutral-900/40 p-8 md:p-12">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="max-w-md">
                            <h2 className="text-2xl font-bold text-white">The ROI of Community</h2>
                            <p className="mt-4 text-sm text-cool-steel-300 leading-relaxed">
                                The average technical hire in Victoria costs thousands in sourcing fees. Our Silver and Gold partners
                                receive a curated pipeline of candidates who have already been "interviewed" by our technical judges over a full weekend.
                            </p>
                            <div className="mt-8 flex gap-4">
                                <div className="rounded-lg bg-blue-950/30 p-4 border border-blue-900/50">
                                    <p className="text-2xl font-bold text-blue-400">85%</p>
                                    <p className="text-[10px] uppercase tracking-wider text-cool-steel-400">Participant Opt-in</p>
                                </div>
                                <div className="rounded-lg bg-gold-950/30 p-4 border border-gold-900/50">
                                    <p className="text-2xl font-bold text-gold-500">200+</p>
                                    <p className="text-[10px] uppercase tracking-wider text-cool-steel-400">Verified Developers</p>
                                </div>
                            </div>
                        </div>

                        {/* Visual Rep of a chart/data */}
                        <div className="w-full max-w-sm rounded-2xl border border-cool-steel-800 bg-neutral-950 p-6 shadow-2xl">
                            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-cool-steel-500">Example Skill Heatmap</p>
                            <div className="space-y-4">
                                {[
                                    { label: 'TypeScript / Next.js', val: 'w-[90%]', color: 'bg-blue-500' },
                                    { label: 'C++ / Systems', val: 'w-[65%]', color: 'bg-gold-500' },
                                    { label: 'UI/UX Design', val: 'w-[45%]', color: 'bg-purple-500' }
                                ].map((bar, i) => (
                                    <div key={i}>
                                        <div className="mb-1 flex justify-between text-[10px] font-bold">
                                            <span>{bar.label}</span>
                                            <span>{bar.val.replace('w-[', '').replace('%]', '')}%</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-neutral-800">
                                            <div className={`h-full rounded-full ${bar.color} ${bar.val}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 border-t border-cool-steel-800 pt-4">
                                <p className="text-[10px] text-cool-steel-400 italic">"UVic Hacks provided more actionable talent data in one weekend than our LinkedIn ads did in a month." — Previous Sponsor</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-6xl px-4 py-20 text-center">
                <h2 className="text-3xl font-bold font-display">Ready to see the data?</h2>
                <Link
                    href="mailto:exec@uvichacks.com"
                    className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-900/40 hover:bg-blue-500 transition-all"
                >
                    Contact Sponsorship Team
                </Link>
            </section>
        </main>
    )
}