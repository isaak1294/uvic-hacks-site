"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

type Role = "student" | "industry" | "judge" | "external";

const ROLE_LABELS: Record<Role, string> = {
    student: "Student",
    industry: "Industry",
    judge: "Judge",
    external: "External",
};

function LoginForm() {
    const { user, login } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const mode = searchParams.get("mode");
    const [isLogin, setIsLogin] = useState(mode !== "signup");
    const [shareStats, setShareStats] = useState(false);
    const [role, setRole] = useState<Role>("student");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        vnumber: "",
        bio: "",
        job_title: "",
        linkedin_url: "",
        personal_website: "",
        code: "",
    });

    useEffect(() => {
        if (user) router.push("/profile");
    }, [user, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const res = await fetch(`${API_BASE}/api/users/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });
                const contentType = res.headers.get("content-type") || "";
                if (!contentType.includes("application/json")) throw new Error("Server error. Please try again.");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Login failed");
                login(data.token, data.user, false);
            } else {
                const fd = new FormData();
                fd.append("name", formData.name);
                fd.append("email", formData.email);
                fd.append("password", formData.password);
                fd.append("bio", formData.bio);
                fd.append("role", role);
                fd.append("agreed", String(shareStats));

                if (role === "student") {
                    fd.append("vnumber", formData.vnumber.trim());
                } else if (role === "industry") {
                    fd.append("job_title", formData.job_title);
                    fd.append("linkedin_url", formData.linkedin_url);
                } else if (role === "judge") {
                    fd.append("code", formData.code)
                }
                if (formData.personal_website) {
                    fd.append("personal_website", formData.personal_website);
                }

                const res = await fetch(`${API_BASE}/api/users/account-reg`, {
                    method: "POST",
                    body: fd,
                });
                const contentType = res.headers.get("content-type") || "";
                if (!contentType.includes("application/json")) throw new Error("Server error. Please try again.");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Registration failed");
                setIsLogin(true);
                setError("Account created! Please log in.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const field = (label: string, key: keyof typeof formData, type = "text", placeholder = "") => (
        <div>
            <label className="block text-xs font-medium text-cool-steel-300 mb-1">{label}</label>
            <input
                required
                type={type}
                placeholder={placeholder}
                value={formData[key]}
                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
        </div>
    );

    const optionalField = (label: string, key: keyof typeof formData, type = "text", placeholder = "") => (
        <div>
            <label className="block text-xs font-medium text-cool-steel-300 mb-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={formData[key]}
                onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
            />
        </div>
    );

    return (
        <div className="w-full max-w-md">
            {/* Login / Sign Up tabs */}
            <div className="flex border-b border-cool-steel-800 mb-8">
                <button
                    onClick={() => { setIsLogin(true); setError(null); }}
                    className={`flex-1 pb-3 text-xs font-semibold tracking-widest uppercase transition ${isLogin ? "text-blue-400 border-b-2 border-blue-500" : "text-cool-steel-500"}`}
                >
                    Log In
                </button>
                <button
                    onClick={() => { setIsLogin(false); setError(null); }}
                    className={`flex-1 pb-3 text-xs font-semibold tracking-widest uppercase transition ${!isLogin ? "text-blue-400 border-b-2 border-blue-500" : "text-cool-steel-500"}`}
                >
                    Sign Up
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40">

                {/* ── SIGN UP FIELDS ── */}
                {!isLogin && (
                    <>
                        {field("Full Name", "name", "text", "Jane Doe")}

                        {/* Role selector */}
                        <div>
                            <label className="block text-xs font-medium text-cool-steel-300 mb-2">I am a...</label>
                            <div className="grid grid-cols-4 gap-2">
                                {(Object.keys(ROLE_LABELS) as Role[]).map(r => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`rounded-md py-2 text-xs font-semibold border transition ${role === r ? "border-blue-500 bg-blue-500/10 text-blue-300" : "border-cool-steel-700 text-cool-steel-400 hover:border-cool-steel-500"}`}
                                    >
                                        {ROLE_LABELS[r]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Role-conditional fields */}
                        {role === "student" && field("V-Number", "vnumber", "text", "V00123456")}
                        {role === "industry" && (
                            <>
                                {field("Job Title", "job_title", "text", "Software Engineer at Acme")}
                                {field("LinkedIn URL", "linkedin_url", "url", "https://linkedin.com/in/you")}
                            </>
                        )}
                        {role === "judge" && field("Secret Code", "code", "text", "secret judge code")}
                    </>
                )}

                {/* Email + Password (always shown) */}
                {field("Email", "email", "email", "you@uvic.ca")}
                <div>
                    <label className="block text-xs font-medium text-cool-steel-300 mb-1">Password</label>
                    <input
                        required
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
                    />
                    {isLogin && (
                        <div className="mt-1 text-right">
                            <Link href="/join/forgot-password" className="text-xs text-cool-steel-500 hover:text-blue-400 transition">
                                Forgot password?
                            </Link>
                        </div>
                    )}
                </div>

                {/* ── SIGN UP EXTRAS ── */}
                {!isLogin && (
                    <>
                        {optionalField("Personal Website (optional)", "personal_website", "url", "https://yoursite.com")}


                        {/* Recruitment toggle */}
                        <div className="rounded-md border border-cool-steel-800 bg-neutral-950 p-4 mt-2">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-cool-steel-100">Recruitment Profile</p>
                                    <p className="mt-0.5 text-xs text-cool-steel-400">
                                        Share your bio with our sponsor companies.{" "}
                                        <Link href="/terms" target="_blank" className="text-blue-400 hover:underline underline-offset-2">
                                            Privacy terms
                                        </Link>
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShareStats(!shareStats)}
                                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${shareStats ? "bg-gold-500" : "bg-neutral-800"}`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${shareStats ? "translate-x-5" : "translate-x-0"}`} />
                                </button>
                            </div>
                        </div>
                    </>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/60 hover:bg-blue-400 transition disabled:opacity-50"
                >
                    {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                </button>

                {error && (
                    <p className={`text-center text-xs mt-1 ${error.includes("created") ? "text-blue-300" : "text-red-400"}`}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>
            <div className="flex flex-1 items-center justify-center p-6">
                <Suspense fallback={<div className="text-cool-steel-500 text-sm">Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}
