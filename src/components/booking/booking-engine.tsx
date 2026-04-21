"use client";

import { useState, useEffect } from "react";
import { format, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { MessageCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Slot, SlotStatus, Lead } from "@/types/booking";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReveal } from "@/lib/use-reveal";

const TIME_SLOTS = [
  { display: "6 AM",   range: "6:00 AM – 7:00 AM",   key: "06:00 - 07:00" },
  { display: "7 AM",   range: "7:00 AM – 8:00 AM",   key: "07:00 - 08:00" },
  { display: "8 AM",   range: "8:00 AM – 9:00 AM",   key: "08:00 - 09:00" },
  { display: "9 AM",   range: "9:00 AM – 10:00 AM",  key: "09:00 - 10:00" },
  { display: "10 AM",  range: "10:00 AM – 11:00 AM", key: "10:00 - 11:00" },
  { display: "11 AM",  range: "11:00 AM – 12:00 PM", key: "11:00 - 12:00" },
  { display: "12 PM",  range: "12:00 PM – 1:00 PM",  key: "12:00 - 13:00" },
  { display: "1 PM",   range: "1:00 PM – 2:00 PM",   key: "13:00 - 14:00" },
  { display: "2 PM",   range: "2:00 PM – 3:00 PM",   key: "14:00 - 15:00" },
  { display: "3 PM",   range: "3:00 PM – 4:00 PM",   key: "15:00 - 16:00" },
  { display: "4 PM",   range: "4:00 PM – 5:00 PM",   key: "16:00 - 17:00" },
  { display: "5 PM",   range: "5:00 PM – 6:00 PM",   key: "17:00 - 18:00" },
  { display: "6 PM",   range: "6:00 PM – 7:00 PM",   key: "18:00 - 19:00" },
  { display: "7 PM",   range: "7:00 PM – 8:00 PM",   key: "19:00 - 20:00" },
  { display: "8 PM",   range: "8:00 PM – 9:00 PM",   key: "20:00 - 21:00" },
  { display: "9 PM",   range: "9:00 PM – 10:00 PM",  key: "21:00 - 22:00" },
  { display: "10 PM",  range: "10:00 PM – 11:00 PM", key: "22:00 - 23:00" },
  { display: "11 PM",  range: "11:00 PM – 12:00 AM", key: "23:00 - 00:00" },
];

const OWNER_PHONE = "919000000000"; // Update before production

