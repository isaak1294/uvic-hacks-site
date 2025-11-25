import type { ReactNode } from "react";
import "./globals.css";
import { Montserrat, Archivo, Fira_Code } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UVic Hacks",
  description:
    "UVic Hacks is a student-run hackathon club at the University of Victoria. Code. Learn. Compete.",

  metadataBase: new URL("https://uvichacks.com"),

  keywords: ["hackathon", "networking", "uvic", "career", "hackathons", "competition", "hacks"],

  openGraph: {
    title: "UVic Hacks",
    description:
      "Code. Learn. Compete. Showcase your talent on UVic's biggest stage.",
    url: "https://uvichacks.com",
    siteName: "UVic Hacks",
    images: [
      {
        url: "/images/og-v2.png",
        width: 1200,
        height: 630,
        alt: "UVic Hacks — hackathon club at UVic",
      },
    ],
    locale: "en_CA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "UVic Hacks",
    description:
      "Code. Learn. Compete. UVic's student-run hackathon club.",
    images: ["/images/og-v2.png"],
  },

  icons: {
    icon: "/favicon.svg",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  }
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${archivo.variable} ${firaCode.variable} font-sans bg-zinc-950 text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
