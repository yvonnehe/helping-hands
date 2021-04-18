import Head from "next/head";
import Image from "next/image";
const Prosjekter = () => {
  return (
    <>
      <Head>
        <title>Helping Hands - Våre prosjekter</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="container-fluid">
        <div className="prosjekter row">
          <div className="col-md-6">
            <h2>Våre prosjekter</h2>
            <h3>Hva vi jobber med</h3>
            <p>
              Helping Hands driver hovedsakelig med arbeid for å få barn og
              ungdom i skolegang. Vi ønsker også å få voksne som ikke er i
              arbeid, ut i arbeid. Tanken bak prosjektene har alltid vært hjelp
              til selvhjelp – vi ønsker at de menneskene vi gir muligheter til,
              skal klare seg på egenhånd i fremtiden. Vi ønsker ikke at de blir
              avhengige av oss.
              <br></br>
              <br></br> Mye av dette innebærer for eksempel å få barn som ikke
              har mulighet til å betale skolepenger, at vi hjelper dem med
              dette. Barn som ikke har nødvendig skoleutstyr, som for eksempel
              sekk, skolebøker, blyant, riktig uniform. At dette skal bli
              tilrettelagt for dem slik at de får mulighet til skolegang på lik
              linje med andre barn. Hvis de kommer seg gjennom skolen, er
              sannsynligheten høyere for at de får seg en jobb og blir
              selvstendige videre i livet.
            </p>
          </div>
          <div className="col-md-6 my-auto">
            <Image
              src="/helping-hands-kids-in-uniforms.jpg"
              alt="Tanzanian children standing in their new uniforms"
              height="493"
              width="590"
            />
          </div>
        </div>
        <div className="prosjekter2 row flex-column-reverse flex-md-row">
          <div className="col-md-6 my-auto">
            <Image
              src="/helping-hands-woman.jpg"
              alt="Tanzanian woman smiling big in her new wheelchair"
              height="493"
              width="590"
            />
          </div>
          <div className="col-md-6">
            <h3>Vi ønsker ikke at noen skal bli forbigått</h3>
            <p>
              Vi møter også av og til mennesker i nødsituasjoner, og vi ønsker
              ikke å forbigå dem selv om hovedformålet vårt handler om
              skolegang. Dersom vi treffer mennesker som sliter med sykdom og
              ikke har råd til nødvendig helsehjelp, ønsker vi også å bistå
              disse menneskene. Igjen er tanken vår å få mennesker friske, slik
              at de kan komme seg tilbake til arbeidslivet. <br></br>
              <br></br> Vi har også fokus på familieplanlegging og prevensjon.
              Vi har hatt kurs i familieplanlegging av lokalt helsepersonell,
              hvor det blir gitt ut informasjon, gratis prevensjon og det
              foregår gratis HIV-testing. Det er viktig for oss at informasjon
              om reproduktiv helse er tilgjengelig for kvinnene vi møter på, så
              de er bedre rustet til å ta egne valg for seg selv og sitt liv.{" "}
              <br></br>
              <br></br>
              <a className="buttonlink" href="/dette-har-vi-fatt-til-sammen">
                Noen av våre suksesshistorier
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prosjekter;
