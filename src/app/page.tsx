import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";
import Showcase from "@/components/sections/showcase";
import Pricing from "@/components/sections/pricing";
import BookingEngine from "@/components/booking/booking-engine";
import Link from "next/link";
import { AtSign, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Showcase />
      <Pricing />
      <BookingEngine />

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="relative bg-[#0A0A0A] pt-24 pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#424840]/30 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* CTA Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
            <div className="md:col-span-7">
              <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.1]">
                Lace up.
                <br />
                Lock in.
                <br />
                Show up.
              </h2>
            </div>
            <div className="md:col-span-5 flex flex-col justify-end items-start md:items-end gap-6">
              <p className="font-sans text-sm font-light text-[#8c9389] md:text-right max-w-xs">
                The pitch doesn't wait. Neither should you.
              </p>
              <Link
                href="#booking"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#1E3F20] text-[#c5edc1] font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#2d5a30] hover:gap-5"
              >
                Book Your Hour
                <span className="w-4 h-[1px] bg-[#c5edc1] group-hover:w-6 transition-all" />
              </Link>
            </div>
          </div>

          {/* Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-[#424840]/15">
            <div className="space-y-2">
              <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                Find Us
              </span>
              <p className="font-sans text-sm font-light text-[#8c9389] leading-relaxed flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#424840]" />
                Anna Nagar, Kuppanatham,
                <br />
                Virudhachalam, Tamil Nadu 606001
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                Follow the Game
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/kpn360turf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-line inline-flex items-center gap-2 font-sans text-sm font-light text-[#8c9389] hover:text-[#E8E6E1] transition-colors"
                >
                  <AtSign className="w-3.5 h-3.5" />
                  kpn360turf
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                Arena Partner
              </span>
              <p className="font-sans text-sm font-light text-[#8c9389]">
                Powered by GameOn Solution
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#424840]/10">
            <span suppressHydrationWarning className="font-sans text-[10px] font-light text-[#424840] tracking-wider">
              © {new Date().getFullYear()} KPN 360° Turf. All rights reserved.
            </span>
            <span className="font-heading text-[10px] font-medium tracking-[0.2em] text-[#424840] uppercase">
              Virudhachalam, Tamil Nadu
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
