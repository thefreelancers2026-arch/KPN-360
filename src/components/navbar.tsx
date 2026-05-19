"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-500",
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* ─── Logo ─── */}
        <Link href="/" className="group flex items-baseline gap-1.5">
          <span className="font-heading text-lg font-bold tracking-tight text-[#E8E6E1] group-hover:text-[#aad1a6] transition-colors">
            VAADIVAASAL
          </span>
          <span className="font-heading text-[10px] font-medium tracking-[0.25em] text-[#e4c377] uppercase">
            TURF
          </span>
        </Link>

        {/* ─── Desktop Links ─── */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Arena", href: "#arena" },
            { label: "Rates", href: "#rates" },
            { label: "Reserve", href: "#booking" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover-line text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-[#8c9389] hover:text-[#E8E6E1] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#booking"
            className="ml-2 px-5 py-2 bg-[#1E3F20] text-[#c5edc1] text-[11px] font-sans font-medium tracking-[0.15em] uppercase hover:bg-[#2d5a30] transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* ─── Mobile Toggle ─── */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-[#E8E6E1] transition-all duration-300 origin-center",
              open && "rotate-45 translate-y-[3.5px]"
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-[#E8E6E1] transition-all duration-300 origin-center",
              open && "-rotate-45 -translate-y-[3.5px]"
            )}
          />
        </button>
      </div>

      {/* ─── Mobile Menu ─── */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-0 bg-[#0A0A0A] z-[90] flex flex-col justify-center items-center gap-12 transition-all duration-500",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {[
          { label: "The Arena", href: "#arena" },
          { label: "Rates", href: "#rates" },
          { label: "Reserve", href: "#booking" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-heading text-4xl font-bold tracking-tight text-[#E8E6E1] hover:text-[#aad1a6] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
