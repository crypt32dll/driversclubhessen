import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomepageSection } from "@driversclub/shared";
import Link from "next/link";
import {
  cmsSection,
  cmsSectionBody,
  cmsSectionTitle,
  collabDesc,
  collabLogoBox,
  collabLogos,
  collabSection,
  collabX,
  divider,
  feature,
  featureIcon,
  featureText,
  featureTitle,
  featuresGrid,
  featuresSection,
  locIcon,
  locLabel,
  locValue,
  locationContent,
  locationDetail,
  locationInfo,
  locationSection,
  logoCircle,
  logoCircleCyan,
  logoCirclePurple,
  logoName,
  mapCtaInline,
  mapHint,
  mapPin,
  mapPlaceholder,
  rule,
  ruleIcon,
  ruleText,
  rulesGrid,
  rulesSection,
  sectionLabel,
  sectionTitle,
  sectionTitleAccent,
  socialBtn,
  socialIntro,
  socialLinks,
  socialSection,
} from "./sections.css";

const features = [
  {
    icon: "🚗",
    title: "Autos schauen & austauschen",
    text: "Sieh dir die geilsten Builds aus der Region an. Von Daily-Tuning bis Showcar – hier ist alles dabei.",
  },
  {
    icon: "⛽",
    title: "Benzingespräche",
    text: "Quatscht über Builds, Mods, Erfahrungen. Trefft Gleichgesinnte, tauscht euch aus, knüpft neue Kontakte.",
  },
  {
    icon: "🍔",
    title: "Essen & Getränke",
    text: "Ausreichend Essen und Getränke vor Ort – ihr müsst euch um nichts kümmern.",
  },
  {
    icon: "👥",
    title: "Community",
    text: "Jeder ist willkommen – egal welche Marke, welcher Build. Hier verbindet uns die Leidenschaft fürs Auto.",
  },
  {
    icon: "📸",
    title: "Content & Fotos",
    text: "Perfekte Kulisse für deinen Content. Hol dir die besten Shots deines Rides auf dem Gelände.",
  },
  {
    icon: "🔥",
    title: "Geile Atmosphäre",
    text: "Ein Event mit Familie, Leidenschaft und Szene. Komm vorbei und hab eine geile Zeit!",
  },
] as const;

