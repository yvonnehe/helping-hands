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
              Helping Hands jobber først og fremst med å gi barn og ungdom tilgang til utdanning. 
              Vi ønsker også å støtte voksne som står utenfor arbeidslivet, slik at de kan komme seg i jobb. 
              Grunntanken bak alle våre prosjekter er hjelp til selvhjelp – vi ønsker at menneskene vi gir muligheter til, 
              skal kunne klare seg på egen hånd i fremtiden. Målet er ikke at de skal bli avhengige av oss.
            </p>
            <p>
              Mange familier har ikke råd til å betale skolepenger for barna sine, og får derfor hjelp gjennom oss. 
              Vi møter ofte barn som mangler nødvendig skoleutstyr, som for eksempel sekk, skolebøker, skrivesaker og riktig skoleuniform. 
              Vi sørger for at disse barna får samme muligheter til skolegang som andre barn. 
              Fullfører de skolegangen, øker sjansen for at de kan få jobb og bygge et selvstendig liv.
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
              Selv om vårt hovedfokus er utdanning, møter vi også mennesker i akutte og vanskelige livssituasjoner. 
              Vi ønsker ikke å snu ryggen til dem. Dersom vi treffer personer som sliter med sykdom og mangler midler til nødvendig helsehjelp, 
              ønsker vi å bistå også dem. Målet er å hjelpe dem tilbake til god helse, slik at de igjen kan delta i arbeidslivet.
            </p>
            <p>
              Vi har også et sterkt fokus på familieplanlegging og reproduktiv helse. 
              I samarbeid med lokalt helsepersonell har vi arrangert kurs der det deles ut informasjon, 
              gratis prevensjon og tilbys gratis HIV-testing. Det er viktig for oss at kvinnene vi møter får tilgang til kunnskap 
              og ressurser, slik at de står bedre rustet til å ta egne, trygge valg for sin kropp og sin fremtid.
            </p>
            <p>
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
