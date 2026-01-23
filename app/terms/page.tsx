"use client";

import Link from "next/link";
import Navbar from "../components/NavBar";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-cool-steel-50 font-sans">
            <header className="sticky top-0 z-20 bg-neutral-950/80 backdrop-blur-md">
                <Navbar />
            </header>

            <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
                {/* Page Header */}
                <div className="mb-16 border-l-4 border-gold-500 pl-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500 mb-4">
                        Legal Framework
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                        Terms of Service & <br />
                        <span className="text-blue-500">Data Privacy Agreement</span>
                    </h1>
                    <p className="mt-6 text-sm text-neutral-500 font-medium uppercase tracking-widest">
                        Last Updated: January 16, 2026
                    </p>
                </div>

                {/* Important Disclaimer Box */}
                <div className="mb-12 bg-blue-600/5 border border-blue-500/20 p-6 rounded-xl">
                    <p className="text-xs leading-relaxed text-blue-300 italic">
                        <span className="font-bold uppercase mr-2 text-blue-400">Disclaimer:</span>
                        This platform connects student hackers with potential employers. By using this service,
                        you are explicitly consenting to the collection and distribution of your professional
                        data as outlined below.
                    </p>
                </div>

                {/* Terms Content */}
                <div className="space-y-16">

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-4">
                            <span className="text-gold-500">01</span> Data Collection and Usage
                        </h2>
                        <div className="space-y-4 text-neutral-400 text-base leading-relaxed pl-10">
                            <p>
                                By registering for UVic Hacks events and uploading your resume, bio, and personal details, you acknowledge and agree that:
                            </p>
                            <ul className="list-disc space-y-3 pl-5">
                                <li>
                                    <strong className="text-white">Intentional Upload:</strong> You are voluntarily providing your professional information to be shared with third parties.
                                </li>
                                <li>
                                    <strong className="text-white">The "Product":</strong> You understand that UVic Hacks provides a recruitment platform. Your data (Resume, Email, and Bio) constitutes the "data package" shared with our partners.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-4">
                            <span className="text-gold-500">02</span> Sharing with Employers & Sponsors
                        </h2>
                        <div className="space-y-4 text-neutral-400 text-base leading-relaxed pl-10">
                            <ul className="list-disc space-y-3 pl-5">
                                <li>
                                    <strong className="text-white">Access Rights:</strong> We may sell access to, or directly provide, your uploaded data to event sponsors, partner employers, and recruitment agencies.
                                </li>
                                <li>
                                    <strong className="text-white">Purpose:</strong> This data is shared specifically for the purposes of recruitment, internship opportunities, and professional networking.
                                </li>
                                <li>
                                    <strong className="text-white">Third-Party Privacy:</strong> Once your data is shared with a partner, it becomes subject to that partner’s privacy policy. UVic Hacks is not responsible for how third parties manage your data after the transfer.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-4">
                            <span className="text-gold-500">03</span> US Data Storage & Hosting
                        </h2>
                        <div className="space-y-4 text-neutral-400 text-base leading-relaxed pl-10">
                            <p>
                                <strong className="text-white">Infrastructure:</strong> Our servers and databases are hosted via Render and Google Cloud Platform (GCP), with data centers located in the United States.
                            </p>
                            <p>
                                <strong className="text-white">Cross-Border Transfer:</strong> As a user (potentially outside the US), you explicitly consent to the transfer and storage of your personal information on US-based servers. You acknowledge that US privacy laws may differ from those in your home jurisdiction.
                            </p>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-4">
                            <span className="text-gold-500">04</span> User Rights and Deletion
                        </h2>
                        <div className="space-y-4 text-neutral-400 text-base leading-relaxed pl-10">
                            <p>
                                <strong className="text-white">Opt-Out:</strong> You may request to have your data removed from our active database at any time by contacting us through our official channels.
                            </p>
                            <p>
                                <strong className="text-white">Historical Data:</strong> We cannot "claw back" data that has already been shared with or downloaded by employers prior to your deletion request.
                            </p>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-4">
                            <span className="text-gold-500">05</span> Limitation of Liability
                        </h2>
                        <div className="space-y-4 text-neutral-400 text-base leading-relaxed pl-10 border-t border-neutral-900 pt-8">
                            <p className="italic">
                                UVic Hacks provides this platform "as is." We do not guarantee employment, and we are not liable for any disputes that arise between you and the employers who access your data.
                            </p>
                        </div>
                    </section>

                </div>

                {/* Footer CTA */}
                <div className="mt-24 pt-12 border-t border-neutral-900 text-center">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-8">
                        Ready to join the sprint?
                    </p>
                    <Link
                        href="/join/inspire-2026"
                        className="inline-block bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold-500 transition-colors"
                    >
                        Return to Registration
                    </Link>
                </div>
            </section>
        </main>
    );
}