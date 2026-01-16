"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Ensure you created the context from the previous step

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition">
                        <span className="text-blue-500">UVic</span>{" "}
                        <span className="text-gold-500">Hacks</span>
                    </Link>
                </div>

                {/* Right: Nav links + CTA */}
                <div className="ml-auto flex items-center gap-6 text-xs font-medium">
                    <div className="hidden items-center gap-6 md:flex">
                        {/* Conditional Link: Swap Featured for Login/Profile */}
                        {/* 
                        {!user ? (
                            <Link
                                href="/join/login"
                                className="transition text-cool-steel-100 hover:text-blue-300"
                            >
                                Login
                            </Link>
                        ) : (
                            <Link
                                href="/profile"
                                className="transition text-blue-400 hover:text-blue-200 font-bold"
                            >
                                My Profile
                            </Link>
                        )}
                            */}

                        <a href="#upcoming" className="transition text-cool-steel-100 hover:text-blue-300">
                            Upcoming
                        </a>
                        <a href="#about" className="transition text-cool-steel-100 hover:text-blue-300">
                            About
                        </a>
                        <a href="#contact" className="transition text-cool-steel-100 hover:text-blue-300">
                            Contact Us
                        </a>

                        {/* Logout button appears only if logged in */}
                        {user ? (
                            <button
                                onClick={logout}
                                className="transition text-red-400 hover:text-red-300"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/join"
                                className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-600 hover:shadow-lg active:scale-95"
                            >
                                Join Now
                            </Link>
                        )}
                    </div>

                </div>
            </nav>
        </header>
    );
}