import NextHead from "../components/NextHead";
import Image from "next/image";
const Prosjekter = () => {
  return (
    <>
      <NextHead 
        title="Våre prosjekter - Helping Hands" 
        description="Lær mer om Helping Hands sine prosjekter for utdanning, yrkesopplæring og helsehjelp i Tanzania. Vi jobber for å gi mennesker en bedre fremtid."
      />

    <div className="prosjekter">
      <div className="container-fluid">
        <div className="row prosjekter--padding">
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
              <br></br>Mange familier som ikke har mulighet til å betale
              skolepenger for barna sine, får hjelp av oss. Vi møter barn som
              ikke har nødvendig skoleutstyr, som for eksempel sekk, skolebøker,
              skrivesaker og riktig uniform. Vi tilrettelegger for at disse
              barna skal få skolegang på lik linje med andre barn. Hvis de
              kommer seg gjennom skolen, er sannsynligheten høyere for at de får
              seg en jobb og blir selvstendige videre i livet.
            </p>
          </div>
          <div className="col-md-6 my-auto">
            <img
              src="/helping-hands-kids-in-uniforms.jpg"
              alt="Tanzanianske barn står i sine nye uniformer"
              width="100%"
            />
          </div>
        </div>
        </div>
        </div>
        <div className="container-fluid">
        <div className="prosjekter2 row flex-column-reverse flex-md-row">
          <div className="col-md-6 my-auto">
            <img
              src="/helping-hands-woman.jpg"
              alt="Tanzaniansk kvinne smiler i sin nye rullestol"
              width="100%"
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
              <a className="buttonlink sunshinelink" href="/dette-har-vi-fatt-til-sammen">
                Noen av våre solskinnshistorier
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prosjekter;
