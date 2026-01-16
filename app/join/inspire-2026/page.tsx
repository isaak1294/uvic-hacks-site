"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const INSPIRE_EVENT_ID = 1;

export default function InspireRegisterPage() {
    const [user, setUser] = useState<{ id: number; name: string; email?: string } | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vNumber, setVNumber] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState<File | null>(null);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setResume(e.target.files[0]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setError(null);
        setLoading(true);

        try {
            if (user) {
                const res = await fetch(`${API_BASE}/api/events/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id, eventId: INSPIRE_EVENT_ID }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to register");
            } else {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("password", password);
                // Fix for unique constraint: send null if empty
                formData.append("vnumber", vNumber.trim() || "");
                formData.append("bio", bio);
                if (resume) formData.append("resume", resume);

                const res = await fetch(`${API_BASE}/api/account-reg`, {
                    method: "POST",
                    body: formData,
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to create account");

                const newUser = { id: data.userId, name };
                localStorage.setItem("user", JSON.stringify(newUser));
                setUser(newUser);
            }
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col font-sans">
            {/* Navbar matched to main site */}
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition">
                            <span className="text-blue-500">UVic</span>{" "}
                            <span className="text-gold-500">Hacks</span>
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-6 text-xs font-medium">
                        <Link href="/" className="text-cool-steel-300 transition hover:text-blue-300">
                            Back to home
                        </Link>
                        <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60">
                            Inspire Registration
                        </span>
                    </div>
                </nav>
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16 md:px-6">
                <div className="w-full max-w-xl">
                    <div className="mb-8 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 mb-3">
                            Hackathon Event
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Inspire <span className="text-gold-500">2026</span>
                        </h1>
                    </div>

                    <div className="rounded-xl border border-cool-steel-800 bg-neutral-900/80 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                        {submitted ? (
                            <div className="text-center py-10">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Registration Complete!</h3>
                                <p className="text-cool-steel-300 mb-8 text-sm">You are now registered for the Inspire Hackathon.</p>
                                <Link href="/profile" className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-500">
                                    View My Profile
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!user ? (
                                    <>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-400 mb-1.5">Full Name</label>
                                            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm text-cool-steel-50 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Jane Doe" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-400 mb-1.5">Email</label>
                                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm text-cool-steel-50 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="you@uvic.ca" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-400 mb-1.5">V-Number</label>
                                                <input type="text" value={vNumber} onChange={(e) => setVNumber(e.target.value)} className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm text-cool-steel-50 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="V00xxxxxx" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-400 mb-1.5">Password</label>
                                            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm text-cool-steel-50 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="••••••••" />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-400 mb-1.5">Bio</label>
                                            <textarea rows={2} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm text-cool-steel-50 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="Tell us about your interests..." />
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-400 mb-1.5">Resume (Optional PDF)</label>
                                            <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full text-[11px] text-cool-steel-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-cool-steel-800 file:text-cool-steel-100 hover:file:bg-cool-steel-700 cursor-pointer" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 mb-6">
                                        <p className="text-sm text-blue-300">Signed in as <span className="font-bold text-white">{user.name}</span></p>
                                        <p className="text-xs text-blue-300/60 mt-0.5">Ready to confirm your event spot.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-full bg-blue-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50"
                                >
                                    {loading ? "Registering..." : user ? "Confirm Spot" : "Join & Register"}
                                </button>

                                {error && (
                                    <p className="mt-4 text-center text-xs font-medium text-red-400">
                                        {error}
                                    </p>
                                )}
                            </form>
                        )}
                    </div>
                    <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-cool-steel-500">
                        Official UVic Hacks Event • 2026
                    </p>
                </div>
            </section>
        </main>
    );
}