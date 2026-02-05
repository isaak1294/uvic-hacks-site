"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

function SubmissionsGallery() {
    const searchParams = useSearchParams();
    const eventId = searchParams.get("event_id") || "1";
    const eventName = searchParams.get("name") || "Inspire 2026";

    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/submissions/${eventId}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Failed to load gallery");

                setProjects(data.projects);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [eventId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent"></div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Loading Gallery...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
            <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">Project Showcase</p>
                <h1 className="mt-2 text-4xl font-display font-bold text-white tracking-tight md:text-5xl">
                    {eventName} <span className="text-gold-500">Submissions</span>
                </h1>
                <p className="mt-4 text-sm text-cool-steel-300 max-w-2xl">
                    Explore the projects built by students during the {eventName}.
                    From social impact tools to creative engineering, here is what the community shipped.
                </p>
            </div>

            {error ? (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-6 text-center text-red-400 text-sm">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="flex flex-col overflow-hidden rounded-sm bg-neutral-900/80 shadow-sm border border-cool-steel-800 transition hover:border-gold-500/50">
                                {/* Header Area - Now clickable to the project page */}
                                <Link href={`/events/inspire-2026/projects/${project.id}`} className="group cursor-pointer">
                                    <div className="p-6 border-b border-cool-steel-800/50">
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <span className="rounded-full bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-gold-500 border border-gold-500/20">
                                                Project
                                            </span>
                                            <span className="text-[10px] text-cool-steel-400 font-mono">
                                                ID_{project.id}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-display font-bold text-white leading-tight group-hover:text-gold-500 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="mt-2 text-xs text-cool-steel-400">
                                            Submitted by <span className="text-cool-steel-100 font-medium">{project.submitter_name}</span>
                                        </p>
                                    </div>
                                </Link>

                                {/* Body Area */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-sm text-cool-steel-200 line-clamp-4 leading-relaxed italic">
                                        "{project.description || "No description provided."}"
                                    </p>

                                    {project.team_members && (
                                        <div className="mt-4 pt-4 border-t border-cool-steel-800/50">
                                            <p className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest mb-1">Team Members</p>
                                            <p className="text-xs text-cool-steel-300 truncate">{project.team_members}</p>
                                        </div>
                                    )}

                                    <div className="mt-auto pt-6 flex flex-col gap-4">
                                        {/* Main Action: Grade Project */}
                                        <Link
                                            href={`/events/inspire-2026/projects/${project.id}`}
                                            className="w-full text-center py-2 bg-blue-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-blue-400 hover:text-black transition-all"
                                        >
                                            View Project
                                        </Link>

                                        <div className="flex items-center justify-between">
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[10px] font-bold text-neutral-400 hover:text-blue-300 transition flex items-center gap-2 uppercase tracking-tighter"
                                            >
                                                View Source
                                            </a>
                                            <span className="text-[10px] text-neutral-600 uppercase font-mono">
                                                {new Date(project.submitted_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-neutral-900 rounded-xl">
                            <p className="text-sm text-neutral-500 italic">No projects have been submitted for this event yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function SubmissionsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <Suspense fallback={<div className="p-12 text-center text-xs uppercase tracking-widest text-neutral-500">Initializing Gallery...</div>}>
                <SubmissionsGallery />
            </Suspense>

            <footer className="border-t border-cool-steel-800 py-10 text-center text-xs text-cool-steel-500">
                <p>© 2026 UVic Hacks. Community-driven engineering.</p>
            </footer>
        </main>
    );
}