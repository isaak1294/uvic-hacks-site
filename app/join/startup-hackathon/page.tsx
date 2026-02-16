"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://strudel-hackathon.onrender.com";
const STARTUP_EVENT_ID = 3;

export default function StartupRegisterPage() {
    const router = useRouter();
    const { user, token, login } = useAuth();

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vNumber, setVNumber] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [agreed, setAgreed] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setResume(e.target.files[0]);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let currentToken = token;
            let currentUser = user;

            // --- STEP 1: ACCOUNT CREATION (If not logged in) ---
            if (!currentUser) {
                if (!agreed) throw new Error("You must agree to the terms to register.");
                if (!vNumber.trim()) throw new Error("V Number is required.");

                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("vnumber", vNumber.trim());
                formData.append("bio", bio);
                formData.append("agreed", String(agreed));
                if (resume) formData.append("resume", resume);

                const regRes = await fetch(`${API_BASE}/api/account-reg`, {
                    method: "POST",
                    body: formData,
                });

                const regData = await regRes.json();
                if (!regRes.ok) throw new Error(regData.error || "Failed to create account");

                currentToken = regData.token;
                currentUser = regData.user;
                login(regData.token, regData.user);
            }

            // --- STEP 2: EVENT REGISTRATION ---
            const eventRes = await fetch(`${API_BASE}/api/events/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({ userId: currentUser.id, eventId: STARTUP_EVENT_ID }),
            });

            const eventData = await eventRes.json();
            if (!eventRes.ok) throw new Error(eventData.error || "Account created, but failed to join event.");

            const finalUser = {
                ...currentUser,
                registeredEventIds: eventData.registeredEventIds || [...(currentUser.registeredEventIds || []), STARTUP_EVENT_ID]
            };

            login(currentToken!, finalUser);
            setSubmitted(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col font-sans">
            <header className="sticky top-0 z-20 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
                <Navbar />
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16">
                <div className="w-full max-w-xl">
                    <div className="mb-8 border-l-2 border-emerald-500 pl-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2">Venture Onboarding</p>
                        <h1 className="text-4xl font-bold tracking-tighter text-white uppercase italic">Startup <span className="text-emerald-500">Hackathon</span></h1>
                    </div>

                    <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800 shadow-2xl backdrop-blur-sm">
                        {submitted ? (
                            <div className="text-center py-10">
                                <div className="text-emerald-500 text-5xl mb-4 font-black animate-bounce">✓</div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest italic">Registered.</h3>
                                <p className="text-neutral-500 text-xs mb-6 tracking-tight">You have been registered.</p>
                                <Link href="/profile" className="mt-6 inline-block bg-white text-black px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-emerald-500 transition active:scale-95 shadow-lg shadow-emerald-500/10">View_Profile</Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {!user && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Full Name</label>
                                                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-emerald-500 transition text-white" placeholder="Jane Doe" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Email</label>
                                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-emerald-500 transition text-white" placeholder="jane@uvic.ca" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">V Number</label>
                                                <input required type="text" value={vNumber} onChange={e => setVNumber(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-emerald-500 transition text-white" placeholder="V00xxxxxx" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Founder Password</label>
                                                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-emerald-500 transition text-white" placeholder="••••••••" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Startup Bio / Skills</label>
                                            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-emerald-500 transition text-white" placeholder="Pitch yourself. What are you building?" />
                                        </div>

                                        <div className="pt-2">
                                            <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block mb-2">Pitch Deck / CV (Optional)</label>
                                            <label className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-xl cursor-pointer transition-all ${resume ? 'border-emerald-500 bg-emerald-500/5' : 'border-neutral-800 hover:border-emerald-500/50'}`}>
                                                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter">{resume ? resume.name : 'Click to upload .PDF'}</p>
                                                <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                                            </label>
                                        </div>

                                        <div className="py-4 border-t border-neutral-800/50 mt-4">
                                            <div className="flex items-center justify-between gap-6">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[11px] font-bold uppercase text-white tracking-widest">
                                                        Privacy Agreement
                                                    </label>
                                                    <p className="text-[10px] text-neutral-500 leading-relaxed max-w-[340px] italic">
                                                        I agree to share my account data with potential employers.
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={agreed}
                                                    onClick={() => setAgreed(!agreed)}
                                                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${agreed ? 'bg-emerald-500' : 'bg-neutral-800'
                                                        }`}
                                                >
                                                    <span
                                                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${agreed ? 'translate-x-5' : 'translate-x-0'
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {user && (
                                    <div className="bg-emerald-600/5 border border-emerald-500/20 p-6 rounded-xl text-center">
                                        <p className="text-sm text-emerald-300">Ready to join, <strong>{user.name}</strong>?</p>
                                        <p className="text-[10px] text-neutral-600 uppercase mt-1">Founders are already logged in.</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-emerald-600 py-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:bg-emerald-500 transition shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? "Transmitting..." : "Initialize Registration"}
                                </button>

                                {error && <p className="text-center text-[10px] text-red-400 font-black uppercase tracking-widest bg-red-400/5 py-2 border border-red-400/10 rounded">{error}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <footer className="py-10 border-t border-neutral-900 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.5em]">
                Move Fast. Build Things.
            </footer>
        </main>
    );
}