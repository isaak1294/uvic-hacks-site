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
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState<File | null>(null);
    const [shareStats, setShareStats] = useState(false);
    const [eventNames, setEventNames] = useState<Record<number, string>>({});

    useEffect(() => {
        if (!authLoading && !user) router.push("/join/login");
        if (user) {
            setName(user.name || "");
            setBio(user.bio || "");
            setShareStats(user.agreed_to_terms || false);
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (!user?.registeredEventIds?.length) return;
        const ids: number[] = user.registeredEventIds;
        Promise.all(
            ids.map(id =>
                fetch(`${API_BASE}/api/events/${id}`)
                    .then(r => r.ok ? r.json() : null)
                    .catch(() => null)
            )
        ).then(results => {
            const names: Record<number, string> = {};
            results.forEach((event, i) => {
                if (event?.title) names[ids[i]] = event.title;
            });
            setEventNames(names);
        });
    }, [user?.registeredEventIds]);

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-cool-steel-500 text-sm">
                Loading...
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
        fd.append("agreed_to_terms", String(shareStats));
        if (resume) fd.append("resume", resume);

        try {
            const res = await fetch(`${API_BASE}/api/users/profile`, {
                method: "PUT",
                headers: { "Authorization": `Bearer ${token}` },
                body: fd
            });

            const contentType = res.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                throw new Error("Server error. Please try again.");
            }
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            login(token!, data.user, false);
            setMessage("Profile updated.");
            setIsEditing(false);
            setResume(null);
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setDeleteLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/users/account`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Delete failed");
            logout();
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
            setConfirmDelete(false);
        } finally {
            setDeleteLoading(false);
        }
    };

    const initial = user.name?.charAt(0)?.toUpperCase() ?? "?";

    return (
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">

            {/* Page heading */}
            <div className="mb-10">
                <h1 className="text-3xl font-display font-bold tracking-tight text-cool-steel-50">
                    Your Profile
                </h1>
                <p className="mt-1 text-sm text-cool-steel-400">
                    Manage your account and event registrations.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sidebar */}
                <aside className="lg:col-span-3 space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-sm bg-blue-950 flex items-center justify-center text-xl font-bold text-white shrink-0">
                            {initial}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-cool-steel-50 truncate">{user.name}</p>
                            <p className="text-xs text-cool-steel-400 truncate">{user.email}</p>
                        </div>
                    </div>

                    {/* Recruitment badge */}
                    <div>
                        <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full ${user.agreed_to_terms ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20' : 'bg-neutral-800 text-cool-steel-500 border border-neutral-700'}`}>
                            {user.agreed_to_terms ? "Recruitment profile active" : "Private profile"}
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={() => { setIsEditing(!isEditing); setMessage(""); }}
                            className="w-full rounded-full border border-cool-steel-700 px-4 py-2 text-sm font-semibold text-cool-steel-200 hover:border-blue-500 hover:text-blue-300 transition"
                        >
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                        <button
                            onClick={logout}
                            className="w-full rounded-full border border-cool-steel-800 px-4 py-2 text-sm text-cool-steel-500 hover:border-red-800 hover:text-red-400 transition"
                        >
                            Sign Out
                        </button>

                        {!confirmDelete ? (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="w-full rounded-full border border-cool-steel-800 px-4 py-2 text-sm text-cool-steel-600 hover:border-red-800 hover:text-red-500 transition"
                            >
                                Delete Account
                            </button>
                        ) : (
                            <div className="rounded-md border border-red-900 bg-red-950/30 p-3 space-y-2">
                                <p className="text-xs text-red-300">This is permanent and cannot be undone.</p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={deleteLoading}
                                        className="flex-1 rounded-full bg-red-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition disabled:opacity-50"
                                    >
                                        {deleteLoading ? "Deleting..." : "Yes, delete"}
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        className="flex-1 rounded-full border border-cool-steel-700 px-3 py-1.5 text-xs text-cool-steel-400 hover:border-cool-steel-500 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main content */}
                <div className="lg:col-span-9 space-y-6">

                    {/* Edit form */}
                    {isEditing ? (
                        <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                            <h2 className="text-lg font-display font-semibold text-cool-steel-50 mb-5">Edit Profile</h2>
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-cool-steel-300 mb-1">Full Name</label>
                                    <input
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition"
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-cool-steel-300 mb-1">Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        rows={4}
                                        className="w-full rounded-md border border-cool-steel-700 bg-neutral-950 px-3 py-2 text-sm text-cool-steel-50 outline-none placeholder:text-cool-steel-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 transition resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-cool-steel-300 mb-1">Resume (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={e => setResume(e.target.files?.[0] || null)}
                                        className="text-xs text-cool-steel-400 file:mr-3 file:rounded-full file:border-0 file:bg-neutral-800 file:px-3 file:py-1 file:text-xs file:text-cool-steel-200 file:cursor-pointer"
                                    />
                                    {user.resume_url && (
                                        <p className="mt-1 text-xs text-cool-steel-500">
                                            You already have a resume on file. Upload a new one to replace it.
                                        </p>
                                    )}
                                </div>

                                {/* Recruitment toggle */}
                                <div className="rounded-md border border-cool-steel-800 bg-neutral-950 p-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-cool-steel-100">Recruitment Profile</p>
                                            <p className="mt-0.5 text-xs text-cool-steel-400">
                                                Share your bio and resume with our sponsor companies.{" "}
                                                <Link href="/terms" className="text-blue-400 hover:underline underline-offset-2">
                                                    Privacy terms
                                                </Link>
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShareStats(!shareStats)}
                                            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${shareStats ? 'bg-gold-500' : 'bg-neutral-700'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${shareStats ? 'translate-x-5' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-900/60 hover:bg-blue-400 transition disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            {/* Bio card */}
                            <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cool-steel-400 mb-3">About</h2>
                                <p className="text-sm text-cool-steel-200 leading-relaxed">
                                    {user.bio || <span className="text-cool-steel-500 italic">No bio yet. Click Edit Profile to add one.</span>}
                                </p>
                            </div>

                            {/* Resume card */}
                            <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cool-steel-400 mb-3">Resume</h2>
                                {user.resume_url ? (
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={user.resume_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full bg-blue-950 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 hover:bg-blue-400 transition"
                                        >
                                            View Resume
                                        </a>
                                        <span className="text-xs text-cool-steel-500">Opens in a new tab (link valid for 24 hours)</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-cool-steel-500 italic">
                                        No resume uploaded.{" "}
                                        <button onClick={() => setIsEditing(true)} className="text-blue-400 hover:underline underline-offset-2">
                                            Upload one
                                        </button>
                                    </p>
                                )}
                            </div>

                            {/* Registered events card */}
                            <div className="rounded-sm bg-neutral-900/70 shadow-sm shadow-black/40 p-6">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-cool-steel-400 mb-3">Registered Events</h2>
                                {user.registeredEventIds && user.registeredEventIds.length > 0 ? (
                                    <ul className="space-y-2">
                                        {user.registeredEventIds.map((id: number) => (
                                            <li key={id} className="flex items-center gap-2 text-sm text-cool-steel-200">
                                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                                                {eventNames[id] ?? `Event #${id}`}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-cool-steel-500 italic">
                                        No events registered yet.{" "}
                                        <Link href="/join/startup-hackathon" className="text-blue-400 hover:underline underline-offset-2">
                                            Join the Startup Hackathon
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Toast message */}
            {message && (
                <div className="fixed bottom-6 right-6 rounded-sm bg-neutral-900 border border-cool-steel-700 px-5 py-3 text-sm text-cool-steel-100 shadow-lg shadow-black/40">
                    {message}
                </div>
            )}
        </div>
    );
}

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900 backdrop-blur">
                <Suspense fallback={<div className="h-14" />}>
                    <Navbar />
                </Suspense>
            </header>
            <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh] text-cool-steel-500 text-sm">Loading...</div>}>
                <ProfileContent />
            </Suspense>
        </main>
    );
}
