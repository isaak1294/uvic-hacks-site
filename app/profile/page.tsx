"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Navbar from "../components/NavBar";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3002";

// 1. Wrap the inner content to isolate potential searchParam usage
function ProfileContent() {
    const { user, token, login, logout, loading: authLoading } = useAuth();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState<File | null>(null);

    const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);

    useEffect(() => {
        if (!authLoading && !user) router.push("/join/login");
        if (user) {
            setName(user.name || "");
            setBio(user.bio || "");
        }
    }, [user, authLoading, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData();
        fd.append("name", name);
        fd.append("bio", bio);
        if (resume) fd.append("resume", resume);

        try {
            const res = await fetch(`${API_BASE}/api/profile`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: fd
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            login(token!, data.user);
            setMessage("Profile updated successfully");
            setIsEditing(false);
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchEventDetails = async () => {
            // Only run if the user exists and has event IDs
            if (user?.registeredEventIds && user.registeredEventIds.length > 0) {
                try {
                    const details = await Promise.all(
                        user.registeredEventIds.map(async (id: number) => {
                            const res = await fetch(`${API_BASE}/api/events/${id}`);
                            if (!res.ok) return null;
                            return res.json();
                        })
                    );

                    // Filter out any nulls (in case an event was deleted)
                    setRegisteredEvents(details.filter(e => e !== null));
                } catch (err) {
                    console.error("Failed to fetch event details:", err);
                }
            }
        };

        if (user) fetchEventDetails();
    }, [user]);

    if (authLoading || !user) return null;

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Sidebar: Profile Info */}
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

                    <div className="space-y-4 pt-4">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="w-full py-3 bg-neutral-900 text-xs font-bold uppercase tracking-widest text-white hover:bg-neutral-800 transition"
                        >
                            {isEditing ? "Cancel Editing" : "Edit Profile"}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-8 space-y-12">

                    {/* Bio Section */}
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-6">User Biography</h2>
                        {isEditing ? (
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="space-y-4">
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full bg-neutral-900 border-none px-4 py-3 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                        placeholder="Full Name"
                                    />
                                    <textarea
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full bg-neutral-900 border-none px-4 py-3 text-sm rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                    <div className="bg-neutral-900 p-4 rounded-lg">
                                        <p className="text-[10px] uppercase text-neutral-500 mb-2 font-bold">Update Resume (PDF)</p>
                                        <input type="file" accept=".pdf" onChange={e => setResume(e.target.files?.[0] || null)} className="text-xs text-neutral-400" />
                                    </div>
                                </div>
                                <button className="bg-blue-600 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition shadow-lg shadow-blue-900/20">Save Profile</button>
                            </form>
                        ) : (
                            <p className="text-lg text-neutral-300 leading-relaxed font-medium italic">
                                {user.bio || "No biography provided."}
                            </p>
                        )}
                    </section>

                    {/* Events Section */}
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-6">Registered Events</h2>
                        <div className="grid gap-4">
                            {registeredEvents.length > 0 ? (
                                registeredEvents.map((event) => (
                                    <div key={event.id} className="bg-neutral-900/50 p-6 flex items-center justify-between group hover:bg-neutral-900 transition">
                                        <div>
                                            <h3 className="text-white font-bold group-hover:text-gold-500 transition">{event.title || event.name}</h3>
                                            <p className="text-xs text-neutral-500 mt-1">Confirmed Registration • {event.date || 'TBA'}</p>
                                        </div>
                                        <div className="h-2 w-2 bg-gold-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.6)]"></div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-neutral-500 italic">No events joined yet.</p>
                            )}

                            <Link href="/" className="text-xs font-bold text-blue-500 hover:text-white transition uppercase tracking-widest">
                                Browse more events →
                            </Link>
                        </div>
                    </section>

                    {/* Resume Status */}
                    <section className="pt-8 border-t border-neutral-900">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${user.resume_url ? 'bg-blue-500' : 'bg-neutral-700'}`}></div>
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Resume Status</span>
                            </div>
                            {user.resume_url && (
                                <a href={user.resume_url} target="_blank" className="text-xs font-bold text-white hover:text-gold-500 transition underline underline-offset-8 decoration-gold-500/50">Download Resume</a>
                            )}
                        </div>
                    </section>

                </div>
            </div>

            {message && (
                <p className="fixed bottom-8 right-8 bg-blue-600 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest animate-fade-in-up">
                    {message}
                </p>
            )}
        </div>
    );
}

// 2. Main Page with Suspense wrapper to fix build error
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