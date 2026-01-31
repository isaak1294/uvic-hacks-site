"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

function SubmissionForm() {
    const { token, user, loading: authLoading } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();

    const eventId = searchParams.get("event_id") || "1";
    const eventName = searchParams.get("name") || "Inspire Hackthon";

    // New State Fields
    const [title, setTitle] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [description, setDescription] = useState("");
    const [teamMembers, setTeamMembers] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!token) {
            setMessage({ type: "error", text: "Session expired. Please log in again." });
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/events/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    event_id: parseInt(eventId),
                    title,
                    github_url: githubUrl,
                    description,
                    team_members: teamMembers
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Submission failed");

            setMessage({ type: "success", text: "Project saved successfully!" });

            // Short delay to show success state before redirect
            setTimeout(() => router.push("/profile"), 1500);

        } catch (err: any) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div className="text-neutral-500 animate-pulse text-xs uppercase tracking-widest">Checking Authorization...</div>;

    if (!user) {
        return (
            <div className="text-center p-12 bg-neutral-900/50 rounded-2xl border border-neutral-800">
                <p className="text-sm text-cool-steel-300 mb-6 font-medium">Authentication required to access submissions.</p>
                <button onClick={() => router.push("/join/login")} className="bg-blue-600 px-10 py-3 rounded-full text-xs font-bold uppercase text-white hover:bg-blue-500 transition">Sign In</button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl">
            <div className="mb-8 border-l-2 border-gold-500 pl-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-2">Final Submission</p>
                <h1 className="text-4xl font-bold tracking-tighter text-white uppercase italic">{eventName}</h1>
            </div>

            <form onSubmit={handleProjectSubmit} className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800 shadow-2xl backdrop-blur-sm space-y-5">

                {/* Project Title */}
                <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block mb-2">Project Title</label>
                    <input
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Eco-Track Victoria"
                        className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm rounded-lg outline-none focus:border-blue-500 transition text-white"
                    />
                </div>

                {/* GitHub URL */}
                <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block mb-2">GitHub Repository</label>
                    <input
                        required
                        type="url"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/username/project"
                        className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm rounded-lg outline-none focus:border-blue-500 transition text-white"
                    />
                </div>

                {/* Team Members */}
                <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block mb-2">Team Members (Optional)</label>
                    <input
                        type="text"
                        value={teamMembers}
                        onChange={(e) => setTeamMembers(e.target.value)}
                        placeholder="Names of your collaborators..."
                        className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm rounded-lg outline-none focus:border-blue-500 transition text-white"
                    />
                </div>

                {/* Project Description */}
                <div>
                    <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block mb-2">Short Pitch / Description</label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What problem does this solve and what tech did you use?"
                        className="w-full bg-neutral-950 border border-neutral-800 px-4 py-3 text-sm rounded-lg outline-none focus:border-blue-500 transition text-white resize-none"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition shadow-lg shadow-blue-900/20 disabled:opacity-50 active:scale-95"
                    >
                        {loading ? "Transmitting Data..." : "Finalize Submission"}
                    </button>
                    <p className="mt-4 text-[10px] text-center text-cool-steel-500 uppercase tracking-tighter">
                        You can update your submission at any time until the event deadline.
                    </p>
                </div>

                {message && (
                    <div className={`p-4 rounded-lg text-center text-xs font-bold uppercase tracking-tight animate-in fade-in zoom-in-95 duration-300 ${message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
}

export default function SubmitPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col font-sans">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16">
                <Suspense fallback={<div className="text-neutral-500 uppercase tracking-widest text-[10px]">Initializing Briefing...</div>}>
                    <SubmissionForm />
                </Suspense>
            </section>

            <footer className="border-t border-cool-steel-800 py-6 text-center text-xs text-cool-steel-500">
                <p>© 2026 UVic Hacks. Code. Learn. Compete.</p>
            </footer>
        </main>
    );
}