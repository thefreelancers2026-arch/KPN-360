"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

export default function Hero() {
  const ref = useReveal();

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* ─── Full-bleed cinematic image ─── */}
      <div className="absolute inset-0">
        <Image
          src="/hero-cinematic.png"
          alt="KPN 360 Turf — 360° enclosed arena under floodlights"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Left: headline */}
          <div className="md:col-span-7 space-y-8">
            <div className="reveal flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#e4c377]" />
              <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                Virudhachalam's Only 360° Arena
              </span>
            </div>

            <h1 className="reveal">
              <span className="block font-heading text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                PLAY LIKE
              </span>
              <span className="block font-heading text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                IT MATTERS.
              </span>
            </h1>

            <p className="reveal max-w-md font-sans text-sm font-light leading-[1.8] text-[#8c9389]">
              11,500 sq.ft of FIFA-grade pitch. Caged on all four sides.
              Lit like a final. This isn't a ground — it's your proving ground.
            </p>

            <div className="reveal pt-4">
              <Link
                href="#booking"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#1E3F20] text-[#c5edc1] font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#2d5a30] hover:gap-5"
              >
                Claim Your Hour
                <ArrowDownRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right: Ghost stat */}
          <div className="md:col-span-5 reveal hidden md:flex flex-col items-end text-right">
            <span className="font-heading text-[8rem] font-bold leading-none tracking-[-0.06em] text-white/[0.06]">
              360°
            </span>
            <div className="-mt-8 space-y-1">
              <span className="block font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                Full Cage Enclosure
              </span>
              <span className="block font-sans text-xs font-light text-[#8c9389]">
                21st 360° turf in Tamil Nadu
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#424840] to-transparent" />
    </section>
  );
}
