import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomepageAboutBlockView } from "@driversclub/shared";
import {
  collabDesc,
  collabLogoBox,
  collabLogos,
  collabSection,
  collabX,
  logoCircle,
  logoCircleCyan,
  logoCirclePurple,
  logoName,
  sectionLabel,
  sectionTitle,
  sectionTitleAccent,
} from "@/components/sections/sections.css";

const DEFAULT_BODY =
  "Zwei Communities. Eine Leidenschaft. Der DriversClub Hessen wurde 2024 gegründet und steht für die Leidenschaft für Autos in Hessen. Gemeinsam mit Mi Familia & Friends bringen wir die Szene zusammen – für ein Treffen, das Erinnerungen hinterlässt.";

type Props = { block: HomepageAboutBlockView };

export function HomepageAboutBlock({ block }: Props) {
  const leftBadge = block.leftBadge ?? "MI FAMILIA & FRIENDS";
  const leftName = block.leftName ?? "Mi Familia";
  const rightBadge = block.rightBadge ?? "DRIVERS CLUB HESSEN";
  const rightName = block.rightName ?? "DCH Est. 2024";

  return (
    <section className={collabSection} id="about">
      <Container>
        <Reveal>
          <p className={sectionLabel}>{block.sectionLabel ?? "Veranstalter"}</p>
          <h2 className={sectionTitle}>
            {block.titleLead ?? "Die "}
            <span className={sectionTitleAccent}>
              {block.titleAccent ?? "Kollaboration"}
            </span>
          </h2>
        </Reveal>
        <Reveal className={collabLogos}>
          <div className={collabLogoBox}>
            <div className={`${logoCircle} ${logoCirclePurple}`}>
              {leftBadge}
            </div>
            <span className={logoName}>{leftName}</span>
          </div>
          <div className={collabX}>×</div>
          <div className={collabLogoBox}>
            <div className={`${logoCircle} ${logoCircleCyan}`}>
              {rightBadge}
            </div>
            <span className={logoName}>{rightName}</span>
          </div>
        </Reveal>
        <Reveal className={collabDesc}>{block.body ?? DEFAULT_BODY}</Reveal>
      </Container>
    </section>
  );
}
