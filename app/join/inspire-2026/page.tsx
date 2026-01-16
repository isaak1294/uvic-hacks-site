"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const INSPIRE_EVENT_ID = 1;

export default function InspireRegisterPage() {
    const router = useRouter();
    // Use the global auth context instead of local state for consistency
    const { user, token, login } = useAuth();

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vNumber, setVNumber] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState<File | null>(null);

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
                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("vnumber", vNumber.trim());
                formData.append("bio", bio);
                if (resume) formData.append("resume", resume);

                const regRes = await fetch(`${API_BASE}/api/account-reg`, {
                    method: "POST",
                    body: formData,
                });

                const regData = await regRes.json();
                if (!regRes.ok) throw new Error(regData.error || "Failed to create account");

                // --- STEP 2: AUTOMATIC LOGIN (To get the token) ---
                const loginRes = await fetch(`${API_BASE}/api/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const loginData = await loginRes.json();
                if (!loginRes.ok) throw new Error("Account created, but automatic login failed. Please sign in manually.");

                // Update local variables for the next step
                currentToken = loginData.token;
                currentUser = loginData.user;

                // Sync with global AuthContext
                login(loginData.token, loginData.user);
            }

            // --- STEP 3: EVENT REGISTRATION ---
            // We use currentToken/currentUser which are now set whether the user was pre-existing or just created
            const eventRes = await fetch(`${API_BASE}/api/events/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({ userId: currentUser.id, eventId: INSPIRE_EVENT_ID }),
            });

            const eventData = await eventRes.json();
            if (!eventRes.ok) throw new Error(eventData.error || "Account created, but failed to join the hackathon.");

            // Final sync of the user object to include the new registration
            const finalUser = {
                ...currentUser,
                registeredEventIds: eventData.registeredEventIds || [...(currentUser.registeredEventIds || []), INSPIRE_EVENT_ID]
            };

            login(currentToken!, finalUser);
            setSubmitted(true);

        } catch (err: any) {
            console.error("Workflow Error:", err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Rest of your UI remains the same...

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col font-sans">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition">
                            <span className="text-blue-500">UVic</span>{" "}
                            <span className="text-gold-500">Hacks</span>
                        </Link>
                    </div>
                    <div className="ml-auto flex items-center gap-6 text-xs font-medium">
                        <Link href="/" className="text-cool-steel-300 transition hover:text-blue-300">Back to home</Link>
                        <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60">
                            Inspire Registration
                        </span>
                    </div>
                </nav>
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16 md:px-6">
                <div className="w-full max-w-xl">
                    <div className="mb-8 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500 mb-3">Hackathon Event</p>
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Inspire <span className="text-gold-500">2026</span>
                        </h1>
                        <p className="mt-4 text-cool-steel-400 text-sm max-w-md mx-auto leading-relaxed">
                            Join us for two days of building software for social impact.
                        </p>
                    </div>

                    <div className="rounded-xl border border-cool-steel-800 bg-neutral-900/80 p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                        {submitted ? (
                            <div className="text-center py-10">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in!</h3>
                                <p className="text-cool-steel-300 mb-8 text-sm">Your spot for the Inspire Hackathon is confirmed. Check your profile for details.</p>
                                <Link href="/profile" className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-500">
                                    Go to My Profile
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {user ? (
                                    <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-5 mb-4 text-center">
                                        <p className="text-sm text-cool-steel-100 mb-1">Welcome back, <span className="font-bold text-white">{user.name}</span>!</p>
                                        <p className="text-xs text-cool-steel-400">Click below to confirm your registration for this event.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-500 mb-1.5">Full Name</label>
                                            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-cool-steel-800 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="Jane Doe" />
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-500 mb-1.5">Email</label>
                                                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-cool-steel-800 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="you@uvic.ca" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-500 mb-1.5">V-Number</label>
                                                <input required type="text" value={vNumber} onChange={(e) => setVNumber(e.target.value)} className="w-full rounded-md border border-cool-steel-800 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="V00123456" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-500 mb-1.5">Password</label>
                                            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-cool-steel-800 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="••••••••" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-500 mb-1.5">Bio / Skills</label>
                                            <textarea rows={2} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full rounded-md border border-cool-steel-800 bg-neutral-950 px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition" placeholder="I build React apps and love UI design..." />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase tracking-widest text-cool-steel-500 mb-1.5">Resume (PDF)</label>
                                            <input type="file" accept=".pdf" onChange={handleFileChange} className="w-full text-xs text-cool-steel-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-blue-600/10 file:text-blue-400 hover:file:bg-blue-600/20 cursor-pointer" />
                                        </div>
                                    </>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-4 rounded-full bg-blue-600 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-900/40 transition hover:bg-blue-500 active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? "Processing..." : user ? "Confirm Registration" : "Create Account & Register"}
                                </button>

                                {error && (
                                    <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-center">
                                        <p className="text-xs font-medium text-red-400">{error}</p>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}