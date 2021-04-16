import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Helping Hands</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="hero">
        <div class="hero__content">
          <h1>Gi skolegang i gave</h1>
          <p className="hero__p">
            Du kan støtte et barns skolegang gjennom vår fadderordning
          </p>
          <a className="buttonlink" href="/fadderordning">
            <button className="btn btn--orange">LES MER</button>
          </a>
        </div>
      </div>

      <div className="section1">
        <div className="section1__1">
          <h3>
            Vil du bidra med å støtte barn og ungdom i skolegang i Tanzania?
          </h3>
        </div>
        <div className="section1__2">
          <div className="boximage boximage--vipps"></div>
          <div className="boxtext boxtext--bidra">
            <h4>Støtt med VIPPS</h4>
            <p>Vipps til 13947 - Støtt oss med valgfritt beløp</p>
          </div>
        </div>
        <div className="section1__3">
          <div className="boximage boximage--fadder"></div>
          <div className="boxtext boxtext--bidra">
            <h4>Bli fadder</h4>
            <p>
              Du kan velge om du vil være Fadder for et spesifikt barn, eller
              støtte vårt arbeid med et månedlig beløp.
            </p>
          </div>
        </div>
      </div>

      <div className="section2">
        <div class="section2__1">
          <Image
            src="/100-icon.svg"
            alt="Pie graph showing 100%"
            height=""
            width=""
          />
        </div>
        <div class="section2__2">
          <h4>100% av innsamlede midler går til formålet</h4>
          <p>
            Tall basert på regnskap 2020. Vi ønsker at de pengene vi samler inn
            skal gå der de trengs mest, derfor gjør vi vårt ytterste for å gjøre
            dette mulig. Administrasjonskostnadene betaler vi fra egen lomme.
            Gladness sin lønn er betalt av egne givere som ønsker å støtte henne
            i arbeidet hun gjør.
          </p>
        </div>
      </div>

      <div className="section3">
        <h3 className="section3__h3">Følg oss på sosiale medier</h3>
        <h4 className="section3__h4">For oppdateringer om hva vi jobber med</h4>
        <button className="btn btn--gray">Facebook</button>
        <button className="btn btn--gray">Instagram</button>
      </div>

      <div className="headlinesection">
        <h3>Dette har vi fått til sammen</h3>
      </div>
      <div className="section4">
        <div className="section4__1">
          <div className="boximage boximage--students"></div>
          <div className="boxtext boxtext--suksess">
            <h4>Skolegang og høyere utdanning</h4>
            <p>
              Mange barn er ikke på skolen på grunn av dårlig økonomi eller
              manglende utstyr. Ved hjelp av mange faddere, betaler vi for
              skolegang og utdanning til over 70 barn og unge.
            </p>
          </div>
        </div>
        <div className="section4__2">
          <div className="boximage boximage--miriam"></div>
          <div className="boxtext boxtext--suksess">
            <h4>Miriam</h4>
            <p>
              Miriam ble plutselig lam fra livet og ned da hun var 15 år. Vi har
              støttet henne med fysioterapi i over 2 år, hun kan nå gå igjen.
              Les om hennes sterke historie.{" "}
            </p>
          </div>
        </div>
        <div className="section4__3">
          <div className="boximage boximage--seminar"></div>
          <div className="boxtext boxtext--suksess">
            <h4>Seminar om familieplanlegging</h4>
            <p>
              Mange jenter blir tidlig gravide, gjerne helt ned i 14-15 års
              alder. Det er vanskelig å få tak i god informasjon om
              prevensjonsmidler og seksuell helse. Vi har holdt kurs med lokalt
              helsepersonell.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
