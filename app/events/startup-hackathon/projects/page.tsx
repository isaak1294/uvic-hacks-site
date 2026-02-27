"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

export default function StartupProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scoringOpen, setScoringOpen] = useState(false);

    const isJudge = user?.role === "judge";

    useEffect(() => {
        fetch(`${API_BASE}/api/admin/settings`)
            .then(r => r.json())
            .then(data => setScoringOpen(data.scoringOpen ?? false))
            .catch(console.error);

        fetch(`${API_BASE}/api/submissions/3`)
            .then(r => r.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || "Failed to load projects");
                setProjects(data.projects);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const canScore = isJudge || scoringOpen;

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
                <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-1">Startup Hackathon · Feb 27–28</p>
                        <h1 className="text-3xl font-display font-bold tracking-tight text-white">
                            Submitted <span className="text-blue-400">Projects</span>
                        </h1>
                        <p className="mt-2 text-sm text-cool-steel-400">
                            {!loading && !error && `${projects.length} project${projects.length !== 1 ? "s" : ""} submitted.`}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/events/startup-hackathon/submit"
                            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60">
                            Submit Project
                        </Link>
                        <Link href="/events/startup-hackathon"
                            className="rounded-full border border-cool-steel-700 px-5 py-2 text-sm font-semibold text-cool-steel-300 hover:border-cool-steel-500 transition">
                            Event Page
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-sm text-cool-steel-500 animate-pulse">Loading projects...</div>
                ) : error ? (
                    <div className="rounded-sm bg-red-500/10 border border-red-500/20 p-6 text-center text-red-400 text-sm">{error}</div>
                ) : projects.length === 0 ? (
                    <div className="py-20 text-center border-2 border-dashed border-neutral-800 rounded-sm">
                        <p className="text-sm text-cool-steel-500">No projects submitted yet.</p>
                        <Link href="/events/startup-hackathon/submit"
                            className="mt-4 inline-block text-xs text-blue-400 hover:underline underline-offset-2">
                            Be the first to submit →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <Link key={project.id} href={`/events/startup-hackathon/projects/${project.id}`}
                                className="group flex flex-col overflow-hidden rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 border border-cool-steel-800 hover:border-blue-500/40 transition">
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-blue-400 border border-blue-500/20">
                                            Project
                                        </span>
                                        <span className="text-[10px] text-cool-steel-500 font-mono">
                                            {new Date(project.submitted_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-display font-semibold text-cool-steel-50 group-hover:text-blue-300 transition">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-cool-steel-400">
                                        by <span className="text-cool-steel-200">{project.submitter_name}</span>
                                        {project.team_members && ` · ${project.team_members}`}
                                    </p>

                                    <p className="mt-3 flex-1 text-sm text-cool-steel-300 line-clamp-3 leading-relaxed">
                                        {project.description || <span className="italic">No description provided.</span>}
                                    </p>

                                    <span className="mt-4 text-xs font-semibold text-blue-400 group-hover:underline underline-offset-2">
                                        {canScore ? "View & Score →" : "View →"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <footer className="border-t border-cool-steel-800 py-6 text-center text-xs text-cool-steel-500">
                © {new Date().getFullYear()} UVic Hacks. Built by students, for students.
            </footer>
        </main>
    );
}
