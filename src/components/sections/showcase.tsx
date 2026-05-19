"use client";

import Image from "next/image";
import { useReveal } from "@/lib/use-reveal";

const stats = [
  { value: "11.5K", unit: "SQ.FT", detail: "Enough room to actually play" },
  { value: "360°", unit: "CAGED", detail: "No ball goes out. Ever." },
  { value: "18", unit: "HRS DAILY", detail: "6 AM to midnight. Your call." },
];

const features = [
  {
    label: "The Surface",
    title: "FIFA-grade. Not a marketing gimmick.",
    body: "Eco-friendly certified turf engineered for real grip, real control, and zero excuses. The same standard used in international stadiums — laid right here in Virudhachalam.",
  },
  {
    label: "The Lights",
    title: "Night games that feel like cup finals.",
    body: "High-bay LED floodlights. Every corner lit. Every blade visible. When the sun goes down, the intensity goes up. This is where legends practice.",
  },
  {
    label: "The Program & Events",
    title: "Dedicated coaching & competitive tournaments.",
    body: "Offers dedicated cricket and football coaching classes led by experienced trainers. The venue also frequently hosts regional tournaments and local trophies for the community.",
  },
];

export default function Showcase() {
  const ref = useReveal();

  return (
    <section
      id="arena"
      ref={ref}
      className="relative bg-[#0E0E0E] overflow-hidden"
    >
      {/* ─── STATS ROW ─── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-[#424840]/20">
          {stats.map((s, i) => (
            <div key={i} className="reveal md:px-12 first:md:pl-0 last:md:pr-0">
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-5xl md:text-6xl font-bold tracking-[-0.04em] text-white">
                  {s.value}
                </span>
                <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                  {s.unit}
                </span>
              </div>
              <p className="mt-3 font-sans text-sm font-light text-[#8c9389]">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#424840]/30 to-transparent" />

      {/* ─── EDITORIAL SPLIT ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 relative h-[500px] lg:h-auto overflow-hidden reveal">
          <Image
            src="/hero-night-v4.png"
            alt="Vaadivaasal Eco-Friendly Turf interior night view"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E0E0E] hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent lg:hidden" />

          <div className="absolute top-6 left-6 px-3 py-1.5 bg-[#0A0A0A]/80 backdrop-blur-sm">
            <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
              Built by GameOn Solution
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 py-16 md:py-24 px-6 md:px-12 lg:px-20">
          <div className="reveal flex items-center gap-4 mb-4">
            <span className="w-10 h-[1px] bg-[#e4c377]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
              Why This Arena Hits Different
            </span>
          </div>
          <p className="reveal font-sans text-sm font-light text-[#8c9389] mb-14 max-w-md">
            We didn't build a turf. We built the place you'll brag about playing at.
          </p>

          <div className="reveal-stagger space-y-16">
            {features.map((f, i) => (
              <div key={i} className="reveal group">
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="font-heading text-3xl font-bold text-[#424840] group-hover:text-[#e4c377] transition-colors duration-500 pt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <div className="space-y-3">
                    <span className="font-sans text-[9px] font-medium tracking-[0.25em] uppercase text-[#8c9389] block">
                      {f.label}
                    </span>
                    <h3 className="font-heading text-xl md:text-2xl font-bold text-[#E8E6E1] tracking-tight">
                      {f.title}
                    </h3>
                    <p className="font-sans text-sm font-light leading-[1.8] text-[#8c9389] max-w-lg">
                      {f.body}
                    </p>
                  </div>
                </div>
                {i < features.length - 1 && (
                  <div className="mt-12 h-[1px] bg-[#424840]/15" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── IMAGE BANNER ─── */}
      <div className="w-full mt-24 md:mt-32 relative h-[250px] md:h-[400px] overflow-hidden reveal">
        <Image
          src="/turf-football.png"
          alt="Football on pristine artificial turf at night"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a0a0ade]/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white text-center px-4 uppercase italic">
            Where amateurs come to turn <span className="text-[#e4c377]">pro.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
