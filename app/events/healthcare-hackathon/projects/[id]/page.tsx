"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

const RUBRIC = [
    {
        key: "clinical",
        label: "Clinical Relevance",
        max: 30,
        color: "bg-teal-500",
        textColor: "text-teal-400",
        hexColor: "#14b8a6",
        description: "Does it address a real, meaningful healthcare problem? Is the target population clearly defined?",
    },
    {
        key: "technical",
        label: "Technical Execution",
        max: 25,
        color: "bg-blue-500",
        textColor: "text-blue-400",
        hexColor: "#3b82f6",
        description: "Does it work? Is it well-built and demonstrable?",
    },
    {
        key: "feasibility",
        label: "Feasibility & Safety",
        max: 25,
        color: "bg-purple-500",
        textColor: "text-purple-400",
        hexColor: "#a855f7",
        description: "Could this realistically be deployed? Did the team consider risks, privacy, and patient safety?",
    },
    {
        key: "presentation",
        label: "Presentation",
        max: 20,
        color: "bg-amber-500",
        textColor: "text-amber-400",
        hexColor: "#f59e0b",
        description: "Can you clearly explain the problem, the solution, and what's next?",
    },
] as const;

type RubricKey = typeof RUBRIC[number]["key"];

function ScoreBar({ value, max, color }: { value: number | null; max: number; color: string }) {
    const pct = value != null ? (value / max) * 100 : 0;
    return (
        <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
        </div>
    );
}

