"use client";

import { useEffect, useState } from "react";
import { MessageCircle, CalendarDays } from "lucide-react";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh80 = window.innerHeight * 0.8;
      const bookingEl = document.getElementById("booking");

      let past80vh = scrollY > vh80;
      let atBooking = false;

      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.2) {
          atBooking = true;
        }
      }

      setIsVisible(past80vh && !atBooking);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Top hairline */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#424840]/50 to-transparent" />

      <div className="bg-[#0A0A0A]/90 backdrop-blur-md flex">
        {/* TODO: replace with actual WhatsApp number */}
        <a
          href="https://wa.me/919655550051"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 py-4 md:py-5 bg-[#1E3F20] hover:bg-[#2d5a30] text-[#c5edc1] font-sans text-[10px] font-medium tracking-[0.25em] uppercase transition-colors duration-300 min-h-[44px]"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
          Book on WhatsApp
        </a>

        {/* Divider */}
        <div className="w-[1px] bg-[#424840]/40 shrink-0" />

        <a
          href="#booking"
          className="flex-1 flex items-center justify-center gap-2.5 py-4 md:py-5 bg-[#e4c377] hover:bg-[#ffd875] text-[#0A0A0A] font-sans text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 min-h-[44px]"
        >
          <CalendarDays className="w-3.5 h-3.5 shrink-0" />
          Pick a Slot
        </a>
      </div>
    </div>
  );
}
