"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const INSPIRE_EVENT_ID = 1;

export default function InspireRegisterPage() {
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
                login(regData.token, regData.user, true);
            }

            // --- STEP 2: EVENT REGISTRATION ---
            const eventRes = await fetch(`${API_BASE}/api/events/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({ userId: currentUser.id, eventId: INSPIRE_EVENT_ID }),
            });

            const eventData = await eventRes.json();
            if (!eventRes.ok) throw new Error(eventData.error || "Account created, but failed to join event.");

            const finalUser = {
                ...currentUser,
                registeredEventIds: eventData.registeredEventIds || [...(currentUser.registeredEventIds || []), INSPIRE_EVENT_ID]
            };

            login(currentToken!, finalUser, true);
            setSubmitted(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col font-sans">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-950/80 backdrop-blur-md">
                <Navbar />
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16">
                <div className="w-full max-w-xl">
                    <div className="mb-8 border-l-2 border-gold-500 pl-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-2">Event Enrollment</p>
                        <h1 className="text-4xl font-bold tracking-tighter text-white">Inspire <span className="text-blue-500">2026</span></h1>
                    </div>

                    <div className="bg-neutral-900/40 p-8 rounded-2xl border border-neutral-800 shadow-2xl backdrop-blur-sm">
                        {submitted ? (
                            <div className="text-center py-10">
                                <div className="text-gold-500 text-5xl mb-4 font-black">✓</div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">Registration_Confirmed</h3>
                                <Link href="/profile" className="mt-6 inline-block bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition">View_Profile</Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {!user && (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Name</label>
                                                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-blue-500 transition" placeholder="Jane Doe" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Email</label>
                                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-blue-500 transition" placeholder="jane@uvic.ca" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">V Number</label>
                                                <input required type="text" value={vNumber} onChange={e => setVNumber(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-blue-500 transition" placeholder="V00xxxxxx" />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Password</label>
                                                <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-blue-500 transition" placeholder="••••••••" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest">Short Bio</label>
                                            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} className="mt-1 w-full bg-neutral-950 border border-neutral-800 px-4 py-2 text-sm rounded-lg outline-none focus:border-blue-500 transition" placeholder="Tell us about your skills..." />
                                        </div>

                                        {/* Resume Upload Dropzone */}
                                        <div className="pt-2">
                                            <label className="text-[10px] font-bold uppercase text-neutral-500 tracking-widest block mb-2">Resume (Optional)</label>
                                            <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl cursor-pointer transition-all ${resume ? 'border-gold-500 bg-gold-500/5' : 'border-neutral-800 hover:border-blue-500/50'}`}>
                                                <p className="text-xs text-neutral-400 font-medium">{resume ? resume.name : 'Click to upload PDF'}</p>
                                                <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                                            </label>
                                        </div>

                                        {/* TERMS OF SERVICE CHECKBOX */}
                                        <div className="py-4 border-t border-neutral-800/50 mt-4">
                                            <div className="flex items-center justify-between gap-6">
                                                <div className="flex flex-col gap-1">
                                                    <label className="text-[11px] font-bold uppercase text-white tracking-widest">
                                                        Recruitment Opt-In
                                                    </label>
                                                    <p className="text-[10px] text-neutral-500 leading-relaxed max-w-[340px]">
                                                        I want my stats shared with recruiters for potential job opportunities.
                                                        Read our <Link href="/terms" target="_blank" className="text-gold-500 hover:underline">Terms</Link> for data details.
                                                    </p>
                                                </div>

                                                {/* Modern Toggle Switch */}
                                                <button
                                                    type="button"
                                                    role="switch"
                                                    aria-checked={agreed}
                                                    onClick={() => setAgreed(!agreed)}
                                                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${agreed ? 'bg-gold-500' : 'bg-neutral-800'
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
                                    <div className="bg-blue-600/5 border border-blue-500/20 p-4 rounded-xl text-center">
                                        <p className="text-sm text-blue-300">Logged in as <strong>{user.name}</strong></p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={true}
                                    className="w-full bg-red-600 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-red-600 transition shadow-lg shadow-blue-900/20 disabled:opacity-50 active:scale-95"
                                >
                                    {loading ? "Registering..." : "Registration Closed"}
                                </button>

                                {error && <p className="text-center text-xs text-red-400 font-bold uppercase tracking-tighter">{error}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}