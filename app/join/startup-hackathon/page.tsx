"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";
const STARTUP_EVENT_ID = 3;

type Role = "student" | "industry" | "judge" | "external";

const ROLE_LABELS: Record<Role, string> = {
    student: "Student",
    industry: "Industry",
    judge: "Judge",
    external: "External",
};

export default function StartupRegisterPage() {
    const { user, token, login } = useAuth();

    const [mode, setMode] = useState<"login" | "register">("login");

    // Login fields
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // Register fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vNumber, setVNumber] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [agreed, setAgreed] = useState(false);
    const [role, setRole] = useState<Role>("student");

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setResume(e.target.files[0]);
    };

    // Shared step 2: register for the event with a given token+user
    const registerForEvent = async (currentToken: string, currentUser: any) => {
        const eventRes = await fetch(`${API_BASE}/api/events/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentToken}`,
            },
            body: JSON.stringify({ userId: currentUser.id, eventId: STARTUP_EVENT_ID }),
        });
        const eventData = await eventRes.json();
        if (!eventRes.ok) throw new Error(eventData.error || "Failed to join event.");

        const finalUser = {
            ...currentUser,
            registeredEventIds: eventData.registeredEventIds || [...(currentUser.registeredEventIds || []), STARTUP_EVENT_ID],
        };
        login(currentToken, finalUser, true);
        setSubmitted(true);
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });
            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) throw new Error("Server error. Please try again.");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Login failed");

            await registerForEvent(data.token, data.user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            if (!agreed) throw new Error("You must agree to the terms to register.");

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("bio", bio);
            formData.append("role", role);
            formData.append("agreed", String(agreed));

            if (role === "student") {
                if (!vNumber.trim()) throw new Error("V-Number is required for students.");
                formData.append("vnumber", vNumber.trim());
            } else if (role === "industry") {
                if (!jobTitle.trim()) throw new Error("Job title is required.");
                if (!linkedinUrl.trim()) throw new Error("LinkedIn URL is required.");
                formData.append("job_title", jobTitle);
                formData.append("linkedin_url", linkedinUrl);
            }
            if (resume) formData.append("resume", resume);

            const regRes = await fetch(`${API_BASE}/api/users/account-reg`, {
                method: "POST",
                body: formData,
            });
            const contentType = regRes.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) throw new Error("Server error. Please try again.");
            const regData = await regRes.json();
            if (!regRes.ok) throw new Error(regData.error || "Failed to create account");

            await registerForEvent(regData.token, regData.user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Already logged in — just register for the event
    const handleAlreadyLoggedIn = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await registerForEvent(token!, user);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition";
    const labelClass = "block text-xs font-medium text-cool-steel-300 mb-1";

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>

            <section className="flex flex-1 items-center justify-center px-4 py-16">
                <div className="w-full max-w-xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-display font-bold tracking-tight text-white">
                            Startup <span className="text-blue-400">Hackathon</span>
                        </h1>
                        <p className="mt-2 text-sm text-cool-steel-300">
                            Register for the Feb 27–28 event. Takes about 2 minutes.
                        </p>
                    </div>

                    <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40">
                        {submitted ? (
                            <div className="text-center py-12 px-6">
                                <div className="text-blue-400 text-5xl mb-4">✓</div>
                                <h3 className="text-xl font-display font-semibold text-white mb-2">You're registered!</h3>
                                <p className="text-cool-steel-400 text-sm mb-6">We'll see you Feb 27–28 at Hickman 105.</p>
                                <Link href="/profile" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60">
                                    View Profile
                                </Link>
                            </div>
                        ) : user ? (
                            /* Already logged in */
                            <form onSubmit={handleAlreadyLoggedIn} className="p-6 space-y-4">
                                <div className="rounded-md bg-neutral-900 p-4 text-center">
                                    <p className="text-sm text-cool-steel-200">Logged in as <strong>{user.name}</strong></p>
                                    <p className="text-xs text-cool-steel-500 mt-1">{user.email}</p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60 disabled:opacity-50"
                                >
                                    {loading ? "Registering..." : "Register for This Event"}
                                </button>
                                {error && <p className="text-center text-xs text-red-400">{error}</p>}
                            </form>
                        ) : (
                            <>
                                {/* Tabs */}
                                <div className="flex border-b border-cool-steel-800">
                                    <button
                                        onClick={() => { setMode("login"); setError(null); }}
                                        className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase transition ${mode === "login" ? "text-blue-400 border-b-2 border-blue-500" : "text-cool-steel-500 hover:text-cool-steel-300"}`}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => { setMode("register"); setError(null); }}
                                        className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase transition ${mode === "register" ? "text-blue-400 border-b-2 border-blue-500" : "text-cool-steel-500 hover:text-cool-steel-300"}`}
                                    >
                                        New Account
                                    </button>
                                </div>

                                {/* Login form */}
                                {mode === "login" && (
                                    <form onSubmit={handleLogin} className="p-6 space-y-4">
                                        <div>
                                            <label className={labelClass}>Email</label>
                                            <input required type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className={inputClass} placeholder="you@uvic.ca" />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Password</label>
                                            <input required type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60 disabled:opacity-50"
                                        >
                                            {loading ? "Signing in..." : "Sign In & Register"}
                                        </button>
                                        {error && <p className="text-center text-xs text-red-400">{error}</p>}
                                    </form>
                                )}

                                {/* Register form */}
                                {mode === "register" && (
                                    <form onSubmit={handleRegister} className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className={labelClass}>Full Name</label>
                                                <input required type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Jane Doe" />
                                            </div>
                                            <div>
                                                <label className={labelClass}>Email</label>
                                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="jane@uvic.ca" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelClass}>I am a...</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {(Object.keys(ROLE_LABELS) as Role[]).map(r => (
                                                    <button key={r} type="button" onClick={() => setRole(r)}
                                                        className={`rounded-md py-2 text-xs font-semibold border transition ${role === r ? "border-blue-500 bg-blue-500/10 text-blue-300" : "border-cool-steel-700 text-cool-steel-400 hover:border-cool-steel-500"}`}>
                                                        {ROLE_LABELS[r]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {role === "student" && (
                                            <div>
                                                <label className={labelClass}>V-Number</label>
                                                <input required type="text" value={vNumber} onChange={e => setVNumber(e.target.value)} className={inputClass} placeholder="V00xxxxxx" />
                                            </div>
                                        )}
                                        {role === "industry" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Job Title</label>
                                                    <input required type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className={inputClass} placeholder="Software Engineer" />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>LinkedIn URL</label>
                                                    <input required type="url" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} className={inputClass} placeholder="https://linkedin.com/in/you" />
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className={labelClass}>Password</label>
                                            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Bio / Skills (optional)</label>
                                            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={2} className={inputClass} placeholder="Tell us about yourself and what you're interested in building." />
                                        </div>

                                        <div>
                                            <label className={labelClass}>Resume (optional, PDF)</label>
                                            <label className={`flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-md cursor-pointer transition-all ${resume ? "border-blue-500 bg-blue-500/5" : "border-cool-steel-700 hover:border-blue-500/50"}`}>
                                                <p className="text-xs text-cool-steel-400">{resume ? resume.name : "Click to upload PDF"}</p>
                                                <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
                                            </label>
                                        </div>

                                        <div className="rounded-md border border-cool-steel-800 bg-neutral-950 p-4">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-sm font-semibold text-cool-steel-100">Privacy Agreement</p>
                                                    <p className="mt-0.5 text-xs text-cool-steel-400">
                                                        I agree to share my account data with potential employers.
                                                    </p>
                                                </div>
                                                <button type="button" role="switch" aria-checked={agreed} onClick={() => setAgreed(!agreed)}
                                                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${agreed ? "bg-blue-600" : "bg-neutral-800"}`}>
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${agreed ? "translate-x-5" : "translate-x-0"}`} />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition shadow-md shadow-blue-900/60 disabled:opacity-50"
                                        >
                                            {loading ? "Registering..." : "Create Account & Register"}
                                        </button>
                                        {error && <p className="text-center text-xs text-red-400">{error}</p>}
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>

            <footer className="border-t border-cool-steel-800 py-6 text-center text-xs text-cool-steel-500">
                © {new Date().getFullYear()} UVic Hacks. Built by students, for students.
            </footer>
        </main>
    );
}
