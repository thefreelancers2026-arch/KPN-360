"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
        // Disappear if the booking section is taking up a significant portion of the screen
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

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 md:px-0 py-4 md:py-6 bg-[rgba(0,0,0,0.85)] backdrop-blur-md border-t border-[#424840]/30 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "translate-y-[100%]"
      }`}
    >
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
        {/* TODO: replace with actual WhatsApp number */}
        <a
          href="https://wa.me/919655550051"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-[12px] bg-[#25D366] text-white rounded-[12px] font-sans text-sm font-semibold tracking-wide hover:bg-[#1EBE5A] transition-colors min-h-[44px]"
        >
          <span>📲 WhatsApp Us</span>
        </a>
        <a
          href="#booking"
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-[12px] bg-[#e4c377] text-[#0A0A0A] rounded-[12px] font-sans text-sm font-bold tracking-wide hover:bg-[#ffdf98] transition-colors min-h-[44px]"
        >
          <span>Pick a Slot →</span>
        </a>
      </div>
    </div>
  );
}
