"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/users/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) throw new Error("Server error. Please try again.");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Request failed");
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-display font-semibold tracking-tight mb-2">Forgot password</h1>
                    <p className="text-sm text-cool-steel-400 mb-8">
                        Enter your email and we'll send you a reset link.
                    </p>

                    {submitted ? (
                        <div className="rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40 text-center space-y-3">
                            <p className="text-sm text-cool-steel-200">
                                If an account exists for <span className="text-blue-300">{email}</span>, a reset link has been sent.
                            </p>
                            <p className="text-xs text-cool-steel-500">Check your inbox — the link expires in 1 hour.</p>
                            <Link href="/join/login" className="mt-2 inline-block text-xs text-blue-400 hover:underline">
                                Back to login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
                            <div>
                                <label className="block text-xs font-medium text-cool-steel-300 mb-1">Email</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="you@uvic.ca"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/60 hover:bg-blue-400 transition disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send reset link"}
                            </button>

                            {error && <p className="text-center text-xs text-red-400">{error}</p>}

                            <p className="text-center text-xs text-cool-steel-500">
                                <Link href="/join/login" className="text-blue-400 hover:underline">
                                    Back to login
                                </Link>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}
