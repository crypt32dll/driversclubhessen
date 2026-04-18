import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomepageFeaturesBlockView } from "@driversclub/shared";
import {
  feature,
  featureIcon,
  featureText,
  featureTitle,
  featuresGrid,
  featuresSection,
  sectionLabel,
  sectionTitle,
  sectionTitleAccent,
} from "@/components/sections/sections.css";

const DEFAULT_ICONS = ["🚗", "⛽", "🍔", "👥", "📸", "🔥"] as const;

const FALLBACK_FEATURES = [
  {
    icon: "🚗",
    title: "Autos schauen & austauschen",
    description:
      "Sieh dir die geilsten Builds aus der Region an. Von Daily-Tuning bis Showcar – hier ist alles dabei.",
  },
  {
    icon: "⛽",
    title: "Benzingespräche",
    description:
      "Quatscht über Builds, Mods, Erfahrungen. Trefft Gleichgesinnte, tauscht euch aus, knüpft neue Kontakte.",
  },
  {
    icon: "🍔",
    title: "Essen & Getränke",
    description:
      "Ausreichend Essen und Getränke vor Ort – ihr müsst euch um nichts kümmern.",
  },
  {
    icon: "👥",
    title: "Community",
    description:
      "Jeder ist willkommen – egal welche Marke, welcher Build. Hier verbindet uns die Leidenschaft fürs Auto.",
  },
  {
    icon: "📸",
    title: "Content & Fotos",
    description:
      "Perfekte Kulisse für deinen Content. Hol dir die besten Shots deines Rides auf dem Gelände.",
  },
  {
    icon: "🔥",
    title: "Geile Atmosphäre",
    description:
      "Ein Event mit Familie, Leidenschaft und Szene. Komm vorbei und hab eine geile Zeit!",
  },
] as const;

type Props = { block: HomepageFeaturesBlockView };

export function HomepageFeaturesBlock({ block }: Props) {
  const sectionL = block.sectionLabel ?? "Highlights";
  const lead = block.titleLead ?? "Was auf dich ";
  const accent = block.titleAccent ?? "wartet";
  const rows =
    block.items.length > 0
      ? block.items.map((item, index) => ({
          key: `${item.title}-${index}`,
          icon: item.icon ?? DEFAULT_ICONS[index % DEFAULT_ICONS.length],
          title: item.title,
          text: item.description,
          imageUrl: item.iconImage?.url,
        }))
      : FALLBACK_FEATURES.map((item, index) => ({
          key: `fb-${index}`,
          icon: item.icon,
          title: item.title,
          text: item.description,
          imageUrl: undefined as string | undefined,
        }));

  return (
    <section className={featuresSection} id="features">
      <Container>
        <Reveal>
          <p className={sectionLabel}>{sectionL}</p>
          <h2 className={sectionTitle}>
            {lead}
            <span className={sectionTitleAccent}>{accent}</span>
          </h2>
        </Reveal>
        <div className={featuresGrid}>
          {rows.map((item) => (
            <Reveal key={item.key} className={feature}>
              <div className={featureIcon}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt=""
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  item.icon
                )}
              </div>
              <div className={featureTitle}>{item.title}</div>
              <div className={featureText}>{item.text}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
