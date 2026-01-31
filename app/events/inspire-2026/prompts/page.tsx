"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";

const PROMPTS = [
    {
        id: "id-gap",
        name: "The 'ID Gap' & The Cycle of Invisibility",
        tag: "Challenge 1",
        location: "Victoria, BC",
        problemOutline: "In Victoria, government-issued identification (ID) is the 'master key' to survival. Without it, an individual cannot open a bank account, rent an apartment, access many provincial health services, or even pick up a registered parcel. For the estimated 1,749+ unhoused individuals in Greater Victoria (as of the 2025 count), maintaining this 'key' is nearly impossible.",
        frictions: [
            { title: "The 'ID to get ID' Paradox", detail: "To replace a lost BC Services Card, you often need a Birth Certificate. To get a Birth Certificate, you often need photo ID. This circular logic creates a bureaucratic 'lock-out' that can take months of social worker intervention to resolve." },
            { title: "The 'Street Tax' on Paper", detail: "Vulnerable people face high rates of theft and weather damage. Carrying a social insurance card or a paper birth certificate in a backpack during a Victoria winter is a recipe for losing one's legal identity." },
            { title: "The Fixed Address Barrier", detail: "Many government applications still require a physical mailing address for delivery. While some local shelters offer mail-drop services, these systems are often overwhelmed and manual." },
            { title: "Digital Literacy vs. Digital Mandate", detail: "As BC moves toward 'Digital ID', those without reliable smartphones, data plans, or the ability to navigate complex 2FA are being further marginalized." }
        ],
        solutions: [
            "Digital document recovery & vaulting systems",
            "Shelter mail-drop management & notification tools",
            "Low-bandwidth/Offline-first Digital ID accessibility layers"
        ]
    },
    {
        id: "tourism",
        name: "Carrying Capacity & The Tourism Paradox",
        tag: "Challenge 2",
        location: "Inner Harbour / James Bay",
        problemOutline: "Victoria is a 'destination city' on a geographically constrained island tip. The 'Tourism Paradox' is that the very things that draw visitors—the quiet charm and pristine natural beauty—are threatened by the sheer volume of 300+ cruise ship calls and millions of annual visitors.",
        frictions: [
            { title: "Infrastructure Strain (The 'Peak' Problem)", detail: "On a 'four-ship day,' downtown population swells by 15,000+ people in a single afternoon. This creates intense pressure on transit, washrooms, and walkways, often 'crowding out' locals." },
            { title: "Environmental Impact vs. Economic Gain", detail: "While tourism generates $2B+ in GDP, it brings significant emissions and traffic, particularly in James Bay. Balancing economic necessity with local 'carrying capacity' is a critical struggle." },
            { title: "The 'Inner Harbour' Bottleneck", detail: "Most activity is concentrated in a 5-block radius, leading to 'Disneyfication' where businesses cater exclusively to transients while other municipalities see little benefit." },
            { title: "Data Silos", detail: "Cruise schedules, transit loads, and environmental sensors live in separate databases. There is no unified way for the city to 'pulse check' its health in real-time." }
        ],
        solutions: [
            "Unified real-time city health dashboards",
            "Tourist load-balancing & neighborhood discovery apps",
            "Transit-integrated pedestrian flow management"
        ]
    },
    {
        id: "housing",
        name: "The 'Locked-Out Ladder' — Housing Affordability",
        tag: "Challenge 3",
        location: "Greater Victoria",
        problemOutline: "In Victoria, the 'starter home + stable family life' path has become structurally unreachable for many young adults. By late 2025, the income needed to qualify for a mortgage hit ~$180,410. Meanwhile, average rents for 2-bedroom units hover around ~$2,120.",
        frictions: [
            { title: "The Down Payment Trap", detail: "Even if monthly payments are affordable on paper, accumulating a down payment while paying Victoria rents is a slow grind. Youth struggle to live comfortably while saving." },
            { title: "The Rent-to-Save Paradox", detail: "Rent increases shrink the very savings needed to exit renting. CMHC rent levels signal how difficult it is to save for a market entry while actively renting." },
            { title: "Information Asymmetry", detail: "Young buyers/renters lack clear, local, actionable numbers: realistic all-in monthly costs, neighborhood tradeoffs, commute costs, and future mortgage scenarios." }
        ],
        solutions: [
            "Hyper-local housing cost & savings visualizers",
            "Peer-to-peer equity or co-housing matching platforms",
            "Predictive rent-to-savings calculators for young professionals"
        ]
    },
    {
        id: "waste",
        name: "The 'Cost-of-Living Squeeze + Waste Paradox'",
        tag: "Challenge 4",
        location: "National / Local Context",
        problemOutline: "Families are squeezed from both ends: food prices rose ~4.7% in 2025, while ~46.5% of Canada's food is wasted. We face a paradox: people struggle to afford food while massive volumes of edible food never reach them.",
        frictions: [
            { title: "Price Volatility & Invisible Waste", detail: "Families cannot budget when essentials jump unpredictably. Simultaneously, stores/restaurants don't expose soon-to-expire inventory early enough for action." },
            { title: "Distribution & Fragmented Ecosystems", detail: "Pickup timing, transport, and coordination kill rescues. Food banks, shelters, and grocers operate in silos with no shared 'surplus map' or standardized handoff." },
            { title: "Trust & Liability Anxiety", detail: "Businesses fear legal risk; recipients worry about quality. This anxiety stops surplus food from moving even when the need is high." }
        ],
        solutions: [
            "Real-time 'surplus-to-needs' matching marketplace",
            "Routing & cold-chain optimizer for donation volunteers",
            "Meal-builders converting surplus ingredients into family-ready kits",
            "Standardized trust frameworks using QR handoffs for liability safety"
        ]
    }
];

