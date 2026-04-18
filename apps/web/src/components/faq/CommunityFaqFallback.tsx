import {
  highlightBox,
  intro,
  kicker,
  lede,
  link,
  list,
  listItem,
  main,
  p,
  section,
  sectionTitle,
  subTitle,
  title,
} from "./FaqPage.css";

/** Default copy when the CMS body is empty — matches community-provided texts. */
export function CommunityFaqFallback() {
  return (
    <main className={main}>
      <div className={intro}>
        <p className={kicker}>Community</p>
        <h1 className={title}>
          Willkommen im DriversClubHessen <span aria-hidden="true">🔥</span>
        </h1>
        <p className={lede}>
          Regeln, Gruppen und Kooperationen — damit alle fair und entspannt über
          Autos quatschen können.
        </p>
      </div>

      <section className={section} aria-labelledby="faq-rules">
        <h2 className={sectionTitle} id="faq-rules">
          Unsere Regeln
        </h2>
        <ol className={list}>
          <li className={listItem}>
            Respekt ist Pflicht – kein Mobbing, kein Hate, keine Beleidigungen.
          </li>
          <li className={listItem}>
            Marken- und Modell-Diskussionen nur fair und sachlich.
          </li>
          <li className={listItem}>
            Kein Spam, keine Kettenbriefe, keine unerwünschte Werbung.
          </li>
          <li className={listItem}>
            Hitzige Debatten oder kontroverse Themen, die Streit auslösen
            könnten, bitte vermeiden.
          </li>
          <li className={listItem}>
            Freundlicher, lockerer Umgangston – wir wollen alle Spaß haben!
          </li>
        </ol>
      </section>

      <section className={section} aria-labelledby="faq-warnings">
        <h2 className={sectionTitle} id="faq-warnings">
          Verwarnungssystem <span aria-hidden="true">⚠️</span>
        </h2>
        <p className={p}>
          Wer gegen die Regeln verstößt, erhält eine Verwarnung. Nach der 3.
          Verwarnung erfolgt der Ausschluss aus der Gruppe.
        </p>
      </section>

      <section className={section} aria-labelledby="faq-dating">
        <h2 className={sectionTitle} id="faq-dating">
          Hinweis <span aria-hidden="true">💡</span>
        </h2>
        <p className={p}>
          Der DriversClubHessen ist keine Dating-Plattform. Wir sind hier, um
          über Autos zu reden, nicht um Flirts zu starten – Fokus aufs Hobby!
        </p>
      </section>

      <section className={section} aria-labelledby="faq-camtec">
        <h2 className={sectionTitle} id="faq-camtec">
          Kooperation mit Camtec Carconcepts
        </h2>
        <ul className={list}>
          <li className={listItem}>AWD Dyno / Chiptuning</li>
          <li className={listItem}>Fahrwerke / Felgen</li>
          <li className={listItem}>Folierung</li>
          <li className={listItem}>Achsvermessung</li>
          <li className={listItem}>Service</li>
          <li className={listItem}>Tuning</li>
        </ul>
        <p className={p}>
          <strong>Kontakt:</strong>{" "}
          <a className={link} href="tel:+491757301335">
            0175 7301335
          </a>
        </p>
        <p className={p}>
          Oder per Instagram:{" "}
          <a
            className={link}
            href="https://www.instagram.com/camtec_carconcepts/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @camtec_carconcepts
          </a>
        </p>
        <p className={p}>Habt Spaß und auf eine geile Zeit.</p>
      </section>

      <section className={section} aria-labelledby="faq-structure">
        <h2 className={sectionTitle} id="faq-structure">
          Gruppen-Struktur <span aria-hidden="true">📌</span>
        </h2>

        <h3 className={subTitle}>Chat-Gruppe</h3>
        <p className={p}>
          Genereller Austausch, auch mal Privates erlaubt – aber im Rahmen.
          Bilder bitte per «Einmal ansehen» senden (außer relevante Inhalte).
          GIF-Animationen sowie Sticker sind ebenfalls nicht erwünscht. Auf
          Anweisungen der Admins ist zu hören.
        </p>

        <h3 className={subTitle}>Pics-Gruppe</h3>
        <p className={p}>Bilder per «Immer ansehen» posten.</p>

        <h3 className={subTitle}>Teile-Börse / Flohmarkt</h3>
        <p className={p}>
          Alles verkaufen oder anbieten, was ihr loswerden möchtet.
        </p>

        <h3 className={subTitle}>Events-Gruppe</h3>
        <p className={p}>Infos und Planung für große Events.</p>

        <h3 className={subTitle}>Shop-Gruppe</h3>
        <p className={p}>
          Bestellungen für DriversClubHessen-Artikel wie Shirts, Hoodies oder
          Sticker.
        </p>

        <h3 className={subTitle}>Ankündigungs-Gruppe</h3>
        <p className={p}>
          Abstimmungen für Treffen – bitte dort abstimmen, ob ihr Bock habt zu
          kommen.
        </p>

        <div className={highlightBox}>
          <p className={p}>
            <span aria-hidden="true">🔥</span> <strong>IVALITY</strong> —
            Rabattcode für Magnetkennzeichen &amp; Pflegeprodukte:{" "}
            <strong>DriversClub10</strong> (10 % Rabatt)
          </p>
        </div>
      </section>
    </main>
  );
}
