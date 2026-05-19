import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Vaadivaasal Eco-Friendly Turf — Virudhachalam",
  description:
    "11,500 Sq.Ft. FIFA Pro certified 360° enclosed sports arena in Virudhachalam. Book your slot instantly via WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="film-grain min-h-full flex flex-col font-sans bg-[#0A0A0A] text-[#E8E6E1] selection:bg-[#1E3F20] selection:text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