export default function PromptsPage() {
    const [activeId, setActiveId] = useState(PROMPTS[0].id);
    const active = PROMPTS.find((p) => p.id === activeId)!;

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
                <div className="max-w-3xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                        Inspire Hackathon 2026
                    </p>
                    <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-6xl text-white">
                        Challenge <span className="text-gold-500">Prompts</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-sm text-cool-steel-100">
                        Choose a challenge to dive into. These prompts focus on critical
                        social friction points in Victoria and across Canada.
                    </p>
                </div>

                {/* Tab Selection */}
                <div className="mt-12 flex gap-4 overflow-x-auto pb-4 border-b border-cool-steel-800">
                    {PROMPTS.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActiveId(p.id)}
                            className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-semibold transition ${activeId === p.id
                                ? "bg-gold-500 text-black shadow-md shadow-gold-900/40"
                                : "bg-neutral-900 text-cool-steel-300 hover:bg-neutral-800"
                                }`}
                        >
                            {p.tag}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="mt-12 grid gap-12 md:grid-cols-[3fr,2fr] items-start">
                    {/* Detailed Problem & Friction */}
                    <div className="space-y-12">
                        <div>
                            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-300">
                                {active.location}
                            </span>
                            <h2 className="mt-4 text-3xl font-display font-bold tracking-tight md:text-4xl text-white">
                                {active.name}
                            </h2>
                            <div className="mt-6 border-l-2 border-gold-500 pl-6">
                                <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Problem Outline</p>
                                <p className="text-base leading-relaxed text-cool-steel-100 italic">
                                    {active.problemOutline}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-display font-semibold tracking-tight text-white">
                                Core Friction Points
                            </h3>
                            <div className="grid gap-8">
                                {active.frictions.map((f, i) => (
                                    <div key={i} className="group">
                                        <p className="font-semibold text-cool-steel-50 group-hover:text-gold-500 transition-colors">
                                            {f.title}
                                        </p>
                                        <p className="mt-2 text-sm text-cool-steel-300 leading-relaxed">
                                            {f.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Solution Prompts Sidebar */}
                    <aside className="sticky top-28">
                        <div className="rounded-2xl bg-neutral-900/80 p-8 shadow-sm border border-cool-steel-800">
                            <h3 className="text-xl font-display font-semibold text-white">
                                Solution Targets
                            </h3>
                            <p className="mt-1 text-xs text-cool-steel-400 font-medium">
                                WHAT THIS CHALLENGE WANTS TEAMS TO BUILD
                            </p>

                            <ul className="mt-8 space-y-5">
                                {active.solutions.map((s, i) => (
                                    <li key={i} className="flex items-start gap-4 text-sm text-cool-steel-200">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                                        {s}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </section>

            <footer className="border-t border-cool-steel-800 py-10 text-center text-xs text-cool-steel-500">
                <p>© 2026 UVic Hacks. Built by students, for students.</p>
            </footer>
        </main>
    );
}