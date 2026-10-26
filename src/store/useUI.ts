"use client";

import { create } from "zustand";

export type CursorVariant = "default" | "view" | "hidden";

interface UIState {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  toggleBooking: () => void;

  cursorVariant: CursorVariant;
  cursorText: string | null;
  setCursorVariant: (variant: CursorVariant) => void;
  setCursorText: (text: string | null) => void;

  referralCode: string | null;
  setReferralCode: (code: string | null) => void;

  introSeen: boolean;
  setIntroSeen: () => void;
}

export const useUI = create<UIState>((set) => ({
  isBookingOpen: false,
  openBooking: () => set({ isBookingOpen: true }),
  closeBooking: () => set({ isBookingOpen: false }),
  toggleBooking: () => set((state) => ({ isBookingOpen: !state.isBookingOpen })),

  cursorVariant: "default",
  cursorText: null,
  setCursorVariant: (cursorVariant) => set({ cursorVariant }),
  setCursorText: (cursorText) => set({ cursorText }),

  referralCode: null,
  setReferralCode: (referralCode) => set({ referralCode }),

  introSeen: false,
  setIntroSeen: () => set({ introSeen: true }),
}));
