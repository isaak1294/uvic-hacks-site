import type { ReactNode } from "react";
import "./globals.css";
import { Montserrat, Archivo, Fira_Code } from "next/font/google";

export const metadata = {
  title: "UVic Hacks",
  icons: {
    icon: "/uvic-hacks-icon.svg",
  },
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
