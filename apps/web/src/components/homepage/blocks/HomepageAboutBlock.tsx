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
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { Event, HomepageAboutBlockView } from "@driversclub/shared";

const DEFAULT_BODY =
  "Zwei Communities. Eine Leidenschaft. Der DriversClub Hessen wurde 2024 gegründet und steht für die Leidenschaft für Autos in Hessen. Gemeinsam mit Mi Familia & Friends bringen wir die Szene zusammen – für ein Treffen, das Erinnerungen hinterlässt.";

type Props = {
  block: HomepageAboutBlockView;
  /** Linker Partner + Fliesstext können aus dem Lead-Event kommen; rechts: DCH aus Homepage-Layout. */
  leadEvent: Event | null;
};

export function HomepageAboutBlock({ block, leadEvent }: Props) {
  const leftBadge =
    leadEvent?.collabPartnerBadge?.trim() ||
    block.leftBadge ||
    "MI FAMILIA & FRIENDS";
  const leftName =
    leadEvent?.collabPartnerName?.trim() || block.leftName || "Mi Familia";
  const rightBadge = block.rightBadge ?? "DRIVERS CLUB HESSEN";
  const rightName = block.rightName ?? "DCH Est. 2024";
  const body = leadEvent?.collabAboutBody?.trim() || block.body || DEFAULT_BODY;

  const headingSectionLabel =
    leadEvent?.homeAboutSectionLabel?.trim() ||
    block.sectionLabel ||
    "Veranstalter";
  const headingTitleLead =
    leadEvent?.homeAboutTitleLead?.trim() || block.titleLead || "Die ";
  const headingTitleAccent =
    leadEvent?.homeAboutTitleAccent?.trim() ||
    block.titleAccent ||
    "Kollaboration";

  return (
    <section className={collabSection} id="about">
      <Container>
        <Reveal>
          <p className={sectionLabel}>{headingSectionLabel}</p>
          <h2 className={sectionTitle}>
            {`${headingTitleLead} `}
            <span className={sectionTitleAccent}>{headingTitleAccent}</span>
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
        <Reveal className={collabDesc}>{body}</Reveal>
      </Container>
    </section>
  );
}
