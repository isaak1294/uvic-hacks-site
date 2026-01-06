import Head from "next/head"
import Link from "next/link"

const sponsorshipTiers = [
    {
        name: "Silver",
        price: "$300",
        description: "Perfect for local businesses looking to support the community and gain visibility among UVic's tech talent.",
        type: "general",
        features: [
            "Logo on website & digital posters",
            "Social media shoutout in description (IG/LinkedIn)",
            "Brand placement in event program",
            "Distribution of digital swag/coupons"
        ]
    },
    {
        name: "Gold",
        price: "$750",
        description: "Our recruitment-focused tier. Get direct access to the developers and designers building the future.",
        type: "workshop",
        features: [
            "All Silver benefits",
            "Access to participant resumes",
            "Instagram story post",
            "Dedicated booth/table in the main hall",
            "Seat on the official Judging Panel",
        ]
    },
    {
        name: "Diamond",
        price: "$1,500+",
        description: "Maximum impact. Take a leading role in the event and mentor the next generation of software engineers.",
        type: "sponsored",
        features: [
            "All Gold benefits",
            "5-minute Opening or Closing Keynote",
            "Large logo on main stage & t-shirts",
            "Sponsor a custom prize category",
            "Dedicated 'Partner Spotlight' post",
            <Link
                href="/sponsor/recruitment"
                className="text-blue-400"
            >
                Post-event recruitment analytics
            </Link>
        ]
    }
]

const tierConfigs = {
    workshop: {
        tagClass: "bg-gold-950/20 text-gold-500 border-gold-900/50",
        cardClass: "border-gold-900/40 bg-gold-950/5 shadow-[0_0_30px_rgba(234,179,8,0.05)]",
        accent: "text-gold-100",
        button: "bg-gold-600 hover:bg-gold-500 shadow-gold-900/40"
    },
    sponsored: {
        tagClass: "bg-blue-950/20 text-blue-400 border-blue-900/50",
        cardClass: "border-blue-900/30 bg-blue-950/5",
        accent: "text-blue-100",
        button: "bg-blue-600 hover:bg-blue-500 shadow-blue-900/40"
    },
    general: {
        tagClass: "bg-cool-steel-900/50 text-cool-steel-400 border-cool-steel-800",
        cardClass: "border-cool-steel-800 bg-neutral-900",
        accent: "text-white",
        button: "bg-cool-steel-700 hover:bg-cool-steel-600 shadow-cool-steel-900/40"
    }
}

export default function Sponsorship() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Head>
                <title>Sponsorship | UVic Hacks</title>
                <meta name="description" content="Partner with UVic Hacks and support the next generation of tech talent." />
            </Head>

            {/* Navbar (Same as Roadmap) */}
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
                            <Link href="/sponsor/recruitment" className="transition hover:text-blue-300">Recruitment</Link>
                            <Link href="/sponsor/meet-the-team" className="transition hover:text-blue-300">Team</Link>
                            <Link href="mailto:isaak@uvichacks.com" className="transition hover:text-blue-300">Contact</Link>
                        </div>
                        <Link
                            href="/sponsor"
                            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-500 hover:shadow-lg"
                        >
                            Become a Sponsor
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Header Section */}
            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
                    Partnership
                </p>
                <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-5xl">
                    Support the <span className="text-gold-500">Future</span> of Victoria Tech
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-cool-steel-200">
                    UVic Hacks brings together the brightest minds in engineering, design, and business.
                    Partner with us to build your brand, recruit top talent, and give back to the student ecosystem.
                </p>
            </section>

            {/* Tiers Grid */}
            <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {sponsorshipTiers.map((tier, index) => {
                        const config = tierConfigs[tier.type as keyof typeof tierConfigs];

                        return (
                            <div
                                key={index}
                                className={`flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${config.cardClass}`}
                            >
                                <div className="mb-6">
                                    <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${config.tagClass}`}>
                                        {tier.name}
                                    </span>
                                    <h3 className={`mt-4 text-3xl font-bold font-display tracking-tight ${config.accent}`}>
                                        {tier.price}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-cool-steel-300">
                                        {tier.description}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <p className="mb-4 text-xs font-bold uppercase tracking-wider text-cool-steel-500">What's included:</p>
                                    <ul className="space-y-3">
                                        {tier.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-cool-steel-200">
                                                <svg className="h-5 w-5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="mailto:isaak@uvichacks.com"
                                    className={`mt-10 block w-full rounded-xl py-3 text-center text-sm font-bold text-white transition-all duration-200 shadow-md ${config.button}`}
                                >
                                    Choose {tier.name}
                                </Link>
                            </div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 rounded-2xl border border-cool-steel-800 bg-neutral-900/50 p-8 text-center md:p-12">
                    <h2 className="text-2xl font-bold font-display">Need a custom package?</h2>
                    <p className="mt-2 text-cool-steel-300">We love working with companies to create unique challenges or hardware-specific sponsorships.</p>
                    <Link href="mailto:isaak@uvichacks.com" className="mt-6 inline-block text-blue-400 font-semibold hover:text-blue-300 underline underline-offset-4">
                        Let's build something custom &rarr;
                    </Link>
                </div>
            </section>
        </main>
    )
}