export default function BookingEngine() {
  const ref = useReveal();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<typeof TIME_SLOTS[0] | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [players, setPlayers] = useState("10");

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    if (!db) {
      console.warn("Database not connected. Showing empty slots.");
      setLoading(false);
      return;
    }
    const dateStr = format(date, "yyyy-MM-dd");
    const q = query(collection(db, "slots"), where("date", "==", dateStr));
    const unsub = onSnapshot(q, (snap) => {
      setSlots(snap.docs.map((d) => d.data() as Slot));
      setLoading(false);
    });
    return () => unsub();
  }, [date]);

  useEffect(() => {
    const handlePreselect = (e: CustomEvent<{ slotTime: string }>) => {
      const slot = TIME_SLOTS.find(s => s.key === e.detail.slotTime);
      if (slot) {
        setSelectedSlot(slot);
        setIsFormOpen(true);
      }
      
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.classList.add("bg-[#1E3F20]/10");
        bookingSection.style.transition = "background-color 0.5s ease";
        setTimeout(() => {
          bookingSection.classList.remove("bg-[#1E3F20]/10");
        }, 1000);
      }
    };
    window.addEventListener('preselectSlot', handlePreselect as EventListener);
    return () => window.removeEventListener('preselectSlot', handlePreselect as EventListener);
  }, []);

  const getStatus = (key: string): SlotStatus => {
    const s = slots.find((s) => s.time === key);
    return s ? s.status : "available";
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedSlot || !name || !phone) return;

    const leadData: Lead = {
      name,
      phone,
      playersCount: parseInt(players),
      slotId: `${format(date, "yyyy-MM-dd")}-${selectedSlot.key.split(":")[0]}`,
      slotDate: format(date, "dd MMM yyyy"),
      slotTime: selectedSlot.range,
      status: "initiated",
      createdAt: serverTimestamp(),
    };

    try {
      if (db) {
        await addDoc(collection(db, "leads"), leadData);
      } else {
        console.warn("Database not connected. Skipping save, but redirecting to WhatsApp.");
      }
      const msg = `Hey! 🏟️ I'd like to book KPN 360 Turf.\n\n📅 Date: ${leadData.slotDate}\n⏰ Time: ${selectedSlot.range}\n👤 Name: ${name}\n👥 Players: ${players}\n\nPlease confirm!`;
      window.open(
        `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
      setIsFormOpen(false);
      setName("");
      setPhone("");
      setPlayers("10");
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  return (
    <section
      id="booking"
      ref={ref}
      className="relative bg-[#141414] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#424840]/30 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* ─── Header ─── */}
        <div className="reveal mb-6">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-[1px] bg-[#e4c377]" />
            <span className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
              Takes 30 Seconds
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white max-w-lg mb-6">
            Pick a time. Own the pitch.
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e4c377]/10 border border-[#e4c377]/20 align-middle">
            <span className="text-[#e4c377] text-sm leading-none">⚡</span>
            <span className="font-sans text-[10px] font-medium tracking-[0.05em] uppercase text-[#e4c377]">
              Prime slots (6 PM–10 PM) fill up 2 days in advance. Book early.
            </span>
          </div>
        </div>
        <p className="reveal font-sans text-[13px] font-light text-[#8c9389] mb-16 max-w-md leading-relaxed">
          The best slots go fast — especially after 6 PM. Lock yours in before someone else does.
        </p>

        {/* ─── Booking Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Calendar */}
          <div className="lg:col-span-4 reveal">
            <div className="space-y-6 max-w-[320px]">
              <div className="space-y-1">
                <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#8c9389]">
                  Step 01
                </span>
                <h3 className="font-heading text-lg font-bold text-[#E8E6E1]">
                  When are you playing?
                </h3>
              </div>
              <div className="bg-[#0E0E0E] p-4 md:p-6 border border-[#2A2A2A] flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="text-[#E8E6E1]"
                  disabled={(d) => d < startOfDay(new Date())}
                  showOutsideDays={false}
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-[1px] bg-[#424840]/20 h-full" />
          </div>

          {/* Slots */}
          <div className="lg:col-span-7 reveal">
            <div className="space-y-6">
              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#8c9389]">
                    Step 02
                  </span>
                  <h3 className="font-heading text-lg font-bold text-[#E8E6E1]">
                    Grab your slot
                  </h3>
                </div>
                <span suppressHydrationWarning className="font-sans text-sm font-light text-[#8c9389] italic">
                  {date ? format(date, "EEEE, MMM do") : "—"}
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-[1px] bg-[#2A2A2A]">
                {TIME_SLOTS.map((slot) => {
                  const blocked = getStatus(slot.key) === "blocked";
                  return (
                    <button
                      key={slot.key}
                      disabled={blocked}
                      onClick={() => {
                        setSelectedSlot(slot);
                        setIsFormOpen(true);
                      }}
                      className={`py-5 min-h-[48px] font-sans text-[11px] md:text-xs tracking-wider transition-all duration-300 ${
                        blocked
                          ? "bg-[#0A0A0A] text-[#2A2A2A] line-through cursor-not-allowed"
                          : "bg-[#141414] text-[#E8E6E1] hover:bg-[#e4c377] hover:text-[#0A0A0A] font-medium"
                      }`}
                    >
                      {slot.display}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Booking Modal ─── */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-none text-[#E8E6E1] sm:max-w-[420px] p-0 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="px-8 pt-10 pb-6 bg-[#0E0E0E] border-b border-[#2A2A2A]">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-[#e4c377]" />
              <span className="font-sans text-[9px] font-medium tracking-[0.3em] uppercase text-[#e4c377]">
                Final Step
              </span>
            </div>
            <DialogTitle className="font-heading text-2xl font-bold tracking-tight text-white mb-2">
              Lock in your session.
            </DialogTitle>
            <DialogDescription suppressHydrationWarning className="font-sans text-[13px] font-light tracking-wide text-[#8c9389]">
              {date && format(date, "EEEE, MMMM do")} — <strong className="text-white font-medium">{selectedSlot?.range}</strong>
            </DialogDescription>
          </div>

          <form onSubmit={handleBooking} className="px-8 py-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#8c9389]">
                  Captain's Name
                </Label>
                <Input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Who's leading the squad?"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-none px-4 h-12 font-sans text-[15px] font-light text-white placeholder:text-[#555] focus-visible:ring-1 focus-visible:ring-[#e4c377] focus-visible:border-[#e4c377] shadow-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <Label className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#8c9389]">
                  WhatsApp Number
                </Label>
                <Input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="We'll confirm here"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-none px-4 h-12 font-sans text-[15px] font-light text-white placeholder:text-[#555] focus-visible:ring-1 focus-visible:ring-[#e4c377] focus-visible:border-[#e4c377] shadow-none transition-all"
                />
              </div>
              <div className="space-y-3">
                <Label className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-[#8c9389]">
                  Squad Size
                </Label>
                <Input
                  type="number"
                  value={players}
                  onChange={(e) => setPlayers(e.target.value)}
                  placeholder="How deep is your bench?"
                  className="bg-[#141414] border border-[#2A2A2A] rounded-none px-4 h-12 font-sans text-[15px] font-light text-white placeholder:text-[#555] focus-visible:ring-1 focus-visible:ring-[#e4c377] focus-visible:border-[#e4c377] shadow-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-[#e4c377] text-[#0A0A0A] font-sans text-[12px] font-bold tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300 group"
            >
              <MessageCircle className="w-4 h-4 text-[#0A0A0A] group-hover:scale-110 transition-transform" />
              Confirm on WhatsApp
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
