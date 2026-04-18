import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomepageRulesBlockView } from "@driversclub/shared";
import {
  rule,
  ruleIcon,
  ruleText,
  rulesGrid,
  rulesSection,
  sectionLabel,
  sectionTitle,
  sectionTitleAccent,
} from "@/components/sections/sections.css";

const FALLBACK_RULES = [
  { icon: "✅", text: "Angemessenes Verhalten & Einhaltung der StVO" },
  { icon: "✅", text: "Respekt gegenüber allen Teilnehmern und dem Gelände" },
  {
    icon: "⚠️",
    text: "Kein Driften & kein unnötiges Beschleunigen – weder auf dem Gelände noch bei der Anfahrt",
  },
  {
    icon: "⚠️",
    text: "Wer sich nicht daran hält, muss das Gelände verlassen",
  },
] as const;

type Props = { block: HomepageRulesBlockView };

export function HomepageRulesBlock({ block }: Props) {
  const sectionL = block.sectionLabel ?? "Wichtig";
  const lead = block.titleLead ?? "Die ";
  const accent = block.titleAccent ?? "Regeln";
  const items =
    block.items.length > 0
      ? block.items
      : FALLBACK_RULES.map((r) => ({ icon: r.icon, text: r.text }));

  return (
    <section className={rulesSection}>
      <Container>
        <Reveal>
          <p className={sectionLabel}>{sectionL}</p>
          <h2 className={sectionTitle}>
            {`${lead} `}
            <span className={sectionTitleAccent}>{accent}</span>
          </h2>
        </Reveal>
        <div className={rulesGrid}>
          {items.map((item, index) => (
            <Reveal key={`${item.text}-${index}`} className={rule}>
              <div className={ruleIcon}>{item.icon}</div>
              <div className={ruleText}>{item.text}</div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
