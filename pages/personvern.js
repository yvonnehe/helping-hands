import NextHead from "../components/NextHead";

const Personvern = () => {
  return (
    <>
      <NextHead
        title="Personvernerklæring - Helping Hands"
        description="Les hvordan Helping Hands behandler personopplysninger i forbindelse med donasjoner og kontakt."
      />

      <div className="prosjekter">
        <div className="container-fluid">
            <div className="row prosjekter--padding">
            <div className="col-md-8">
                <h2>Personvernerklæring</h2>

                <p>
                Helping Hands behandler personopplysninger i forbindelse med donasjoner og kontakt med oss.
                </p>

                <h3 className="termstitle">Hvilke opplysninger vi behandler</h3>
                <p>
                Vi behandler kun opplysninger som er nødvendige for å gjennomføre og følge opp donasjoner.
                </p>
                <p>
                Dette kan for eksempel være navn, telefonnummer, e-postadresse og betalingsinformasjon.
                </p>

                <h3 className="termstitle">Hvordan opplysningene brukes</h3>
                <p>
                Opplysningene brukes til å:
                </p>
                <ul>
                <li>gjennomføre donasjoner</li>
                <li>følge opp faste avtaler</li>
                <li>svare på henvendelser</li>
                </ul>

                <h3 className="termstitle">Lagring og deling</h3>
                <p>
                Vi lagrer opplysninger så lenge det er nødvendig for formålet.
                </p>
                <p>
                Opplysninger deles ikke med tredjeparter, med mindre det er nødvendig for å gjennomføre betaling (for eksempel via Vipps).
                </p>

                <h3 className="termstitle">Dine rettigheter</h3>
                <p>
                Du har rett til innsyn i hvilke opplysninger vi har om deg, og kan be om retting eller sletting.
                </p>

                <h3 className="termstitle">Kontakt</h3>
                <p>
                Har du spørsmål om personvern, kan du kontakte oss på{" "}
                <a href="mailto:info@helpinghands.no" className="sunshinelink buttonlink">
                    info@helpinghands.no
                </a>
                .
                </p>
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Personvern;