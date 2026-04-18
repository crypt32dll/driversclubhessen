import {
  ticker,
  tickerItem,
  tickerTrack,
} from "@/components/sections/sections.ticker.css";

const DEFAULT_ITEMS = [
  "EINTRITT FREI",
  "19.04.2026",
  "BIRSTEIN",
  "12:00 – 20:00 UHR",
  "JEDER IST WILLKOMMEN",
  "BENZINGESPRÄCHE",
  "ESSEN & GETRÄNKE",
  "DRIVERSCLUB HESSEN",
] as const;

type Props = {
  /** CMS-driven ticker lines; falls back to marketing defaults when empty. */
  items?: readonly string[];
};

export const Ticker = ({ items }: Props) => {
  const source = items && items.length > 0 ? items : [...DEFAULT_ITEMS];
  const track = [
    ...source.map((text) => ({ text, key: `t1-${text}` })),
    ...source.map((text) => ({ text, key: `t2-${text}` })),
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
