import NextHead from "../components/NextHead";

const VilkarDonasjoner = () => {
  return (
    <>
      <NextHead
        title="Vilkår for donasjoner - Helping Hands"
        description="Les vilkår for donasjoner til Helping Hands, inkludert betaling, faste donasjoner, avslutning og personvern."
      />

      <div className="prosjekter">
        <div className="container-fluid">
          <div className="row prosjekter--padding">
            <div className="col-md-8">
              <h2>Vilkår for donasjoner</h2>
              <p>Helping Hands (org.nr. 915922058)</p>

              <h3 className="termstitle">Betaling</h3>
              <p>Donasjoner kan gis via Vipps eller bankoverføring.</p>
              <p>
                Ved betaling via Vipps vises beløp og eventuelt fast trekk før
                betalingen bekreftes. Ved bankoverføring er det giver selv som
                bestemmer beløp og eventuell frekvens.
              </p>
              <p>Det trekkes aldri mer enn det som er avtalt.</p>

              <h3 className="termstitle">Faste donasjoner</h3>
              <p>
                Ved faste donasjoner trekkes avtalt beløp automatisk i henhold
                til valgt intervall.
              </p>

              <h3 className="termstitle">Avslutning</h3>
              <p>Faste donasjoner via Vipps kan når som helst stoppes i Vipps-appen.</p>
              <p>Faste overføringer via bank må avsluttes i giverens egen nettbank.</p>
              <p>Du er også velkommen til å kontakte oss dersom du ønsker hjelp.</p>

              <h3 className="termstitle">Angrerett og feil</h3>
              <p>Du kan når som helst avslutte en avtale om faste donasjoner.</p>
              <p>Dersom noe har gått feil, ta gjerne kontakt med oss, så ser vi på det.</p>

              <h3 className="termstitle">Personvern og kontakt</h3>
              <p>
                Vi behandler kun opplysninger som er nødvendige for å gjennomføre
                og følge opp donasjoner.
              </p>
              <p>
                Les mer i vår{" "}
                <a href="/personvern" className="sunshinelink buttonlink">
                  personvernerklæring
                </a>
                .
              </p>
              <p>
                Kontakt oss på{" "}
                <a
                  href="mailto:info@helpinghands.no"
                  className="sunshinelink buttonlink"
                >
                  info@helpinghands.no
                </a>
                .
              </p>

              <h3 className="termstitle">Bruk av midler</h3>
              <p>Innsamlede midler brukes i tråd med Helping Hands sitt formål.</p>
              <p>
                Vi følger opp prosjekter og samarbeidspartnere for å bidra til at
                midlene brukes som tiltenkt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VilkarDonasjoner;