"use client"

import { useState, useEffect } from "react";

export default function HeroSubtitleWithCount() {
    const [count, setCount] = useState<number | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const isLocal =
            typeof window !== "undefined" &&
            window.location.hostname === "localhost";

        const API_BASE = isLocal
            ? "http://localhost:3002"
            : "https://strudel-hackathon.onrender.com";

        fetch(`${API_BASE}/api/registrations/count`)
            .then(r => r.json())
            .then(d => setCount(d.count ?? 0))
            .catch(() => setFailed(true));
    }, []);

    // If request failed OR still loading OR count is 0: show original subtitle
    if (failed || count === null || count === 0) {
        return (
            <p className="mt-6 text-lg md:text-xl">
                Showcase your talent on UVic&apos;s biggest stage.
            </p>
        );
    }

    // Success + count > 0: show the new line
    return (
        <p className="mt-6 text-lg md:text-xl text-cool-steel-100">
            Join our{" "}
            <span className="text-goldenrod-400 font-semibold">
                {count}
            </span>{" "}
            members in showcasing your talents on UVic&apos;s biggest stage.
        </p>
    );
}