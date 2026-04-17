"use client";

import { useEffect, useMemo, useState } from "react";

type Countdown = {
  isLive: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const ZERO: Countdown = {
  isLive: false,
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export const useCountdown = (targetIsoDate: string): Countdown => {
  const target = useMemo(() => new Date(targetIsoDate), [targetIsoDate]);
  const [countdown, setCountdown] = useState<Countdown>(ZERO);

  useEffect(() => {
    const update = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setCountdown({ ...ZERO, isLive: true });
        return;
      }

      const days = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff % 86_400_000) / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000) / 60_000);
      const seconds = Math.floor((diff % 60_000) / 1000);

      setCountdown({
        isLive: false,
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  return countdown;
};
