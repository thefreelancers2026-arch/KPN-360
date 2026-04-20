export type SlotStatus = 'available' | 'blocked' | 'requested';

export interface Slot {
  id: string; // YYYY-MM-DD-HH
  date: string; // YYYY-MM-DD
  time: string; // HH:MM - HH:MM
  status: SlotStatus;
  priceOverride?: number;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  playersCount?: number;
  slotId: string;
  slotDate: string;
  slotTime: string;
  status: 'initiated' | 'pending' | 'confirmed' | 'cancelled';
  createdAt: any; // Firestore Timestamp
}
