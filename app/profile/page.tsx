"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "../components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

function ProfileContent() {
    const { user, token, login, logout, loading: authLoading } = useAuth();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [shareStats, setShareStats] = useState(false);

    const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);

    useEffect(() => {
        if (!authLoading && !user) router.push("/join/login");
        if (user) {
            setName(user.name || "");
            setBio(user.bio || "");
            // Match the field name from your database/backend
            setShareStats(user.agreed_to_terms || false);
        }
    }, [user, authLoading, router]);

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-neutral-500 uppercase tracking-widest text-xs">
                Authenticating Session...
            </div>
        );
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const fd = new FormData();
        fd.append("name", name);
        fd.append("bio", bio);
        // KEY FIX: Change 'agreed' to 'agreed_to_terms' to match your backend route
        fd.append("agreed_to_terms", String(shareStats));
        if (resume) fd.append("resume", resume);

        try {
            const res = await fetch(`${API_BASE}/api/profile`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: fd
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            // Update the global context with the fresh data from the DB
            login(token!, data.user);

            setMessage("Profile updated successfully");
            setIsEditing(false);
            setResume(null);
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    // ... Event detail fetching logic remains same ...

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="relative group w-24 h-24">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-gold-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative w-24 h-24 bg-neutral-900 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
                            {user.name?.charAt(0)}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">{user.name}</h1>
                        <p className="text-sm text-neutral-500 mt-1">{user.email}</p>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="w-full py-3 bg-neutral-900 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 transition border border-neutral-800"
                    >
                        {isEditing ? "Cancel Editing" : "Edit Profile"}
                    </button>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-6">User Biography</h2>
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="space-y-4">
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-neutral-900 border-none px-4 py-3 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-white"
                                        placeholder="Full Name"
                                    />
                                    <textarea
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full bg-neutral-900 border-none px-4 py-3 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-white resize-none"
                                        placeholder="Tell us about yourself..."
                                    />

                                    {/* CLEAN RECRUITMENT CARD */}
                                    <div className="rounded-xl border border-gold-500/20 bg-neutral-900/40 p-6 transition-all hover:border-gold-500/40">
                                        <div className="flex items-center justify-between gap-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2.5">
                                                    <span className={`h-2 w-2 rounded-full transition-colors duration-300 ${shareStats ? 'bg-gold-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]' : 'bg-neutral-700'}`}></span>
                                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Recruitment Profile</h3>
                                                </div>
                                                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                                                    Visibility for sponsors. Shares your professional bio and resume with recruitment partners.
                                                </p>
                                                <Link href="/terms" className="inline-block text-[10px] text-neutral-600 underline decoration-neutral-800 underline-offset-4 hover:text-neutral-400 transition uppercase tracking-widest">
                                                    Review Privacy Terms
                                                </Link>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setShareStats(!shareStats)}
                                                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${shareStats ? 'bg-gold-500' : 'bg-neutral-800'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${shareStats ? 'translate-x-5' : 'translate-x-0'}`} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="bg-neutral-900 p-4 rounded-lg">
                                        <p className="text-[10px] uppercase text-neutral-500 mb-2 font-bold tracking-widest">Update Resume (PDF)</p>
                                        <input type="file" accept=".pdf" onChange={e => setResume(e.target.files?.[0] || null)} className="text-xs text-neutral-400" />
                                    </div>
                                </div>
                                <button type="submit" disabled={loading} className="bg-blue-600 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition shadow-lg shadow-blue-900/20 disabled:opacity-50">
                                    {loading ? "Saving..." : "Push Updates to Profile"}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <p className="text-lg text-neutral-300 leading-relaxed font-medium italic">
                                    {user.bio || "No biography provided."}
                                </p>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[9px] font-bold px-2 py-1 uppercase tracking-widest rounded ${user.agreed_to_terms ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20' : 'bg-neutral-800 text-neutral-500'}`}>
                                        {user.agreed_to_terms ? "Recruitment Active" : "Private Profile"}
                                    </span>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Events and Resume section same as before ... */}
                </div>
            </div>

            {message && (
                <p className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest animate-fade-in-up shadow-2xl">
                    {message}
                </p>
            )}
        </div>
    );
}

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 bg-neutral-950/80 backdrop-blur-md">
                <Suspense fallback={<div className="h-16 border-b border-cool-steel-800 bg-neutral-900/50" />}>
                    <Navbar />
                </Suspense>
            </header>
            <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-neutral-500 uppercase tracking-widest text-xs">Loading Profile...</div>}>
                <ProfileContent />
            </Suspense>
        </main>
    );
}