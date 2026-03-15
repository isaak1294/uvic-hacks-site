"use client";

import { useState, FormEvent, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") ?? "";

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/users/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });
            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) throw new Error("Server error. Please try again.");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Reset failed");
            setDone(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40 text-center space-y-3">
                <p className="text-sm text-red-400">Invalid reset link.</p>
                <Link href="/join/forgot-password" className="text-xs text-blue-400 hover:underline">
                    Request a new one
                </Link>
            </div>
        );
    }

    if (done) {
        return (
            <div className="rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40 text-center space-y-3">
                <p className="text-sm text-cool-steel-200">Your password has been reset.</p>
                <Link href="/join/login" className="inline-block text-xs text-blue-400 hover:underline">
                    Sign in
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded-sm bg-neutral-900/70 p-6 shadow-sm shadow-black/40">
            <div>
                <label className="block text-xs font-medium text-cool-steel-300 mb-1">New password</label>
                <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-cool-steel-300 mb-1">Confirm password</label>
                <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-900/60 hover:bg-blue-400 transition disabled:opacity-50"
            >
                {loading ? "Saving..." : "Set new password"}
            </button>

            {error && <p className="text-center text-xs text-red-400">{error}</p>}
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Navbar />
            </header>
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-display font-semibold tracking-tight mb-2">Set new password</h1>
                    <p className="text-sm text-cool-steel-400 mb-8">Choose a new password for your account.</p>
                    <Suspense fallback={<div className="text-cool-steel-500 text-sm">Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
