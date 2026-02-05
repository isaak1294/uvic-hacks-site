"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

function ProjectContent() {
    const params = useParams();
    const submissionId = params?.id;

    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!submissionId) return;

        async function fetchProject() {
            try {
                const res = await fetch(`${API_BASE}/api/submissions/details/${submissionId}`);
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

    if (loading) return <div className="p-20 text-center text-xs font-bold text-neutral-500 animate-pulse uppercase tracking-widest">Generating Results...</div>;
    if (!project) return <div className="p-20 text-center text-red-500 font-bold uppercase">Archive Record Not Found</div>;

    // Defined Rubric Scales
    const categories = [
        { label: "Innovation", value: project.avg_innovation, max: 5, color: "bg-blue-500" },
        { label: "Technical Execution", value: project.avg_technical, max: 5, color: "bg-purple-500" },
        { label: "Social Impact", value: project.avg_impact, max: 10, color: "bg-green-500" },
        { label: "Design/UX", value: project.avg_design, max: 10, color: "bg-pink-500" },
        { label: "Presentation", value: project.avg_presentation, max: 20, color: "bg-gold-500" },
    ];

    return (
        <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left: Project Description */}
            <div className="lg:col-span-7 space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Hackathon Archive</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic mt-2">{project.title}</h1>
                    <p className="text-neutral-400 text-sm mt-2 font-medium uppercase tracking-tight">
                        Built by <span className="text-white">{project.submitter_name}</span>
                    </p>
                </div>

                <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800 backdrop-blur-sm">
                    <p className="text-lg text-cool-steel-100 italic leading-relaxed">"{project.description}"</p>

                    <div className="mt-8 flex flex-wrap gap-4 border-t border-neutral-800 pt-8">
                        <a href={project.github_url} target="_blank" rel="noreferrer" className="bg-white text-black px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gold-500 transition shadow-lg shadow-black/50">
                            Source Code
                        </a>
                        {project.team_members && (
                            <div className="px-6 py-3 rounded-full border border-neutral-800 text-[10px] font-bold text-neutral-400 uppercase self-center tracking-widest">
                                {project.team_members}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Final Performance Stats */}
            <div className="lg:col-span-5">
                <div className="sticky top-28 space-y-6">

                    {/* Overall Score Hero (Max 50 based on 5+5+10+10+20) */}
                    <div className="bg-neutral-900 border border-gold-500/30 p-8 rounded-2xl shadow-2xl text-center">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-2">Total Score</h3>
                        <div className="text-7xl font-black text-white tracking-tighter italic">
                            {project.avg_total_score * 2 || "0.0"}<span className="text-2xl text-neutral-700">/100</span>
                        </div>
                        <p className="mt-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                            {project.review_count} Verified Evaluations
                        </p>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-800 pb-4 italic text-center">Weight Distribution</h3>

                        <div className="space-y-6">
                            {categories.map((cat) => (
                                <div key={cat.label} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                        <span className="text-neutral-400">{cat.label}</span>
                                        <span className="text-white">{cat.value || 0}<span className="text-neutral-600">/{cat.max}</span></span>
                                    </div>
                                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${cat.color} transition-all duration-1000 ease-out`}
                                            // Percentage calculation: (value / max) * 100
                                            style={{ width: `${((cat.value || 0) / cat.max) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function ProjectPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900/90 backdrop-blur-md">
                <Navbar />
            </header>
            <Suspense fallback={null}>
                <ProjectContent />
            </Suspense>
        </main>
    );
}