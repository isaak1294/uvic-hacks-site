"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

export default function AuthPage() {
    const { user, login } = useAuth(); // Access global auth state
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check URL for mode (e.g., /join/login could set a 'mode' param)
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        vnumber: "",
        bio: ""
    });

    // If already logged in, redirect to profile immediately
    useEffect(() => {
        if (user) {
            router.push("/profile");
        }
    }, [user, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const res = await fetch(`${API_BASE}/api/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Login failed");

                // Sync with global AuthContext
                login(data.token, data.user);
                router.push("/profile");
            } else {
                const fd = new FormData();
                fd.append("name", formData.name);
                fd.append("email", formData.email);
                fd.append("password", formData.password);
                fd.append("bio", formData.bio);
                fd.append("vnumber", formData.vnumber.trim());

                const res = await fetch(`${API_BASE}/api/account-reg`, {
                    method: "POST",
                    body: fd,
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Registration failed");

                setIsLogin(true);
                setError("Account created! You can now log in.");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            {/* Uniform Navbar */}
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition">
                            <span className="text-blue-500">UVic</span>{" "}
                            <span className="text-gold-500">Hacks</span>
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-6 text-xs font-medium">
                        <div className="hidden items-center gap-6 md:flex">
                            <Link href="/join/login" className="text-blue-300 transition hover:text-blue-200">
                                Login
                            </Link>
                            <a href="/#upcoming" className="transition hover:text-blue-300">Upcoming</a>
                            <a href="/#about" className="transition hover:text-blue-300">About</a>
                        </div>
                        <Link
                            href="/join"
                            className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-600 hover:shadow-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                </nav>
            </header>

            <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="flex border-b border-cool-steel-800 mb-8">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 pb-4 text-xs font-bold tracking-widest uppercase transition ${isLogin ? "text-blue-400 border-b-2 border-blue-500" : "text-cool-steel-500"}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 pb-4 text-xs font-bold tracking-widest uppercase transition ${!isLogin ? "text-blue-400 border-b-2 border-blue-500" : "text-cool-steel-500"}`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900/40 p-8 rounded-2xl border border-cool-steel-800 shadow-2xl backdrop-blur-sm">
                        {!isLogin && (
                            <div>
                                <label className="text-[10px] font-bold uppercase text-cool-steel-400 tracking-widest">Full Name</label>
                                <input required type="text" placeholder="Jane Doe" className="mt-1 w-full rounded-lg border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm outline-none focus:border-blue-500 transition focus:ring-1 focus:ring-blue-500/50"
                                    onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-bold uppercase text-cool-steel-400 tracking-widest">Email</label>
                            <input required type="email" placeholder="you@uvic.ca" className="mt-1 w-full rounded-lg border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm outline-none focus:border-blue-500 transition focus:ring-1 focus:ring-blue-500/50"
                                onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="text-[10px] font-bold uppercase text-cool-steel-400 tracking-widest">V-Number (Optional)</label>
                                <input type="text" placeholder="V00123456" className="mt-1 w-full rounded-lg border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm outline-none focus:border-blue-500 transition focus:ring-1 focus:ring-blue-500/50"
                                    value={formData.vnumber}
                                    onChange={e => setFormData({ ...formData, vnumber: e.target.value })} />
                            </div>
                        )}

                        <div>
                            <label className="text-[10px] font-bold uppercase text-cool-steel-400 tracking-widest">Password</label>
                            <input required type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-cool-steel-700 bg-neutral-950 px-4 py-2 text-sm outline-none focus:border-blue-500 transition focus:ring-1 focus:ring-blue-500/50"
                                onChange={e => setFormData({ ...formData, password: e.target.value })} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-full bg-blue-600 py-3 text-sm font-bold text-white transition hover:bg-blue-500 shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
                        </button>

                        {error && (
                            <p className={`text-center text-xs mt-2 ${error.includes("created") ? "text-green-400" : "text-red-400"}`}>
                                {error}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}