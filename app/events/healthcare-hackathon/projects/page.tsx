"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

export default function HealthcareProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isJudge = user?.role === "judge";

    useEffect(() => {
        fetch(`${API_BASE}/api/healthcare/submissions`)
            .then(r => r.json())
            .then(data => {
                if (!data.success) throw new Error(data.error || "Failed to load projects");
                setProjects(data.projects);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50">
            <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
                <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-1">
                            UVic Hacks // Healthcare Hackathon · Mar 27–28
                        </p>
                        <h1 className="text-3xl font-bold italic uppercase tracking-tighter text-white">
                            Submitted <span className="text-teal-500">Projects</span>
                        </h1>
                        <p className="mt-2 text-sm text-neutral-400">
                            {!loading && !error && `${projects.length} project${projects.length !== 1 ? "s" : ""} submitted.`}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/events/healthcare-hackathon/submit"
                            className="bg-white px-6 py-2.5 text-xs font-black uppercase tracking-widest text-black transition hover:bg-teal-400 active:scale-95"
                        >
                            Submit Project
                        </Link>
                        <Link
                            href="/events/healthcare-hackathon"
                            className="border border-neutral-700 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:border-neutral-500 transition"
                        >
                            Event Page
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-sm text-neutral-500 animate-pulse">
                        Loading projects...
                    </div>
                ) : error ? (
                    <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 text-center text-red-400 text-sm">
                        {error}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="py-24 text-center border-2 border-dashed border-neutral-800 rounded-2xl">
                        <p className="text-sm text-neutral-500 mb-4">No projects submitted yet.</p>
                        <Link
                            href="/events/healthcare-hackathon/submit"
                            className="text-xs text-teal-400 hover:underline underline-offset-2"
                        >
                            Be the first to submit →
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map(project => (
                            <Link
                                key={project.id}
                                href={`/events/healthcare-hackathon/projects/${project.id}`}
                                className="group flex flex-col overflow-hidden rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-teal-500/40 transition"
                            >
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="rounded-full bg-teal-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-400 border border-teal-500/20">
                                            Healthcare
                                        </span>
                                        <span className="text-[10px] text-neutral-600 font-mono">
                                            {new Date(project.submitted_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold italic uppercase tracking-tighter text-white group-hover:text-teal-400 transition">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-neutral-500">
                                        {project.team_members}
                                    </p>

                                    {project.description && (
                                        <p className="mt-3 flex-1 text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                                            {project.description}
                                        </p>
                                    )}

                                    <span className="mt-4 text-xs font-bold uppercase tracking-widest text-teal-500 group-hover:underline underline-offset-2">
                                        {isJudge ? "View & Score →" : "View →"}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <footer className="border-t border-neutral-800 py-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                UVic Hacks &bull; Healthcare Hackathon 2026
            </footer>
        </main>
    );
}
