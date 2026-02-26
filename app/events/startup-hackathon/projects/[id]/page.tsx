"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

const RUBRIC = [
    { key: "innovation", label: "Innovation", max: 5, description: "Originality and creativity of the idea" },
    { key: "technical", label: "Technical Execution", max: 5, description: "Code quality, architecture, and completeness" },
    { key: "impact", label: "Impact / Business Value", max: 10, description: "Real-world applicability and market potential" },
    { key: "design", label: "Design / UX", max: 10, description: "User experience, polish, and visual quality" },
    { key: "presentation", label: "Presentation", max: 20, description: "Clarity of pitch and ability to sell the vision" },
] as const;

type RubricKey = typeof RUBRIC[number]["key"];

interface BreakdownBarProps {
    value: number | null;
    max: number;
    color: string;
}

function BreakdownBar({ value, max, color }: BreakdownBarProps) {
    const pct = value != null ? (value / max) * 100 : 0;
    return (
        <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
        </div>
    );
}

interface ScoreSectionProps {
    title: string;
    subtitle: string;
    accentClass: string;
    borderClass: string;
    total: number | null;
    reviewCount: number;
    avgMap: Record<RubricKey, number | null>;
    barColors: Record<RubricKey, string>;
}

function ScoreSection({ title, subtitle, accentClass, borderClass, total, reviewCount, avgMap, barColors }: ScoreSectionProps) {
    return (
        <div className={`rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 border ${borderClass} overflow-hidden`}>
            <div className={`px-6 py-4 border-b ${borderClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${accentClass}`}>{title}</p>
                <p className="text-[10px] text-cool-steel-500 mt-0.5">{subtitle}</p>
            </div>
            <div className="px-6 py-4 text-center border-b border-neutral-800">
                <div className={`text-5xl font-bold tracking-tight ${total != null ? "text-white" : "text-cool-steel-600"}`}>
                    {total != null ? (total * 2).toFixed(1) : "—"}
                    <span className="text-xl text-cool-steel-600"> / 100</span>
                </div>
                <p className="mt-1 text-xs text-cool-steel-500">
                    {reviewCount} review{reviewCount !== 1 ? "s" : ""}
                </p>
            </div>
            <div className="px-6 py-4 space-y-4">
                {RUBRIC.map(({ key, label, max }) => (
                    <div key={key} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                            <span className="text-cool-steel-300">{label}</span>
                            <span className="text-cool-steel-100 font-semibold tabular-nums">
                                {avgMap[key] != null ? Number(avgMap[key]).toFixed(1) : "—"}
                                <span className="text-cool-steel-600 font-normal"> / {max}</span>
                            </span>
                        </div>
                        <BreakdownBar value={avgMap[key]} max={max} color={barColors[key]} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectContent() {
    const params = useParams();
    const submissionId = params?.id as string;
    const { user, token } = useAuth();

    const [project, setProject] = useState<any>(null);
    const [loadingProject, setLoadingProject] = useState(true);

    // Scoring state — floats allowed
    const [scores, setScores] = useState<Record<RubricKey, number>>({
        innovation: 0, technical: 0, impact: 0, design: 0, presentation: 0,
    });
    const [comments, setComments] = useState("");
    const [scoreLoading, setScoreLoading] = useState(false);
    const [scoreMessage, setScoreMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [hasExistingScore, setHasExistingScore] = useState(false);

    // Fetch project
    useEffect(() => {
        if (!submissionId) return;
        fetch(`${API_BASE}/api/submissions/details/${submissionId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success) setProject(data.submission);
            })
            .catch(console.error)
            .finally(() => setLoadingProject(false));
    }, [submissionId]);

    // Fetch user's existing score
    useEffect(() => {
        if (!submissionId || !token) return;
        fetch(`${API_BASE}/api/scores/my-score/${submissionId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(data => {
                if (data.score) {
                    setHasExistingScore(true);
                    setScores({
                        innovation: data.score.innovation_score ?? 0,
                        technical: data.score.technical_score ?? 0,
                        impact: data.score.impact_score ?? 0,
                        design: data.score.design_score ?? 0,
                        presentation: data.score.presentation_score ?? 0,
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

        const scoreRole = user?.role === "judge" ? "judge" : "peer";

        try {
            const res = await fetch(`${API_BASE}/api/scores/score-project/${submissionId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    innovation: scores.innovation,
                    technical: scores.technical,
                    impact: scores.impact,
                    design: scores.design,
                    presentation: scores.presentation,
                    comments,
                    role: scoreRole,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to submit score");

            setScoreMessage({ type: "success", text: hasExistingScore ? "Score updated." : "Score submitted." });
            setHasExistingScore(true);

            // Refresh project averages
            fetch(`${API_BASE}/api/submissions/details/${submissionId}`)
                .then(r => r.json())
                .then(data => { if (data.success) setProject(data.submission); });
        } catch (err: any) {
            setScoreMessage({ type: "error", text: err.message });
        } finally {
            setScoreLoading(false);
        }
    };

    if (loadingProject) {
        return <div className="p-20 text-center text-sm text-cool-steel-500 animate-pulse">Loading project...</div>;
    }
    if (!project) {
        return <div className="p-20 text-center text-red-400 text-sm">Project not found.</div>;
    }

    const isOwnProject = user && project.user_id === user.id;

    const barColors: Record<RubricKey, string> = {
        innovation: "bg-blue-500",
        technical: "bg-purple-500",
        impact: "bg-emerald-500",
        design: "bg-pink-500",
        presentation: "bg-amber-500",
    };

    const textColors: Record<RubricKey, string> = {
        innovation: "text-blue-400",
        technical: "text-purple-400",
        impact: "text-emerald-400",
        design: "text-pink-400",
        presentation: "text-amber-400",
    };

    const hexColors: Record<RubricKey, string> = {
        innovation: "#60a5fa",
        technical: "#c084fc",
        impact: "#34d399",
        design: "#f472b6",
        presentation: "#fbbf24",
    };

    const judgeAvgMap: Record<RubricKey, number | null> = {
        innovation: project.judge_avg_innovation,
        technical: project.judge_avg_technical,
        impact: project.judge_avg_impact,
        design: project.judge_avg_design,
        presentation: project.judge_avg_presentation,
    };

    const peerAvgMap: Record<RubricKey, number | null> = {
        innovation: project.peer_avg_innovation,
        technical: project.peer_avg_technical,
        impact: project.peer_avg_impact,
        design: project.peer_avg_design,
        presentation: project.peer_avg_presentation,
    };

    const totalScore = RUBRIC.reduce((sum, { key }) => sum + (scores[key] || 0), 0);

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
            {/* Back link */}
            <Link href="/events/startup-hackathon/projects"
                className="inline-flex items-center gap-1 text-xs text-cool-steel-500 hover:text-cool-steel-200 transition mb-8">
                ← Back to projects
            </Link>

            {/* Project header */}
            <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-2">Startup Hackathon · Feb 27–28</p>
                <h1 className="text-4xl font-display font-bold tracking-tight text-white">{project.title}</h1>
                <p className="mt-2 text-sm text-cool-steel-400">
                    by <span className="text-cool-steel-100">{project.submitter_name}</span>
                    {project.team_members && <span className="text-cool-steel-500"> · {project.team_members}</span>}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left: Description + Scoring form */}
                <div className="lg:col-span-7 space-y-6">

                    {/* Description card */}
                    <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cool-steel-400 mb-3">About</h2>
                        <p className="text-sm text-cool-steel-200 leading-relaxed">
                            {project.description || <span className="italic text-cool-steel-500">No description provided.</span>}
                        </p>
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-950 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-400 transition shadow-sm shadow-blue-900/60">
                                View Project →
                            </a>
                        )}
                    </div>

                    {/* Scoring form */}
                    {!user ? (
                        <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6 text-center">
                            <p className="text-sm text-cool-steel-400 mb-4">Sign in to score this project.</p>
                            <Link href={`/join/login?redirect=/events/startup-hackathon/projects/${submissionId}`}
                                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60">
                                Sign In
                            </Link>
                        </div>
                    ) : isOwnProject ? (
                        <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                            <p className="text-sm text-cool-steel-400">This is your project.</p>
                            <Link href="/events/startup-hackathon/submit"
                                className="mt-3 inline-block text-xs text-blue-400 hover:underline underline-offset-2">
                                Edit submission →
                            </Link>
                        </div>
                    ) : (
                        <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cool-steel-400">
                                    {hasExistingScore ? "Update Your Score" : "Score This Project"}
                                </h2>
                                <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border ${user.role === "judge" ? "text-amber-400 bg-amber-500/10 border-amber-500/20" : "text-cool-steel-400 bg-neutral-800 border-neutral-700"}`}>
                                    {user.role === "judge" ? "Judge" : "Peer"}
                                </span>
                            </div>

                            <form onSubmit={handleScoreSubmit} className="space-y-6">
                                {RUBRIC.map(({ key, label, max, description }) => (
                                    <div key={key}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <label className="text-xs font-semibold text-cool-steel-200">{label}</label>
                                                <p className="text-[10px] text-cool-steel-500">{description}</p>
                                            </div>
                                            <div className="flex items-baseline gap-0.5 shrink-0 ml-4">
                                                <span className={`text-2xl font-bold tabular-nums ${textColors[key]}`}>
                                                    {Number.isInteger(scores[key]) ? scores[key] : scores[key].toFixed(1)}
                                                </span>
                                                <span className="text-xs text-cool-steel-500">/{max}</span>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min={0}
                                            max={max}
                                            step={0.5}
                                            value={scores[key]}
                                            onChange={e => setScores(s => ({ ...s, [key]: parseFloat(e.target.value) }))}
                                            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, ${hexColors[key]} 0%, ${hexColors[key]} ${(scores[key] / max) * 100}%, rgb(38,38,38) ${(scores[key] / max) * 100}%, rgb(38,38,38) 100%)`,
                                                accentColor: hexColors[key],
                                            }}
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-xs font-medium text-cool-steel-300 mb-1">Comments (optional)</label>
                                    <textarea
                                        rows={3}
                                        value={comments}
                                        onChange={e => setComments(e.target.value)}
                                        className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition resize-none"
                                        placeholder="Feedback for the team..."
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <p className="text-xs text-cool-steel-500">
                                        Total: <span className="text-cool-steel-200 font-semibold">
                                            {totalScore % 1 === 0 ? totalScore : totalScore.toFixed(1)} / 50
                                        </span>
                                    </p>
                                    <button type="submit" disabled={scoreLoading}
                                        className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60 disabled:opacity-50">
                                        {scoreLoading ? "Saving..." : hasExistingScore ? "Update Score" : "Submit Score"}
                                    </button>
                                </div>

                                {scoreMessage && (
                                    <div className={`rounded-md p-3 text-sm text-center ${scoreMessage.type === "success" ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                                        {scoreMessage.text}
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </div>

                {/* Right: Judge Scores + People's Choice */}
                <div className="lg:col-span-5 space-y-6">
                    <ScoreSection
                        title="Judge Scores"
                        subtitle="Official scores from designated judges"
                        accentClass="text-amber-400"
                        borderClass="border-amber-500/20"
                        total={project.judge_avg_total != null ? Number(project.judge_avg_total) : null}
                        reviewCount={project.judge_review_count ?? 0}
                        avgMap={judgeAvgMap}
                        barColors={barColors}
                    />
                    <ScoreSection
                        title="People's Choice"
                        subtitle="Scores from fellow participants"
                        accentClass="text-blue-400"
                        borderClass="border-blue-500/20"
                        total={project.peer_avg_total != null ? Number(project.peer_avg_total) : null}
                        reviewCount={project.peer_review_count ?? 0}
                        avgMap={peerAvgMap}
                        barColors={barColors}
                    />
                </div>
            </div>
        </div>
    );
}

export default function ProjectPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>
            <Suspense fallback={<div className="p-20 text-center text-sm text-cool-steel-500">Loading...</div>}>
                <ProjectContent />
            </Suspense>
            <footer className="border-t border-cool-steel-800 py-6 text-center text-xs text-cool-steel-500">
                © {new Date().getFullYear()} UVic Hacks. Built by students, for students.
            </footer>
        </main>
    );
}
