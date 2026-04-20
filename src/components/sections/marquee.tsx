"use client";

export default function Marquee() {
  const items = [
    "PREMIUM 360° TURF",
    "ELEVATE YOUR GAME",
    "FIFA CERTIFIED SURFACE",
    "NIGHT MATCHES",
    "VIRUDHACHALAM",
  ];

  return (
    <div className="w-full overflow-hidden bg-[#1E3F20] py-4 select-none">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 whitespace-nowrap font-heading text-[11px] font-medium tracking-[0.3em] uppercase text-[#c5edc1]/80"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-[#e4c377]" />
          </span>
        ))}
      </div>
    </div>
  );
}
