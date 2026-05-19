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
          alt="Vaadivaasal Eco-Friendly Turf — enclosed arena under floodlights"
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

            <div className="reveal pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="#booking"
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#1E3F20] text-[#c5edc1] font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#2d5a30] hover:gap-5"
              >
                Claim Your Hour
                <ArrowDownRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
              {/* TODO: replace with actual WhatsApp number */}
              <a
                href="https://wa.me/919655550051"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3.5 border border-white/60 text-white font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#25D366] hover:border-[#25D366] hover:text-white"
              >
                <span className="shrink-0 w-4 h-4 text-white group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </span>
                WhatsApp Us
              </a>
            </div>

            {/* Social Proof Strip */}
            <div className="reveal pt-4 mt-6 border-t border-[#424840]/20 flex flex-col items-start md:flex-row md:items-center gap-3 md:gap-5 inline-block">
              <div className="flex items-center gap-2">
                <span className="text-[#e4c377] text-sm tracking-widest leading-none">★★★★★</span>
                <span className="font-sans text-[11px] font-light text-[#8c9389]">
                  Rated 4.7 by 120+ players on Justdial
                </span>
              </div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-[#424840]/50" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4ade80]"></span>
                </span>
                <span className="font-sans text-[11px] font-medium text-[#8c9389]">
                  3 slots booked today
                </span>
              </div>
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
