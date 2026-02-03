"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = "https://strudel-hackathon.onrender.com";

function ProjectContent() {
    const params = useParams();
    const { token, user } = useAuth();
    const submissionId = params?.id; // Correctly grabs '3' from the URL

    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: "", msg: "" });
    const [scores, setScores] = useState({
        innovation: 5, technical: 5, impact: 5, design: 5, presentation: 5, comments: ""
    });

    useEffect(() => {
        if (!submissionId) return;

        async function fetchProject() {
            try {
                // Using your specific details route
                const res = await fetch(`${API_BASE}/api/project-details/${submissionId}`);
                const data = await res.json();

                if (data.success && data.submission) {
                    setProject(data.submission);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [submissionId]);

    const submitScore = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return setStatus({ type: "error", msg: "Login required." });

        try {
            // Using your specific scoring route
            const res = await fetch(`${API_BASE}/api/score-project/${submissionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...scores,
                    role: user?.is_admin ? "judge" : "peer"
                })
            });
            const data = await res.json();
            if (data.success) setStatus({ type: "success", msg: "Score submitted!" });
            else throw new Error(data.error);
        } catch (err: any) {
            setStatus({ type: "error", msg: err.message });
        }
    };

    if (loading) return <div className="p-20 text-center text-xs font-bold text-neutral-500 animate-pulse">LOADING_DATA...</div>;
    if (!project) return <div className="p-20 text-center text-red-500 font-bold">PROJECT NOT FOUND (ID: {submissionId})</div>;

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-8">
                <div className="border-l-4 border-gold-500 pl-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Project Briefing</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic mt-2">{project.title}</h1>
                    <p className="text-neutral-400 text-sm mt-2">By <span className="text-white font-bold uppercase">{project.submitter_name}</span></p>
                </div>

                <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
                    <p className="text-lg text-cool-steel-100 italic leading-relaxed">"{project.description}"</p>
                    <div className="mt-8 flex gap-4 border-t border-neutral-800 pt-8">
                        <a href={project.github_url} target="_blank" className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 transition">View Source</a>
                        {project.team_members && <div className="text-[10px] font-bold text-neutral-500 self-center uppercase tracking-widest">Team: {project.team_members}</div>}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="sticky top-28 bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gold-500 mb-8 italic">Evaluation Matrix</h3>
                    <form onSubmit={submitScore} className="space-y-6">
                        {['innovation', 'technical', 'impact', 'design', 'presentation'].map(key => (
                            <div key={key}>
                                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                                    <span className="text-neutral-500">{key}</span>
                                    <span className="text-gold-500">{(scores as any)[key]}/10</span>
                                </div>
                                <input type="range" min="1" max="10" value={(scores as any)[key]}
                                    onChange={e => setScores({ ...scores, [key]: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-neutral-800 appearance-none accent-gold-500 cursor-pointer" />
                            </div>
                        ))}
                        <textarea placeholder="Constructive feedback..." value={scores.comments} onChange={e => setScores({ ...scores, comments: e.target.value })}
                            className="w-full bg-neutral-950 border border-neutral-800 p-4 text-sm rounded-xl text-white outline-none focus:border-blue-500 h-24 resize-none" />

                        <button type="submit" className="w-full bg-blue-600 py-4 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-500 transition">Submit Evaluation</button>
                        {status.msg && <p className={`text-center text-[10px] font-bold uppercase mt-4 ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{status.msg}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ProjectPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900/90 backdrop-blur-md"><Navbar /></header>
            <Suspense fallback={null}><ProjectContent /></Suspense>
        </main>
    );
}