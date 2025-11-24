import Link from "next/link"

export default function NavBar() {
    return (
        <div className="sticky top-0 z-20 bg-neutral-900 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                {/* Left: Logo */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                    >
                        <span className="text-lg font-semibold tracking-tight">
                            <span className="text-blue-950">UVic</span>{" "}
                            <span className="text-gold-950">Hacks</span>
                        </span>
                    </Link>
                </div>

                {/* Right: Nav links + CTA */}
                <div className="ml-auto flex items-center gap-6 text-xs font-medium">

                    <Link
                        href="/join"
                        className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-400 hover:shadow-lg"
                    >
                        Join Now
                    </Link>
                </div>
            </nav>
        </div>
    )
}