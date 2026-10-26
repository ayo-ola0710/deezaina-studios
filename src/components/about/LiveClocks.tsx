"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

interface ClockData {
  city: string;
  country: string;
  timeZone: string;
}

const LOCATIONS: ClockData[] = [
  { city: "LAGOS", country: "Nigeria", timeZone: "Africa/Lagos" },
  { city: "TORONTO", country: "Canada", timeZone: "America/Toronto" },
  { city: "LONDON", country: "United Kingdom", timeZone: "Europe/London" },
];

export default function LiveClocks() {
  const [times, setTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const updated: Record<string, string> = {};

      LOCATIONS.forEach((loc) => {
        try {
          const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone: loc.timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          updated[loc.city] = formatter.format(now);
        } catch {
          updated[loc.city] = "--:--:--";
        }
      });

      setTimes(updated);
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {LOCATIONS.map((loc) => (
        <Card key={loc.city} className="p-6 space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="font-mono text-xs font-bold text-[var(--R)]">
              {loc.country.toUpperCase()}
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--R)] animate-pulse inline-block" />
          </div>

          <div className="font-display font-extrabold text-2xl text-[var(--W)]">
            {loc.city}
          </div>

          <div className="font-mono text-xl sm:text-2xl text-[var(--W)] font-semibold border-t border-[var(--W15)] pt-3">
            {times[loc.city] || "--:--:--"}
          </div>
        </Card>
      ))}
    </div>
  );
}
