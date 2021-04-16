import Head from "next/head";
const HvordanHjelpe = () => {
  return (
    <>
      <Head>
        <title>Helping Hands - Hvordan hjelpe</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="hvordanhjelpe">
        <h2>Hvordan hjelpe</h2>
        <h3>Ulike måter å bidra</h3>
        <p>
          Vi får mange henvendelser fra mennesker som ønsker å bidra med noe for
          oss, det setter vi ekstremt stor pris på! For å gjøre det litt
          enklere, ønsker vi å samle litt informasjon her for hva du eventuelt
          kan hjelpe oss med.{" "}
        </p>
        <h5>Vi ønsker gjerne at du tar kontakt dersom: </h5>
        <ul>
          <li>
            Din arbeidsplass eller bedrift ønsker å samarbeide med eller støtte
            oss.
          </li>{" "}
          <li>
            Din skole har lyst å bidra til gode formål. Gjennom loddsalg,
            innsamlinger eller andre aktiviteter.
          </li>
          <li>
            {" "}
            Du ønsker å booke et arrangement via oss. Vi har tidligere arrangert
            veldedighetskonserter, veldedighetsyoga, utsalg av hjemmelagde ting,
            etc.
          </li>
          <li>
            Privatpersoner som ønsker å bli faddere eller månedsgivere. Du
            velger selv beløp.{" "}
          </li>
        </ul>
      </div>
      <div className="hvordanhjelpe2">
        <h3>Vi setter pris på omtanken, men…</h3>
        <p>
          Det er mange som ønsker å donere brukte klær eller andre personlige
          eiendeler, dette tar vi dessverre ikke imot. Det lønner seg å handle
          lokalt fremfor å bruke store summer på å transportere ned ting fra
          Norge. Det er også viktig for oss at vi støtter opp om de lokale
          bedriftene i Tanzania dersom vi skulle ha behov for noe.<br></br>
          <br></br> Vi får også spørsmål fra folk som ønsker å reise ned og
          hjelpe til lokalt i Tanzania. Dette har vi ikke behov for per i dag!{" "}
        </p>
      </div>
    </>
  );
};

export default HvordanHjelpe;
