"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

export default function HealthcareSubmitPage() {
    const [title, setTitle] = useState("");
    const [teamMembers, setTeamMembers] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [slidesUrl, setSlidesUrl] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch(`${API_BASE}/api/healthcare/submit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    team_members: teamMembers,
                    github_url: githubUrl,
                    slides_url: slidesUrl || undefined,
                    description: description || undefined,
                }),
            });

            const contentType = res.headers.get("content-type");
            const data = contentType?.includes("application/json") ? await res.json() : {};
            if (!res.ok) throw new Error(data.error || "Submission failed.");

            setMessage({
                type: "success",
                text: "Project submitted! Re-submit with the same GitHub URL any time to update it.",
            });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition";
    const labelClass = "block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5";

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col">
            <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16">
                <div className="w-full max-w-2xl">
                    <div className="mb-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-2">
                            UVic Hacks // Healthcare Hackathon · Mar 27–28
                        </p>
                        <h1 className="text-3xl font-bold italic uppercase tracking-tighter text-white">
                            Submit Your <span className="text-teal-500">Project</span>
                        </h1>
                        <p className="mt-2 text-sm text-neutral-400">
                            Deadline: <span className="text-neutral-200 font-semibold">Mar 28, 3:30 PM</span> — no exceptions.
                            Re-submitting with the same GitHub URL will update your entry.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 space-y-5">
                        <div>
                            <label className={labelClass}>
                                Project Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className={inputClass}
                                placeholder="e.g. CareLink — Patient-to-Nurse Alert System"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Team Members <span className="text-red-400">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                value={teamMembers}
                                onChange={e => setTeamMembers(e.target.value)}
                                className={inputClass}
                                placeholder="Alice Smith, Bob Jones"
                            />
                            <p className="mt-1 text-[10px] text-neutral-600 uppercase tracking-wide">
                                First and last name for each team member, comma-separated.
                            </p>
                        </div>

                        <div>
                            <label className={labelClass}>
                                GitHub Repo URL <span className="text-red-400">*</span>
                            </label>
                            <input
                                required
                                type="url"
                                value={githubUrl}
                                onChange={e => setGithubUrl(e.target.value)}
                                className={inputClass}
                                placeholder="https://github.com/your-team/project"
                            />
                            <p className="mt-1 text-[10px] text-neutral-600 uppercase tracking-wide">
                                Include your slides in the repo (e.g. as a PDF or link in the README).
                            </p>
                        </div>

                        <div>
                            <label className={labelClass}>Slides URL (optional)</label>
                            <input
                                type="url"
                                value={slidesUrl}
                                onChange={e => setSlidesUrl(e.target.value)}
                                className={inputClass}
                                placeholder="https://www.canva.com/... or Google Slides link"
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Description / Pitch (optional)</label>
                            <textarea
                                rows={4}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                className={`${inputClass} resize-none`}
                                placeholder="What problem does it solve? Who does it help? What did you build?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-teal-400 active:scale-95 disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit Project"}
                        </button>

                        {message && (
                            <div
                                className={`rounded-md p-3 text-sm text-center ${
                                    message.type === "success"
                                        ? "bg-teal-500/10 text-teal-300 border border-teal-500/20"
                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                }`}
                            >
                                {message.text}
                            </div>
                        )}
                    </form>

                    <div className="mt-5 flex justify-center gap-6 text-xs text-neutral-600">
                        <Link
                            href="/events/healthcare-hackathon/projects"
                            className="hover:text-neutral-300 underline underline-offset-2 transition"
                        >
                            View submitted projects →
                        </Link>
                        <Link
                            href="/events/healthcare-hackathon"
                            className="hover:text-neutral-300 transition"
                        >
                            ← Back to event page
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-neutral-800 py-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                UVic Hacks &bull; Healthcare Hackathon 2026
            </footer>
        </main>
    );
}