function ProjectContent() {
    const params = useParams();
    const submissionId = params?.id as string;
    const { user, token } = useAuth();

    const [project, setProject] = useState<any>(null);
    const [loadingProject, setLoadingProject] = useState(true);
    const [scoresVisible, setScoresVisible] = useState(false);

    const isJudge = user?.role === "judge";

    const [scores, setScores] = useState<Record<RubricKey, number>>({
        clinical: 0, technical: 0, feasibility: 0, presentation: 0,
    });
    const [comments, setComments] = useState("");
    const [scoreLoading, setScoreLoading] = useState(false);
    const [scoreMessage, setScoreMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [hasExistingScore, setHasExistingScore] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/api/admin/settings`)
            .then(r => r.json())
            .then(data => setScoresVisible(data.scoresVisible ?? false))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (!submissionId) return;
        fetch(`${API_BASE}/api/healthcare/submissions/${submissionId}`)
            .then(r => r.json())
            .then(data => { if (data.success) setProject(data.submission); })
            .catch(console.error)
            .finally(() => setLoadingProject(false));
    }, [submissionId]);

    useEffect(() => {
        if (!submissionId || !token) return;
        fetch(`${API_BASE}/api/healthcare/my-score/${submissionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (data.score) {
                    setHasExistingScore(true);
                    setScores({
                        clinical: parseFloat(data.score.clinical_score) || 0,
                        technical: parseFloat(data.score.technical_score) || 0,
                        feasibility: parseFloat(data.score.feasibility_score) || 0,
                        presentation: parseFloat(data.score.presentation_score) || 0,
                    });
                    setComments(data.score.comments ?? "");
                }
            })
            .catch(console.error);
    }, [submissionId, token]);

    const handleScoreSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setScoreLoading(true);
        setScoreMessage(null);

        try {
            const res = await fetch(`${API_BASE}/api/healthcare/score/${submissionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    clinical: scores.clinical,
                    technical: scores.technical,
                    feasibility: scores.feasibility,
                    presentation: scores.presentation,
                    comments,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to submit score.");

            setScoreMessage({ type: "success", text: hasExistingScore ? "Score updated." : "Score submitted." });
            setHasExistingScore(true);

            // Refresh averages
            fetch(`${API_BASE}/api/healthcare/submissions/${submissionId}`)
                .then(r => r.json())
                .then(data => { if (data.success) setProject(data.submission); });
        } catch (err: any) {
            setScoreMessage({ type: "error", text: err.message });
        } finally {
            setScoreLoading(false);
        }
    };

    if (loadingProject) {
        return <div className="p-20 text-center text-sm text-neutral-500 animate-pulse">Loading project...</div>;
    }
    if (!project) {
        return <div className="p-20 text-center text-red-400 text-sm">Project not found.</div>;
    }

    const totalScore = RUBRIC.reduce((sum, { key }) => sum + (scores[key] || 0), 0);
    const canSeeScores = isJudge || scoresVisible;

    const avgMap: Record<RubricKey, number | null> = {
        clinical: project.avg_clinical,
        technical: project.avg_technical,
        feasibility: project.avg_feasibility,
        presentation: project.avg_presentation,
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
            <Link
                href="/events/healthcare-hackathon/projects"
                className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-200 transition mb-8"
            >
                ← Back to projects
            </Link>

            <div className="mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-500 mb-2">
                    Healthcare Hackathon · Mar 27–28
                </p>
                <h1 className="text-4xl font-bold italic uppercase tracking-tighter text-white">{project.title}</h1>
                <p className="mt-2 text-sm text-neutral-400">{project.team_members}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: project details + scoring form */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">About</h2>
                        <p className="text-sm text-neutral-200 leading-relaxed">
                            {project.description || (
                                <span className="italic text-neutral-500">No description provided.</span>
                            )}
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {project.github_url && (
                                <a
                                    href={project.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-200 hover:bg-neutral-700 transition"
                                >
                                    GitHub Repo →
                                </a>
                            )}
                            {project.slides_url && (
                                <a
                                    href={project.slides_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-teal-950 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-300 hover:bg-teal-900 transition"
                                >
                                    Slides →
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Scoring form — judges only */}
                    {!user ? (
                        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6 text-center">
                            <p className="text-sm text-neutral-400 mb-4">
                                Sign in as a judge to score this project.
                            </p>
                            <Link
                                href={`/join/login?redirect=/events/healthcare-hackathon/projects/${submissionId}`}
                                className="bg-white px-8 py-2.5 text-xs font-black uppercase tracking-widest text-black hover:bg-teal-400 transition"
                            >
                                Sign In
                            </Link>
                        </div>
                    ) : isJudge ? (
                        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                                    {hasExistingScore ? "Update Your Score" : "Score This Project"}
                                </h2>
                                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border text-amber-400 bg-amber-500/10 border-amber-500/20">
                                    Judge
                                </span>
                            </div>

                            <form onSubmit={handleScoreSubmit} className="space-y-6">
                                {RUBRIC.map(({ key, label, max, textColor, hexColor, description }) => (
                                    <div key={key}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-200">
                                                    {label}
                                                </label>
                                                <p className="text-[10px] text-neutral-500 mt-0.5">{description}</p>
                                            </div>
                                            <div className="flex items-baseline gap-0.5 shrink-0 ml-4">
                                                <span className={`text-2xl font-bold tabular-nums ${textColor}`}>
                                                    {Number(scores[key]) % 1 === 0
                                                        ? Number(scores[key])
                                                        : Number(scores[key]).toFixed(1)}
                                                </span>
                                                <span className="text-xs text-neutral-600">/{max}</span>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={max}
                                            step={0.5}
                                            value={scores[key]}
                                            onChange={e =>
                                                setScores(s => ({ ...s, [key]: parseFloat(e.target.value) }))
                                            }
                                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, ${hexColor} 0%, ${hexColor} ${(scores[key] / max) * 100}%, rgb(38,38,38) ${(scores[key] / max) * 100}%, rgb(38,38,38) 100%)`,
                                                accentColor: hexColor,
                                            }}
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">
                                        Comments (optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={comments}
                                        onChange={e => setComments(e.target.value)}
                                        className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 transition resize-none"
                                        placeholder="Feedback for the team..."
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <p className="text-xs text-neutral-500">
                                        Total:{" "}
                                        <span className="text-neutral-200 font-bold">
                                            {Number(totalScore) % 1 === 0
                                                ? Number(totalScore)
                                                : Number(totalScore).toFixed(1)}{" "}
                                            / 100
                                        </span>
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={scoreLoading}
                                        className="bg-white px-8 py-2.5 text-xs font-black uppercase tracking-widest text-black hover:bg-teal-400 transition disabled:opacity-50"
                                    >
                                        {scoreLoading
                                            ? "Saving..."
                                            : hasExistingScore
                                            ? "Update Score"
                                            : "Submit Score"}
                                    </button>
                                </div>

                                {scoreMessage && (
                                    <div
                                        className={`rounded-md p-3 text-sm text-center ${
                                            scoreMessage.type === "success"
                                                ? "bg-teal-500/10 text-teal-300 border border-teal-500/20"
                                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                                        }`}
                                    >
                                        {scoreMessage.text}
                                    </div>
                                )}
                            </form>
                        </div>
                    ) : (
                        // Logged in but not a judge — no scoring
                        null
                    )}
                </div>

                {/* Right: score summary (judges only, or when scoresVisible) */}
                <div className="lg:col-span-5">
                    {canSeeScores ? (
                        <div className="rounded-2xl bg-neutral-900/60 border border-teal-500/20 overflow-hidden">
                            <div className="px-6 py-4 border-b border-teal-500/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-teal-400">
                                    Judge Scores
                                </p>
                                <p className="text-[10px] text-neutral-600 mt-0.5">
                                    Official scores from designated judges
                                </p>
                            </div>
                            <div className="px-6 py-4 text-center border-b border-neutral-800">
                                <div className={`text-5xl font-bold tracking-tight ${project.avg_total != null ? "text-white" : "text-neutral-700"}`}>
                                    {project.avg_total != null ? Number(project.avg_total).toFixed(1) : "—"}
                                    <span className="text-xl text-neutral-600"> / 100</span>
                                </div>
                                <p className="mt-1 text-[10px] text-neutral-500">
                                    {project.review_count} review{project.review_count !== 1 ? "s" : ""}
                                </p>
                            </div>
                            <div className="px-6 py-4 space-y-4">
                                {RUBRIC.map(({ key, label, max, color }) => (
                                    <div key={key} className="space-y-1.5">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-neutral-400">{label}</span>
                                            <span className="text-neutral-100 font-bold tabular-nums">
                                                {avgMap[key] != null ? Number(avgMap[key]).toFixed(1) : "—"}
                                                <span className="text-neutral-600 font-normal"> / {max}</span>
                                            </span>
                                        </div>
                                        <ScoreBar value={avgMap[key]} max={max} color={color} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800 p-8 text-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-600 mb-2">
                                Scores
                            </p>
                            <p className="text-sm text-neutral-500">
                                Results will be revealed after judging.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function HealthcareProjectPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50">
            <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>
            <Suspense fallback={<div className="p-20 text-center text-sm text-neutral-500">Loading...</div>}>
                <ProjectContent />
            </Suspense>
            <footer className="border-t border-neutral-800 py-6 text-center text-[10px] font-black uppercase tracking-[0.5em] text-neutral-600">
                UVic Hacks &bull; Healthcare Hackathon 2026
            </footer>
        </main>
    );
}
