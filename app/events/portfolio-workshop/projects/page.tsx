"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const EVENT_ID = 2;

function ShowcaseContent() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const res = await fetch(`${API_BASE}/api/submissions/${EVENT_ID}`);
                const data = await res.json();
                if (data.success) {
                    const filtered = data.projects.filter((p: any) =>
                        !p.title.toLowerCase().includes("test")
                    );
                    setProjects(data.projects);
                }
            } catch (err) {
                console.error("Gallery fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchSubmissions();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-500 animate-pulse">
                Initializing_Visual_Index
            </div>
        </div>
    );

    return (
        <div className="bg-neutral-950 text-cool-steel-50">
            <header className="px-6 py-24 md:py-32 border-b border-neutral-900">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">UVic Hacks: Portfolio Awards</p>
                            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter uppercase italic leading-none">
                                Sites of the <span className="text-goldenrod-400">sem</span>
                            </h1>
                        </div>
                        <Link
                            href="/events/portfolio-workshop/submit"
                            className="inline-block bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gold-500 transition-colors active:scale-95"
                        >
                            Submit Your Site
                        </Link>
                    </div>
                </div>
            </header>

            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative">
                            {/* The Live Site Preview Frame */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-neutral-800 transition-all duration-700 group-hover:border-blue-500/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                {/* Browser UI Bar */}
                                <div className="absolute top-0 left-0 w-full h-7 bg-neutral-800/80 backdrop-blur-md border-b border-neutral-700 flex items-center px-4 gap-1.5 z-20">
                                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                                    <div className="ml-4 flex-1 h-4 bg-neutral-950/50 rounded-md flex items-center px-2">
                                        <span className="text-[8px] text-neutral-500 truncate font-mono">{project.github_url}</span>
                                    </div>
                                </div>

                                {/* Iframe Preview Container */}
                                <div className="w-full h-full pt-7 pointer-events-none scale-[0.35] origin-top-left" style={{ width: '285%', height: '285%' }}>
                                    <iframe
                                        src={project.github_url}
                                        title={project.title}
                                        className="w-full h-full border-none bg-white grayscale group-hover:grayscale-0 transition-all duration-1000"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Link Overlay (Makes entire card clickable to detail page) */}
                                <Link
                                    href={`/events/portfolio-workshop/projects/${project.id}`}
                                    className="absolute inset-0 z-30"
                                    aria-label={`View details for ${project.title}`}
                                />

                                {/* Interactive Inspect Tag */}
                                <div className="absolute bottom-6 right-6 z-40 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <div className="bg-white text-black text-[9px] font-black uppercase px-4 py-2 rounded-full tracking-[0.2em] shadow-xl">
                                        Inspect_Details
                                    </div>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="mt-8 flex justify-between items-end border-b border-neutral-900 pb-6">
                                <div>
                                    <h3 className="text-3xl font-bold uppercase italic tracking-tighter">
                                        {project.title}
                                    </h3>
                                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] mt-2">
                                        Architect // <span className="text-white">{project.submitter_name}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 hover:text-gold-500 transition-colors"
                                    >
                                        Live_Link ↗
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default function PortfolioShowcase() {
    return (
        <main className="min-h-screen bg-neutral-950">
            <Navbar />
            <Suspense fallback={null}>
                <ShowcaseContent />
            </Suspense>
        </main>
    );
}