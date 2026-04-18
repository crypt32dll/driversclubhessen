"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { cdBlock, cdLabel, cdNum, countdown } from "./sections.css";

type Props = {
  countdownEndIso: string;
};

export function HeroCountdown({ countdownEndIso }: Props) {
  const { days, hours, minutes, seconds, isLive } =
    useCountdown(countdownEndIso);

  if (isLive) {
    return (
      <div className={countdown}>
        <div className={cdBlock}>
          <span className={cdNum}>JETZT LIVE</span>
        </div>
      </div>
    );
  }

  return (
    <div className={countdown}>
      {[
        { value: days, label: "Tage" },
        { value: hours, label: "Stunden" },
        { value: minutes, label: "Minuten" },
        { value: seconds, label: "Sekunden" },
      ].map((entry) => (
        <div key={entry.label} className={cdBlock}>
          <span className={cdNum}>{entry.value}</span>
          <span className={cdLabel}>{entry.label}</span>
        </div>
      ))}
    </div>
  );
}