const rules = [
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

const MAP_URL = "https://maps.google.com/?q=Industriestraße+6+63633+Birstein";

type Props = {
  /** Dynamic zone blocks from Strapi (`homepage.section-item`). */
  cmsSections?: HomepageSection[];
};

export const MarketingSections = ({ cmsSections }: Props) => {
  const hasCmsSections = Boolean(cmsSections?.length);

  return (
    <>
      {hasCmsSections ? (
        <section className={featuresSection} id="cms-sections">
          <Container>
            {cmsSections?.map((block, index) => (
              <Reveal key={`${block.title}-${index}`} className={cmsSection}>
                <h2 className={cmsSectionTitle}>{block.title}</h2>
                {block.description ? (
                  <div className={cmsSectionBody}>{block.description}</div>
                ) : null}
              </Reveal>
            ))}
          </Container>
        </section>
      ) : null}

      {hasCmsSections ? <div className={divider} aria-hidden /> : null}

      <section className={featuresSection} id="features">
        <Container>
          <Reveal>
            <p className={sectionLabel}>Highlights</p>
            <h2 className={sectionTitle}>
              Was auf dich <span className={sectionTitleAccent}>wartet</span>
            </h2>
          </Reveal>
          <div className={featuresGrid}>
            {features.map((item) => (
              <Reveal key={item.title} className={feature}>
                <div className={featureIcon}>{item.icon}</div>
                <div className={featureTitle}>{item.title}</div>
                <div className={featureText}>{item.text}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className={divider} aria-hidden />

      <section className={rulesSection}>
        <Container>
          <Reveal>
            <p className={sectionLabel}>Wichtig</p>
            <h2 className={sectionTitle}>
              Die <span className={sectionTitleAccent}>Regeln</span>
            </h2>
          </Reveal>
          <div className={rulesGrid}>
            {rules.map((item) => (
              <Reveal key={item.text} className={rule}>
                <div className={ruleIcon}>{item.icon}</div>
                <div className={ruleText}>{item.text}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className={collabSection} id="about">
        <Container>
          <Reveal>
            <p className={sectionLabel}>Veranstalter</p>
            <h2 className={sectionTitle}>
              Die <span className={sectionTitleAccent}>Kollaboration</span>
            </h2>
          </Reveal>
          <Reveal className={collabLogos}>
            <div className={collabLogoBox}>
              <div className={`${logoCircle} ${logoCirclePurple}`}>
                MI FAMILIA & FRIENDS
              </div>
              <span className={logoName}>Mi Familia</span>
            </div>
            <div className={collabX}>×</div>
            <div className={collabLogoBox}>
              <div className={`${logoCircle} ${logoCircleCyan}`}>
                DRIVERS CLUB HESSEN
              </div>
              <span className={logoName}>DCH Est. 2024</span>
            </div>
          </Reveal>
          <Reveal className={collabDesc}>
            Zwei Communities. Eine Leidenschaft. Der DriversClub Hessen wurde
            2024 gegründet und steht für die Leidenschaft für Autos in Hessen.
            Gemeinsam mit Mi Familia & Friends bringen wir die Szene zusammen –
            für ein Treffen, das Erinnerungen hinterlässt.
          </Reveal>
        </Container>
      </section>

      <div className={divider} aria-hidden />

      <section className={locationSection} id="location">
        <Container>
          <Reveal>
            <p className={sectionLabel}>Anfahrt</p>
            <h2 className={sectionTitle}>
              Der <span className={sectionTitleAccent}>Treffpunkt</span>
            </h2>
          </Reveal>
          <div className={locationContent}>
            <div className={locationInfo}>
              <Reveal className={locationDetail}>
                <div className={locIcon}>📍</div>
                <div>
                  <div className={locLabel}>Adresse</div>
                  <div className={locValue}>
                    Industriestraße 6
                    <br />
                    63633 Birstein, Hessen
                  </div>
                </div>
              </Reveal>
              <Reveal className={locationDetail}>
                <div className={locIcon}>🕐</div>
                <div>
                  <div className={locLabel}>Öffnungszeiten</div>
                  <div className={locValue}>
                    12:00 Uhr – 20:00 Uhr
                    <br />
                    Sonntag, 19. April 2026
                  </div>
                </div>
              </Reveal>
              <Reveal className={locationDetail}>
                <div className={locIcon}>🎟️</div>
                <div>
                  <div className={locLabel}>Eintritt</div>
                  <div className={locValue}>
                    Komplett kostenlos
                    <br />
                    Jeder ist willkommen
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <ButtonLink
                  href={MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mapCtaInline}
                >
                  In Google Maps öffnen
                </ButtonLink>
              </Reveal>
            </div>
            <Reveal>
              <Link
                href={MAP_URL}
                className={mapPlaceholder}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={mapPin}>📍</div>
                <span>
                  Industriestraße 6
                  <br />
                  63633 Birstein
                </span>
                <span className={mapHint}>
                  Klicken um Google Maps zu öffnen
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className={socialSection} id="social">
        <Container>
          <Reveal>
            <p className={sectionLabel}>Folg uns</p>
            <h2 className={sectionTitle}>
              Bleib <span className={sectionTitleAccent}>connected</span>
            </h2>
          </Reveal>
          <Reveal className={socialIntro}>
            Kein Event verpassen, aktuelle Updates und Content direkt aus der
            Szene.
          </Reveal>
          <div className={socialLinks}>
            <Reveal>
              <a
                href="https://www.instagram.com/driversclubhessen"
                className={socialBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  fill="currentColor"
                  role="img"
                  aria-label="Instagram"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
};
