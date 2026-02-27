"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const EVENT_ID = 3;

function SubmitForm() {
    const { user, token, loading: authLoading } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [description, setDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState("");

    const [loading, setLoading] = useState(false);
    const [prefilling, setPrefilling] = useState(true);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Pre-fill if they've already submitted
    useEffect(() => {
        if (!token) { setPrefilling(false); return; }

        fetch(`${API_BASE}/api/submissions/my-submission/${EVENT_ID}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (data.submission) {
                    setTitle(data.submission.title || "");
                    setLiveUrl(data.submission.live_url || "");
                    setGithubUrl(data.submission.github_url || "");
                    setDescription(data.submission.description || "");
                    setTeamMembers(data.submission.team_members || "");
                }
            })
            .catch(() => { })
            .finally(() => setPrefilling(false));
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch(`${API_BASE}/api/events/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    event_id: EVENT_ID,
                    title,
                    live_url: liveUrl,
                    github_url: githubUrl || undefined,
                    description,
                    team_members: teamMembers,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Submission failed");

            setMessage({ type: "success", text: "Project saved! You can update it any time before the deadline." });
        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || prefilling) {
        return <div className="text-cool-steel-500 text-sm animate-pulse">Loading...</div>;
    }

    if (!user) {
        return (
            <div className="w-full max-w-lg text-center rounded-sm bg-neutral-900/70 p-10 shadow-sm shadow-black/40">
                <p className="text-sm text-cool-steel-300 mb-6">You need to be logged in to submit a project.</p>
                <Link href={`/join/login?redirect=/events/startup-hackathon/submit`}
                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60">
                    Sign In
                </Link>
            </div>
        );
    }

    if (!user.registeredEventIds?.includes(EVENT_ID)) {
        return (
            <div className="w-full max-w-lg text-center rounded-sm bg-neutral-900/70 p-10 shadow-sm shadow-black/40">
                <p className="text-sm text-cool-steel-300 mb-6">You need to be registered for the Startup Hackathon to submit a project.</p>
                <Link href="/join/startup-hackathon"
                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60">
                    Register Now
                </Link>
            </div>
        );
    }

    const inputClass = "w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition";
    const labelClass = "block text-xs font-medium text-cool-steel-300 mb-1";

    return (
        <div className="w-full max-w-2xl">
            <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-2">Startup Hackathon · Feb 27–28</p>
                <h1 className="text-3xl font-display font-bold tracking-tight text-white">Submit Your Project</h1>
                <p className="mt-2 text-sm text-cool-steel-400">
                    You can update your submission any time before the deadline (Feb 28, 3:30 PM).
                </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40 space-y-5">
                <div>
                    <label className={labelClass}>Project Title</label>
                    <input required type="text" value={title} onChange={e => setTitle(e.target.value)}
                        className={inputClass} placeholder="e.g. QuickPitch AI" />
                </div>

                <div>
                    <label className={labelClass}>
                        Live / Demo URL <span className="text-red-400">*</span>
                    </label>
                    <input required type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)}
                        className={inputClass} placeholder="https://your-deployed-app.com" />
                    <p className="mt-1 text-xs text-cool-steel-500">Must be a live, deployed URL. Judges need to be able to visit and use your project.</p>
                </div>

                <div>
                    <label className={labelClass}>GitHub Repo URL</label>
                    <input type="url" value={githubUrl} onChange={e => setGithubUrl(e.target.value)}
                        className={inputClass} placeholder="https://github.com/you/project" />
                </div>

                <div>
                    <label className={labelClass}>Team Members (encouraged: first and last name)</label>
                    <input type="text" value={teamMembers} onChange={e => setTeamMembers(e.target.value)}
                        className={inputClass} placeholder="Alice Smith, Bob Jones, Charlie Lee" />
                    <p className="mt-1 text-xs text-cool-steel-500">Include full names so judges know who to credit.</p>
                </div>

                <div>
                    <label className={labelClass}>Description / Pitch</label>
                    <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)}
                        className={`${inputClass} resize-none`}
                        placeholder="What problem does it solve? What tech did you use?" />
                </div>

                <button type="submit" disabled={loading}
                    className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Submission"}
                </button>

                {message && (
                    <div className={`rounded-md p-3 text-sm text-center ${message.type === "success" ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {message.text}
                    </div>
                )}
            </form>

            <div className="mt-4 text-center">
                <Link href="/events/startup-hackathon/projects" className="text-xs text-cool-steel-500 hover:text-cool-steel-300 underline underline-offset-2">
                    View all submitted projects
                </Link>
            </div>
        </div>
    );
}

export default function SubmitPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>
            <section className="flex flex-1 items-center justify-center px-4 py-16">
                <Suspense fallback={<div className="text-cool-steel-500 text-sm">Loading...</div>}>
                    <SubmitForm />
                </Suspense>
            </section>
            <footer className="border-t border-cool-steel-800 py-6 text-center text-xs text-cool-steel-500">
                © {new Date().getFullYear()} UVic Hacks. Built by students, for students.
            </footer>
        </main>
    );
}
