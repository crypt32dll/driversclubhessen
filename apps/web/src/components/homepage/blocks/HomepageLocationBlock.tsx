import {
  locIcon,
  locLabel,
  locValue,
  locationContent,
  locationDetail,
  locationInfo,
  locationSection,
  mapCtaInline,
  mapHint,
  mapPin,
  mapPlaceholder,
  sectionLabel,
  sectionTitle,
  sectionTitleAccent,
} from "@/components/sections/sections.css";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  buildGoogleMapsUrlFromEvent,
  buildLocationRowsFromEvent,
  mapPreviewPrimarySecondary,
} from "@/lib/homepage/location-from-event";
import type { Event, HomepageLocationBlockView } from "@driversclub/shared";
import Link from "next/link";

const DEFAULT_MAP =
  "https://maps.google.com/?q=Industriestraße+6+63633+Birstein";

type Props = {
  block: HomepageLocationBlockView;
  /** Wenn gesetzt: Anfahrt-Inhalt aus Event (wie Lead-Event / Hero). */
  leadEvent: Event | null;
};

export function HomepageLocationBlock({ block, leadEvent }: Props) {
  const fromEvent = leadEvent != null;

  const headingSectionLabel =
    leadEvent?.homeLocationSectionLabel?.trim() ||
    block.sectionLabel ||
    "Anfahrt";
  const headingTitleLead =
    leadEvent?.homeLocationTitleLead?.trim() || block.titleLead || "Der ";
  const headingTitleAccent =
    leadEvent?.homeLocationTitleAccent?.trim() ||
    block.titleAccent ||
    "Treffpunkt";

  const mapUrl = fromEvent
    ? buildGoogleMapsUrlFromEvent(leadEvent)
    : (block.mapUrl ?? DEFAULT_MAP);

  const eventRows = fromEvent ? buildLocationRowsFromEvent(leadEvent) : null;
  const hasCmsRows = Boolean(block.rows && block.rows.length > 0);

  const mapPreview = fromEvent
    ? mapPreviewPrimarySecondary(leadEvent)
    : { primary: "Industriestraße 6", secondary: "63633 Birstein" };

  return (
    <section className={locationSection} id="location">
      <Container>
        <Reveal>
          <p className={sectionLabel}>{headingSectionLabel}</p>
          <h2 className={sectionTitle}>
            {`${headingTitleLead} `}
            <span className={sectionTitleAccent}>{headingTitleAccent}</span>
          </h2>
        </Reveal>
        <div className={locationContent}>
          <div className={locationInfo}>
            {fromEvent && eventRows ? (
              <>
                {eventRows.map((row, index) => (
                  <Reveal
                    key={`${row.label}-${index}`}
                    className={locationDetail}
                  >
                    <div className={locIcon}>{row.icon}</div>
                    <div>
                      <div className={locLabel}>{row.label}</div>
                      <div
                        className={locValue}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {row.value}
                      </div>
                    </div>
                  </Reveal>
                ))}
                <Reveal>
                  <ButtonLink
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mapCtaInline}
                  >
                    In Google Maps öffnen
                  </ButtonLink>
                </Reveal>
              </>
            ) : hasCmsRows ? (
              <>
                {block.rows?.map((row, index) => (
                  <Reveal
                    key={`${row.label}-${index}`}
                    className={locationDetail}
                  >
                    <div className={locIcon}>{row.icon ?? "📍"}</div>
                    <div>
                      <div className={locLabel}>{row.label}</div>
                      <div
                        className={locValue}
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {row.value}
                      </div>
                    </div>
                  </Reveal>
                ))}
                <Reveal>
                  <ButtonLink
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mapCtaInline}
                  >
                    In Google Maps öffnen
                  </ButtonLink>
                </Reveal>
              </>
            ) : (
              <>
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
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mapCtaInline}
                  >
                    In Google Maps öffnen
                  </ButtonLink>
                </Reveal>
              </>
            )}
          </div>
          <Reveal>
            <Link
              href={mapUrl}
              className={mapPlaceholder}
              target="_blank"
              rel="noopener noreferrer"
              style={
                block.mapImage?.url
                  ? {
                      backgroundImage: `linear-gradient(rgba(6,6,10,0.75), rgba(6,6,10,0.88)), url(${block.mapImage.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <div className={mapPin}>📍</div>
              <span>
                {mapPreview.primary}
                {mapPreview.secondary ? (
                  <>
                    <br />
                    {mapPreview.secondary}
                  </>
                ) : null}
              </span>
              <span className={mapHint}>Klicken um Google Maps zu öffnen</span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
