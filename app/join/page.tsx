"use client";

import { useState, FormEvent } from "react";

export default function JoinPage() {
    const [name, setName] = useState("");
    const [vNumber, setVNumber] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitted(false);
        setError(null);
        setLoading(true);

        try {
            // Decide API base depending on where we are
            const isLocal =
                typeof window !== "undefined" &&
                window.location.hostname === "localhost";

            const API_BASE = isLocal
                ? "http://localhost:3002"
                : "https://strudel-hackathon.onrender.com";

            const res = await fetch(`${API_BASE}/api/registrations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    vnumber: vNumber,
                }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Failed to register");
            }

            setSubmitted(true);
            setName("");
            setVNumber("");
            setEmail("");
        } catch (err: any) {
            console.error("Registration error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 flex flex-col">
            {/* Navbar */}
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="text-baltic-blue-300">UVic</span>{" "}
                            <span className="text-goldenrod-300">Hacks</span>
                        </span>
                    </div>

                    {/* Right: Back to site */}
                    <div className="ml-auto flex items-center gap-4 text-xs font-medium">
                        <a
                            href="/"
                            className="text-cool-steel-300 transition hover:text-baltic-blue-300"
                        >
                            Back to home
                        </a>
                        <span className="rounded-full bg-baltic-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60">
                            Join UVic Hacks
                        </span>
                    </div>
                </nav>
            </header>

            {/* Content */}
            <section className="flex flex-1 items-center justify-center px-4 py-10 md:px-6">
                <div className="w-full max-w-lg">
                    <div className="mb-8 text-center">
                        <p className="text-xl font-semibold uppercase tracking-[0.25em] text-baltic-blue-300/80">
                            Join the club
                        </p>
                    </div>

                    <div className="rounded-lg bg-neutral-900/80 p-6 shadow-sm shadow-black/40">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-xs font-medium text-cool-steel-200"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    className="mt-1 w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none ring-0 transition placeholder:text-cool-steel-500 focus:border-baltic-blue-500 focus:ring-2 focus:ring-baltic-blue-500/40"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="vnumber"
                                    className="block text-xs font-medium text-cool-steel-200"
                                >
                                    VNumber
                                </label>
                                <input
                                    id="vnumber"
                                    type="text"
                                    required
                                    value={vNumber}
                                    onChange={(e) => setVNumber(e.target.value)}
                                    placeholder="V00xxxxxx"
                                    className="mt-1 w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none ring-0 transition placeholder:text-cool-steel-500 focus:border-baltic-blue-500 focus:ring-2 focus:ring-baltic-blue-500/40"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-cool-steel-200"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@uvic.ca"
                                    className="mt-1 w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none ring-0 transition placeholder:text-cool-steel-500 focus:border-baltic-blue-500 focus:ring-2 focus:ring-baltic-blue-500/40"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-3 w-full rounded-full bg-baltic-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-baltic-blue-900/60 transition hover:bg-baltic-blue-400 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Submitting..." : "Join UVic Hacks"}
                            </button>

                            {error && (
                                <p className="mt-3 text-center text-xs text-goldenrod-300">
                                    {error}
                                </p>
                            )}

                            {submitted && !error && (
                                <p className="mt-3 text-center text-xs text-evergreen-300">
                                    Thanks for joining! We&apos;ll be in touch with upcoming
                                    events and announcements.
                                </p>
                            )}

                            <p className="mt-2 text-[11px] text-cool-steel-500 text-center">
                                Your information will only be used for UVic Hacks communication.
                            </p>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
