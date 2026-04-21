"use client";

import { useEffect, useState } from "react";

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
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25) {
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
      style={{
        position: "fixed",
        bottom: "1.75rem",
        left: "50%",
        transform: isVisible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(calc(100% + 2rem))",
        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        zIndex: 50,
        width: "max-content",
        maxWidth: "calc(100vw - 2rem)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          background: "rgba(10, 10, 10, 0.92)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(228, 195, 119, 0.18)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
        }}
      >
        {/* WhatsApp */}
        {/* TODO: replace with actual WhatsApp number */}
        <a
          href="https://wa.me/919655550051"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.875rem 1.75rem",
            color: "#c5edc1",
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.2s ease, color 0.2s ease",
            minHeight: "44px",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(30,63,32,0.6)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          {/* WhatsApp SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#4ade80">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Book on WhatsApp
        </a>

        {/* Vertical divider */}
        <div style={{ width: "1px", background: "rgba(66, 72, 64, 0.5)", flexShrink: 0 }} />

        {/* Pick a Slot */}
        <a
          href="#booking"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.875rem 1.75rem",
            color: "#e4c377",
            fontFamily: "var(--font-sans, sans-serif)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "background 0.2s ease, color 0.2s ease",
            minHeight: "44px",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = "#ffd875";
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(228,195,119,0.06)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.color = "#e4c377";
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
          }}
        >
          {/* Calendar SVG */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Pick a Slot
        </a>
      </div>
    </div>
  );
}
