import {
  ticker,
  tickerItem,
  tickerTrack,
} from "@/components/sections/sections.ticker.css";

const ITEMS = [
  "EINTRITT FREI",
  "19.04.2026",
  "BIRSTEIN",
  "12:00 – 20:00 UHR",
  "JEDER IST WILLKOMMEN",
  "BENZINGESPRÄCHE",
  "ESSEN & GETRÄNKE",
  "DRIVERSCLUB HESSEN",
] as const;

export const Ticker = () => {
  const track = [
    ...ITEMS.map((text) => ({ text, key: `t1-${text}` })),
    ...ITEMS.map((text) => ({ text, key: `t2-${text}` })),
  ];
  return (
    <div className={ticker} aria-hidden>
      <div className={tickerTrack}>
        {track.map(({ text, key }) => (
          <span key={key} className={tickerItem}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
