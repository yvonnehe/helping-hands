import NextHead from "../components/NextHead";
import Image from "next/legacy/image";

export default function Home() {
  return (
    <>
      <NextHead 
        title="Helping Hands" 
        description="Helping Hands er en veldedig organisasjon som jobber med å få barn og ungdom i skolegang i Tanzania."
      />

      <div className="hero">
        <div className="con">
        <div className="hero__content">
          <h1>Gi skolegang i gave</h1>
          <h2 className="hero__p">
            Du kan støtte et barns skolegang gjennom vår fadderordning
          </h2>
          <a className="btn btn--orange" href="/fadderordning" aria-label="Les mer om vår fadderordning">
            LES MER
          </a>
          {/* old button  */}
          {/* <a className="buttonlink" href="/fadderordning">
            <button className="btn btn--orange">LES MER</button>
          </a> */}
        </div>
        </div>
      </div>

      <div className="section1">
        <div className="container-fluid">
        <div className="row">
          <div className="col-lg-1 col-md-0"></div>
          <div className="section1__1 col-lg-5 col-md-4 col-sm-12 my-auto">
            <h3>
              Vil du bidra med å støtte barn og ungdom i skolegang i Tanzania?
            </h3>
          </div>
          <div className="section1__2 col-lg-3 col-md-4 col-sm-6">
            <a href="/vipps" aria-label="Gi engangsbeløp med Vipps" className="index-links">
              <div className="boximage boximage--vipps"></div>
              <div className="boxtext boxtext--bidra">
                <h4>Støtt med VIPPS</h4>
                <p>Vipps til 13947 - Støtt oss med valgfritt beløp</p>
              </div>
            </a>
          </div>
          <div className="section1__3 col-lg-3 col-md-4 col-sm-6">
            <a href="/vipps-fadder" aria-label="Bli fadder med Vipps" className="index-links">
              <div className="boximage boximage--fadder"></div>
              <div className="boxtext boxtext--bidra">
                <h4>Bli fadder</h4>
                <p>
                  Du kan velge om du vil være Fadder for et spesifikt barn, eller
                  støtte vårt arbeid med et valgfritt månedlig beløp.
                </p>
              </div>
            </a>
          </div>
        </div>
        </div>
      </div>

      <div className="section2 container-fluid">
        <div className="row">
          <div className="col-lg-1 col-md-0"></div>
          <div className="section2__1 col-lg-2 col-md-3 col-sm-4 my-auto rotate">
            <img 
              src="/100-icon.svg" 
              srcSet="/100-icon.svg 1x" 
              alt="Kakediagram som viser 100%"
              decoding="async" 
              className="chart-image"
            />
          </div>
          <div className="section2__2 col-lg-8 col-md-9 col-sm-8">
            <h4>100% av innsamlede midler går til formålet</h4>
            <p>
              Tall basert på regnskap 2023. Vi ønsker at de pengene vi samler
              inn skal gå der de trengs mest, derfor gjør vi vårt ytterste for å
              gjøre dette mulig. Administrasjonskostnadene betaler vi fra egen
              lomme. Gladness sin lønn er betalt av egne givere som ønsker å
              støtte henne i arbeidet hun gjør.
            </p>
          </div>
          <div className="col-lg-1 col-md-0"></div>
        </div>
      </div>

      <div className="section3">
        <div className="con">
        <h3 className="section3__h3">Følg oss på sosiale medier</h3>
        <h4 className="section3__h4">For oppdateringer om hva vi jobber med</h4>
        <a
          className="btn btn--gray buttonlink--margin"
          href="https://www.facebook.com/helpinghandsno"
        >
          Facebook
        </a>
        <a
          className="btn btn--gray buttonlink--margin"
          href="https://www.instagram.com/helpinghandsno/"
        >
          Instagram
        </a>
      </div>
      </div>

      <div className="headlinesection con">
        <h3>Dette har vi fått til sammen</h3>
      </div>
      <div className="section4 container-fluid">
        <div className="row">
          <div className="section4__1 col-md-4 col-sm-12">
            <a className="suksesslink" href="/dette-har-vi-fatt-til-sammen">
              <div className="boximage boximage--students"></div>
              <div className="boxtext boxtext--suksess">
                <h4>Skolegang og høyere utdanning</h4>
                <p>
                  Mange barn er ikke på skolen på grunn av dårlig økonomi eller
                  manglende utstyr. Ved hjelp av mange faddere, har vi betalt for
                  skolegang og utdanning til over 160 barn og unge.
                </p>
              </div>
            </a>
          </div>
          <div className="section4__2 col-md-4 col-sm-12">
            <a className="suksesslink" href="/dette-har-vi-fatt-til-sammen">
              <div className="boximage boximage--miriam"></div>
              <div className="boxtext boxtext--suksess">
                <h4>Miriam</h4>
                <p>
                  Miriam ble plutselig lam fra livet og ned da hun var 15 år. Vi
                  har støttet henne med fysioterapi i over 2 år, hun kan nå gå
                  igjen. Les om hennes sterke historie.{" "}
                </p>
              </div>
            </a>
          </div>
          <div className="section4__3 col-md-4 col-sm-12">
            <a className="suksesslink" href="/dette-har-vi-fatt-til-sammen">
              <div className="boximage boximage--seminar"></div>
              <div className="boxtext boxtext--suksess">
                <h4>Seminar om familieplanlegging</h4>
                <p>
                  Mange jenter blir tidlig gravide, gjerne helt ned i 14-15 års
                  alder. Det er vanskelig å få tak i god informasjon om
                  prevensjonsmidler og seksuell helse. Vi har holdt kurs med
                  lokalt helsepersonell.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
