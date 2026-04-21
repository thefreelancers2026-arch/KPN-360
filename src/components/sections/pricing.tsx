"use client";

import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { useReveal } from "@/lib/use-reveal";

const plans = [
  {
    label: "Off-Peak Hours",
    window: "6 AM — 4 PM",
    price: "800",
    unit: "/hr",
    hook: "Same pitch. Smarter price.",
    perks: ["Full FIFA-grade turf", "All amenities included", "Standard lighting", "Walk-ins welcome"],
    highlighted: false,
  },
  {
    label: "Prime Time",
    window: "4 PM — Midnight",
    price: "1,200",
    unit: "/hr",
    hook: "When the floodlights hit, everything changes.",
    perks: [
      "Stadium-grade LED lighting",
      "Full 360° cage enclosure",
      "Peak match atmosphere",
      "Priority booking support",
    ],
    highlighted: true,
  },
  {
    label: "Pro Training",
    window: "Monthly Program",
    price: "1,500",
    unit: "/mo",
    hook: "You don't get better by accident.",
    perks: [
      "Certified coaching staff",
      "Fitness + conditioning",
      "Ball control mastery",
      "Weekly tactical sessions",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useReveal();

  return (
    <section
      id="rates"
      ref={ref}
      className="relative bg-[#0A0A0A] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ─── Header ─── */}
        <div className="reveal grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-20">
          <div className="md:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-[1px] bg-[#e4c377]" />
              <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                No Memberships. No Surprises.
              </span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white">
              Pay when you play.
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <p className="font-sans text-sm font-light leading-[1.8] text-[#8c9389]">
              Flat hourly rates. No signup fees.
              <br />
              No lock-ins. Just show up and dominate.
            </p>
          </div>
        </div>

        {/* ─── Plans ─── */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#424840]/15">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`reveal group relative p-8 md:p-10 transition-colors duration-500 ${
                p.highlighted
                  ? "bg-[#141414]"
                  : "bg-[#0E0E0E] hover:bg-[#141414]"
              }`}
            >
              {p.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#e4c377]" />
              )}

              <div className="space-y-1 mb-6">
                <h3 className="font-heading text-lg font-bold text-[#E8E6E1] tracking-tight">
                  {p.label}
                </h3>
                <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#8c9389]">
                  {p.window}
                </span>
              </div>

              {/* Hook line */}
              <p className="font-sans text-sm italic font-light text-[#e4c377]/70 mb-8">
                "{p.hook}"
              </p>

              <div className="flex items-baseline gap-1 mb-10">
                <span className="font-sans text-[10px] font-light text-[#8c9389] self-start pt-2">
                  ₹
                </span>
                <span className="font-heading text-5xl md:text-6xl font-bold tracking-[-0.04em] text-white">
                  {p.price}
                </span>
                <span className="font-sans text-xs font-light text-[#8c9389]">
                  {p.unit}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {p.perks.map((perk, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 font-sans text-sm font-light text-[#8c9389]"
                  >
                    <span className="w-[3px] h-[3px] rounded-full bg-[#424840] mt-2 shrink-0 group-hover:bg-[#e4c377] transition-colors" />
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                onClick={(e) => {
                  let slotTime = "";
                  if (p.label === "Off-Peak Hours") slotTime = "06:00 - 07:00";
                  else if (p.label === "Prime Time") slotTime = "18:00 - 19:00";
                  else slotTime = "06:00 - 07:00"; // fallback for Pro Training
                  
                  window.dispatchEvent(new CustomEvent('preselectSlot', { detail: { slotTime } }));
                }}
                className="inline-flex items-center gap-2 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#e4c377] hover:text-[#ffdf98] transition-colors group/cta"
              >
                Lock this in
                <ArrowDownRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:translate-y-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
