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
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex justify-center pointer-events-none px-0 md:px-6 md:bottom-8 animate-in slide-in-from-bottom-full duration-500 fade-in-0">
      <div className="w-full md:w-auto md:min-w-[480px] flex shadow-[0_0_40px_rgba(0,0,0,0.8)] border-t md:border border-[#424840]/30 pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-md">
        {/* TODO: 91 96555 50051 placeholder */}
        <a
          href="https://wa.me/919655550051"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 md:py-5 bg-[#1E3F20] hover:bg-[#2d5a30] text-[#c5edc1] font-sans text-[11px] font-medium tracking-[0.2em] uppercase transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Book on WhatsApp</span>
        </a>
        <Link
          href="#booking"
          className="flex-1 flex items-center justify-center gap-2 py-4 md:py-5 bg-[#e4c377] hover:bg-white text-[#0A0A0A] font-sans text-[11px] font-bold tracking-[0.15em] uppercase transition-colors"
        >
          <CalendarDays className="w-4 h-4" />
          <span>Pick a Slot</span>
        </Link>
      </div>
    </div>
  );
}
