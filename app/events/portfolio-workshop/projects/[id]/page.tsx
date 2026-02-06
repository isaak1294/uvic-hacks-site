"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

function ProjectContent() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDetails() {
            try {
                // Using your project-details route
                const res = await fetch(`${API_BASE}/api/submissions/details/${id}`);
                const data = await res.json();
                if (data.success) setProject(data.submission);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 animate-pulse">Loading_Project_Assets</div>
        </div>
    );

    if (!project) return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950">
            <div className="text-center">
                <h1 className="text-white font-bold uppercase tracking-widest">Project Not Found</h1>
                <p className="text-neutral-600 text-xs mt-2 uppercase tracking-tighter italic">Error_Code: 404_NULL_REFERENCE</p>
            </div>
        </div>
    );

    return (
        <div className="bg-neutral-950 min-h-screen text-cool-steel-50 pb-24">
            {/* Header / Intro */}
            <header className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-2xl">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-4">Submission // {project.id}</p>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase italic leading-none text-white">
                            {project.title}
                        </h1>
                        <p className="mt-8 text-xl text-neutral-400 italic font-light leading-relaxed">
                            "{project.description}"
                        </p>
                    </div>
                    <div className="text-right pb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-1">Architect</p>
                        <p className="text-2xl font-bold uppercase italic text-white">{project.submitter_name}</p>
                    </div>
                </div>
            </header>

            {/* Immersive Live Preview */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
                <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 group shadow-2xl">
                    {/* Browser UI */}
                    <div className="h-10 bg-neutral-800 border-b border-neutral-700 flex items-center px-6 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700"></div>
                        </div>
                        <div className="mx-auto bg-neutral-950/50 px-4 py-1 rounded text-[10px] font-mono text-neutral-500 italic">
                            {project.github_url}
                        </div>
                        <a
                            href={project.github_url}
                            target="_blank"
                            className="text-[10px] font-black uppercase text-blue-500 hover:text-white transition"
                        >
                            Launch ↗
                        </a>
                    </div>

                    {/* The Preview Frame */}
                    <div className="aspect-video w-full bg-white relative overflow-hidden">
                        <iframe
                            src={project.github_url}
                            className="w-full h-full border-none shadow-inner"
                            title={project.title}
                        />
                    </div>
                </div>
            </section>

            {/* Scoring / Evaluation Section */}
            <section className="max-w-3xl mx-auto px-6">
                <div className="bg-neutral-900 border border-neutral-800 p-12 rounded-3xl relative overflow-hidden text-center">
                    {/* Locked Background Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                        <span className="text-9xl font-black uppercase italic tracking-tighter">LOCKED</span>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-neutral-700 bg-neutral-950 mb-6">
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-300 italic">Voting_Inactive</span>
                        </div>

                        <h3 className="text-3xl font-bold uppercase tracking-tight text-white mb-4">Evaluation Pipeline Paused</h3>
                        <p className="text-neutral-500 text-sm max-w-sm mx-auto leading-relaxed">
                            The scoring matrix for <span className="text-white font-bold italic">{project.title}</span> will become accessible once the submission deadline has passed.
                        </p>

                        <div className="mt-10 grid grid-cols-2 gap-4 max-w-xs mx-auto">
                            <div className="bg-neutral-950 p-4 border border-neutral-800 rounded-xl">
                                <span className="block text-xs font-black text-neutral-600 uppercase mb-1">Status</span>
                                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Pending</span>
                            </div>
                            <div className="bg-neutral-950 p-4 border border-neutral-800 rounded-xl">
                                <span className="block text-xs font-black text-neutral-600 uppercase mb-1">Open Date</span>
                                <span className="text-xs font-bold text-white uppercase tracking-widest italic">FEB 15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function ProjectDetailsPage() {
    return (
        <main>
            <Navbar />
            <Suspense fallback={null}>
                <ProjectContent />
            </Suspense>
        </main>
    );
}