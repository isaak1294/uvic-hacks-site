"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const EVENT_ID = 2;

export default function PortfolioSubmitPage() {
    const { token, user } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: "", msg: "" });
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        github_url: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) return setStatus({ type: "error", msg: "Authentication required." });

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/events/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    event_id: EVENT_ID,
                    team_members: ""
                })
            });

            const data = await res.json();
            if (res.ok) {
                setStatus({ type: "success", msg: "Portfolio registered in the vault." });
                setTimeout(() => router.push("/events/portfolio-workshop/projects"), 1500);
            } else {
                throw new Error(data.error || "Submission failed.");
            }
        } catch (err: any) {
            setStatus({ type: "error", msg: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Navbar />

            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Side: Form */}
                    <div className="lg:col-span-8">
                        <div className="mb-16 border-l-2 border-blue-500 pl-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-2">Portfolio Submission Form</p>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic text-white leading-none">
                                Submit <span className="text-neutral-700">Work</span>
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-focus-within:text-blue-500 transition-colors">
                                    Portfolio Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. THE ART OF CODE"
                                    className="w-full bg-transparent border-b border-neutral-800 py-4 text-2xl font-light outline-none focus:border-white transition-colors uppercase italic text-white"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-focus-within:text-blue-500 transition-colors">
                                    Live URL (Vercel/GitHub Pages/Domain)
                                </label>
                                <input
                                    required
                                    type="url"
                                    placeholder="https://yourname.com"
                                    className="w-full bg-transparent border-b border-neutral-800 py-4 text-xl font-mono outline-none focus:border-white transition-colors text-blue-400"
                                    value={formData.github_url}
                                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                />
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500 group-focus-within:text-blue-500 transition-colors">
                                    Design Concept
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Explain your aesthetic and technical choices..."
                                    className="w-full bg-neutral-900/30 border border-neutral-800 p-6 text-sm outline-none focus:border-neutral-600 transition-colors resize-none italic text-cool-steel-100"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="pt-8">
                                <button
                                    disabled={loading}
                                    className="relative w-full md:w-auto bg-white text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold-500 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? "Transmitting..." : "Index Portfolio"}
                                </button>

                                {status.msg && (
                                    <p className={`mt-6 text-[10px] font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {status.msg}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Right Side: Judging Criteria Sidebar */}
                    <div className="lg:col-span-4 lg:pt-32">
                        <div className="sticky top-24 bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gold-500 mb-8 border-b border-neutral-800 pb-4 italic">
                                Judging_Criteria
                            </h3>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-white tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span> 01 // Design
                                    </h4>
                                    <p className="text-xs text-neutral-400 leading-relaxed uppercase tracking-tighter">
                                        Visual aesthetic, typography, and layout. We are looking for a unique digital identity.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-white tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-purple-500 rounded-full"></span> 02 // Creativity
                                    </h4>
                                    <p className="text-xs text-neutral-400 leading-relaxed uppercase tracking-tighter">
                                        Originality of concept and unique interactions. Surprise the judges with your craft.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-black uppercase text-white tracking-widest mb-2 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-green-500 rounded-full"></span> 03 // Usability
                                    </h4>
                                    <p className="text-xs text-neutral-400 leading-relaxed uppercase tracking-tighter">
                                        Mobile responsiveness and intuitive navigation. The experience must be seamless on all screens.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-neutral-800">
                                <p className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest leading-loose">
                                    // SUBMISSIONS CLOSE: FEB 15 <br />
                                    // PANEL REVIEW: FEB 16 <br />
                                    // WINNER ANNOUNCEMENT: FEB 17
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <footer className="py-20 text-center opacity-20">
                <p className="text-[10px] font-black tracking-[1em] uppercase">Built for Excellence</p>
            </footer>
        </main>
    );
}