import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const teamMembers = [
    {
        name: "Isaak Wiebe",
        role: "President",
        bio: "Software Engineering student passionate about community building and Hackathons. Isaak is dedicated to fostering a thriving software engineering community among students in Victoria.",
        image: "/images/team/isaak1.jpeg",
        linkedin: "https://www.linkedin.com/in/isaak-wiebe-a26142253/",
        github: "https://github.com/isaak1294",
        website: "https://jimmer.dev"
    },
    {
        name: "Jake Cushway",
        role: "Operations and Marketing Manager",
        bio: "Fourth Year Computer Science student passionate about learning, collaborating, and building innovative ideas as a community.",
        image: "/images/team/jake.png",
        linkedin: "https://www.linkedin.com/in/jakecushway/",
        github: "https://github.com/jakecush1",
        website: "https://jakecushway.ca"
    },
    {
        name: "Ella Strachen",
        role: "VP of Social Media",
        bio: "Just here for the pizza.",
        image: "/images/team/ella.png",
        linkedin: "#",
        github: "#",
        website: "#"
    },
    {
        name: "Arfaz Hussain",
        role: "Corporate & Industry Relations",
        bio: "Fourth Year Software Engineering student passionate about community building and involved in student tech spaces",
        image: "/images/team/arfaz.png",
        linkedin: "https://www.linkedin.com/in/arfazca",
        github: "https://www.github.com/arfazca",
        website: "https://arfaz.ca"
    },
    {
        name: "Harsh Sreelal",
        role: "VP of Logistics",
        bio: "Description.",
        image: "/images/team/harsh.png",
        linkedin: "https://www.linkedin.com/in/harsh-sreelal-73a9272b1",
        github: "https://github.com/harshsreelal",
        website: "#"
    },
];

export default function Team() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50">
            <Head>
                <title>Team | UVic Hacks</title>
                <meta name="description" content="Meet the students behind UVic Hacks." />
            </Head>

            {/* Navbar (Kept identical to your homepage for consistency) */}
            <header className="sticky top-0 z-20 border-b border-cool-steel-800 bg-neutral-900/80 backdrop-blur">
                <nav className="mx-auto flex max-w-6xl items-center px-4 py-3 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition">
                            <span className="text-blue-950">UVic</span>{" "}
                            <span className="text-gold-950">Hacks</span>
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-6 text-xs font-medium">
                        <div className="hidden items-center gap-6 md:flex">
                            <Link href="/#featured" className="transition hover:text-blue-300">Featured</Link>
                            <Link href="/#upcoming" className="transition hover:text-blue-300">Upcoming</Link>
                            <Link href="/#about" className="transition hover:text-blue-300">About</Link>
                            <Link href="/#contact" className="transition hover:text-blue-300">Contact Us</Link>
                        </div>
                        <Link
                            href="/join"
                            className="rounded-full bg-blue-950 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-900/60 transition hover:bg-blue-400 hover:shadow-lg"
                        >
                            Join Now
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Header Section */}
            <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-950">
                    The Organizers
                </p>
                <h1 className="mt-5 text-4xl font-display font-bold leading-tight tracking-tight md:text-5xl">
                    Meet the <span className="text-gold-950">Team</span>
                </h1>
                <p className="mt-4 mx-auto max-w-2xl text-sm text-cool-steel-200">
                    We are a group of students dedicated to building a thriving community of builders,
                    creators, and developers at the University of Victoria.
                </p>
            </section>

            {/* Team Grid */}
            <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                        <Link
                            href={member.website}
                            key={member.name}
                            className="group relative flex flex-col rounded-2xl bg-neutral-900 p-6 transition duration-300 hover:border-blue-900/50 hover:shadow-xl hover:shadow-blue-900/10"
                        >
                            {/* Image Container */}
                            <div className="mb-6 flex justify-center">
                                <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-cool-steel-800 shadow-md group-hover:border-blue-900/50">
                                    {/* Placeholder for Next.js Image or standard img tag */}
                                    <div className="flex h-full w-full items-center justify-center bg-cool-steel-800 text-cool-steel-300">
                                        <Image src={member.image} alt={member.name} fill className="object-cover" />
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center">
                                <h3 className="text-xl font-display font-bold tracking-tight text-white">
                                    {member.name}
                                </h3>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
                                    {member.role}
                                </p>
                                <p className="mt-4 text-sm leading-relaxed text-cool-steel-300">
                                    {member.bio}
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="mt-6 flex justify-center gap-4">
                                <a href={member.github} className="text-cool-steel-400 transition hover:text-white" aria-label="GitHub">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href={member.linkedin} className="text-cool-steel-400 transition hover:text-white" aria-label="LinkedIn">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}