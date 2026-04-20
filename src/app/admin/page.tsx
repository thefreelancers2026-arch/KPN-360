"use client";

import { useState, useEffect } from "react";
import { format, startOfDay } from "date-fns";
import { db } from "@/lib/firebase";
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  orderBy,
  where
} from "firebase/firestore";
import { Slot, Lead } from "@/types/booking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Calendar as CalendarIcon, Users, Lock, Unlock } from "lucide-react";

const TIME_SLOTS = [
  "06:00 - 07:00", "07:00 - 08:00", "08:00 - 09:00", "09:00 - 10:00",
  "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00",
  "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00", "17:00 - 18:00",
  "18:00 - 19:00", "19:00 - 20:00", "20:00 - 21:00", "21:00 - 22:00",
  "22:00 - 23:00", "23:00 - 00:00"
];

export default function AdminDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({ total: 0, today: 0 });

  useEffect(() => {
    // Listen to Leads
    const qLeads = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    const unsubLeads = onSnapshot(qLeads, (snapshot) => {
      const fetchedLeads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Lead);
      setLeads(fetchedLeads);
      
      const today = fetchedLeads.filter(l => {
        const d = l.createdAt?.toDate();
        return d && isSameDay(d, new Date());
      }).length;
      
      setStats({ total: fetchedLeads.length, today });
    });

    return () => unsubLeads();
  }, []);

  useEffect(() => {
    if (!date) return;
    const dateStr = format(date, "yyyy-MM-dd");
    const qSlots = query(collection(db, "slots"), where("date", "==", dateStr));
    
    const unsubSlots = onSnapshot(qSlots, (snapshot) => {
      setSlots(snapshot.docs.map(doc => doc.data() as Slot));
    });

    return () => unsubSlots();
  }, [date]);

  const toggleSlot = async (time: string) => {
    if (!date) return;
    const dateStr = format(date, "yyyy-MM-dd");
    const slotId = `${dateStr}-${time.split(':')[0]}`;
    const existingSlot = slots.find(s => s.time === time);

    if (existingSlot && existingSlot.status === 'blocked') {
      // Unblock (Delete doc)
      await deleteDoc(doc(db, "slots", slotId));
    } else {
      // Block (Create doc)
      await setDoc(doc(db, "slots", slotId), {
        id: slotId,
        date: dateStr,
        time: time,
        status: 'blocked'
      });
    }
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-black font-space-grotesk tracking-tight uppercase">
              Admin <span className="text-[#adff2f]">Dashboard</span>
            </h1>
            <p className="text-gray-400">Manage your turf bookings and leads.</p>
          </div>
          <div className="flex gap-4">
            <Card className="bg-[#0a0a0a] border-white/5 px-6 py-2">
              <p className="text-xs text-gray-500 uppercase font-bold">Today's Leads</p>
              <p className="text-2xl font-black text-[#adff2f]">{stats.today}</p>
            </Card>
            <Card className="bg-[#0a0a0a] border-white/5 px-6 py-2">
              <p className="text-xs text-gray-500 uppercase font-bold">Total Leads</p>
              <p className="text-2xl font-black text-white">{stats.total}</p>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="slots" className="space-y-6">
          <TabsList className="bg-[#0a0a0a] border border-white/10 p-1 h-12">
            <TabsTrigger value="slots" className="gap-2 px-6 data-[state=active]:bg-[#adff2f] data-[state=active]:text-black">
              <CalendarIcon className="w-4 h-4" />
              Slot Management
            </TabsTrigger>
            <TabsTrigger value="leads" className="gap-2 px-6 data-[state=active]:bg-[#adff2f] data-[state=active]:text-black">
              <Users className="w-4 h-4" />
              Leads Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="slots" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <Card className="lg:col-span-4 bg-[#0a0a0a] border-white/5 p-4 h-fit">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </Card>

            <Card className="lg:col-span-8 bg-[#0a0a0a] border-white/5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Slots for {date && format(date, "dd MMM yyyy")}</span>
                  <Badge variant="outline" className="border-[#adff2f]/20 text-[#adff2f]">
                    Click to Toggle Block
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {TIME_SLOTS.map((time) => {
                  const isBlocked = slots.some(s => s.time === time && s.status === 'blocked');
                  return (
                    <Button
                      key={time}
                      variant={isBlocked ? "destructive" : "outline"}
                      onClick={() => toggleSlot(time)}
                      className={`h-16 font-bold transition-all ${
                        isBlocked 
                          ? "bg-red-500 hover:bg-red-600" 
                          : "bg-black hover:bg-[#adff2f] hover:text-black border-white/5"
                      }`}
                    >
                      {isBlocked ? <Lock className="mr-2 w-4 h-4" /> : <Unlock className="mr-2 w-4 h-4" />}
                      {time.split(' - ')[0]}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card className="bg-[#0a0a0a] border-white/5 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-bold">Date & Time</TableHead>
                    <TableHead className="text-gray-400 font-bold">Customer</TableHead>
                    <TableHead className="text-gray-400 font-bold">Phone</TableHead>
                    <TableHead className="text-gray-400 font-bold">Players</TableHead>
                    <TableHead className="text-gray-400 font-bold text-right">Requested On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="border-white/5 hover:bg-white/5">
                      <TableCell className="font-bold">
                        {lead.slotDate} <br />
                        <span className="text-[#adff2f] text-xs uppercase">{lead.slotTime}</span>
                      </TableCell>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell className="font-mono text-gray-400">{lead.phone}</TableCell>
                      <TableCell>{lead.playersCount}</TableCell>
                      <TableCell className="text-right text-xs text-gray-500">
                        {lead.createdAt?.toDate() ? format(lead.createdAt.toDate(), "dd MMM, HH:mm") : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                  {leads.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                        No leads generated yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
