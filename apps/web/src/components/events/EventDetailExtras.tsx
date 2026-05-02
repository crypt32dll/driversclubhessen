import { Container } from "@/components/ui/Container";
import { buildGoogleCalendarTemplateUrl } from "@/lib/calendar/google-calendar-url";
import { isMarketingEventEligibleForIcs } from "@/lib/services/events";
import { getMarketingSiteOrigin } from "@/lib/site-origin";
import type { Event } from "@driversclub/shared";
import Link from "next/link";

import {
  calBar,
  calBarLink,
  calBarTitle,
  extrasSection,
  faqAnswer,
  faqItem,
  faqList,
  faqQuestion,
  listCheck,
  listTitle,
  listUl,
  sectionHeader,
  sectionInner,
  sectionKicker,
  sectionLede,
  sectionTitle,
} from "./EventDetailExtras.css";

type Props = {
  event: Event;
};

export function EventDetailExtras({ event }: Props) {
  const siteOrigin = getMarketingSiteOrigin();
  const googleUrl = buildGoogleCalendarTemplateUrl(event, siteOrigin);
  const icsPath = `/events/${event.slug}/ics`;

  const hasFaq = (event.faq?.length ?? 0) > 0;
  const hasBring = (event.bringList?.length ?? 0) > 0;
  const hasCal = isMarketingEventEligibleForIcs(event);

  if (!hasFaq && !hasBring && !hasCal) {
    return null;
  }

  return (
    <section className={extrasSection} aria-labelledby="event-extras-heading">
      <Container>
        <div className={sectionInner}>
          <header className={sectionHeader}>
            <p className={sectionKicker}>Infos</p>
            <h2 className={sectionTitle} id="event-extras-heading">
              Vor Ort
            </h2>
            <p className={sectionLede}>
              {hasFaq || hasBring
                ? "FAQ, Checkliste und Kalender — ohne zusätzliche Medien."
                : "Kalender-Export für dieses Event."}
            </p>
          </header>

          {hasCal ? (
            <div className={calBar}>
              <p className={calBarTitle}>Kalender</p>
              <Link href={icsPath} className={calBarLink} prefetch={false}>
                .ics herunterladen
              </Link>
              <a
                href={googleUrl}
                className={calBarLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                In Google Kalender öffnen
              </a>
            </div>
          ) : null}

          {hasBring ? (
            <>
              <h3 className={listTitle}>Was mitbringen</h3>
              <ul className={listUl}>
                {event.bringList?.map((row, i) => (
                  <li key={`${row.item}-${i}`} className={listCheck}>
                    {row.item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {hasFaq ? (
            <dl className={faqList}>
              {event.faq?.map((row, i) => (
                <div key={`${row.question}-${i}`} className={faqItem}>
                  <dt className={faqQuestion}>{row.question}</dt>
                  <dd className={faqAnswer}>{row.answer}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
