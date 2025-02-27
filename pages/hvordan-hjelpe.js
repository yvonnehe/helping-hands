import NextHead from "../components/NextHead";
import Image from "next/image";
const HvordanHjelpe = () => {
  return (
    <>
      <NextHead 
        title="Hvordan hjelpe - Helping Hands" 
        description="Finn ut hvordan du kan bidra til Helping Hands, enten som fadder, månedsgiver, samarbeidspartner eller ved å arrangere veldedige aktiviteter."
      />

    <div className="hvordanhjelpe">
      <div className="container-fluid">
        <div className="row hvordanhjelpe--padding">
          <div className="col-md-6">
            <h2>Hvordan hjelpe</h2>
            <h3>Ulike måter å bidra</h3>
            <p>
              Vi får mange henvendelser fra mennesker som ønsker å bidra med noe
              for oss, det setter vi ekstremt stor pris på! For å gjøre det litt
              enklere, ønsker vi å samle litt informasjon her for hva du
              eventuelt kan hjelpe oss med.{" "}
            </p>
            <h4 className="h4-questions">Vi ønsker gjerne at du tar kontakt dersom: </h4>
            <ul>
              <li>
                Din arbeidsplass eller bedrift ønsker å samarbeide med eller
                støtte oss.
              </li>{" "}
              <li>
                Din skole har lyst å bidra til gode formål. Gjennom loddsalg,
                innsamlinger eller andre aktiviteter.
              </li>
              <li>
                {" "}
                Du ønsker å booke et arrangement via oss. Vi har tidligere
                arrangert veldedighetskonserter, veldedighetsyoga, utsalg av
                hjemmelagde ting, etc.
              </li>
              <li>
                Privatpersoner som ønsker å <a className="buttonlink sunshinelink" href="/vipps-fadder">bli faddere eller månedsgivere.</a> Du velger selv beløp.{" "}
              </li>
              <li>
                Du kan <a className="buttonlink sunshinelink" href="/stottemedlem">bli støttemedlem</a> for 50kr i året for å vise støtte 
                til arbeidet vårt, dersom du ikke har anledning til å være fadder.{" "}
              </li>
            </ul>
          </div>
          <div className="col-md-6 my-auto">
            <img
              src="/helping-hands-woman-and-child.jpg"
              alt="Tanzaniansk kvinne holder barnet sitt"
              width="100%"
            />
          </div>
        </div>
        </div>
        </div>
        <div className="container-fluid">
        <div className="hvordanhjelpe2 row flex-column-reverse flex-md-row">
          <div className="col-md-6 my-auto">
            <img
              src="/helping-hands-kids.jpg"
              alt="Tanzanianske barn går til skolen mens de holder hender"
              width="100%"
            />
          </div>
          <div className="col-md-6">
            <h3>Vi setter pris på omtanken, men…</h3>
            <p>
              Det er mange som ønsker å donere brukte klær eller andre
              personlige eiendeler, dette tar vi dessverre ikke imot. Det lønner
              seg å handle lokalt fremfor å bruke store summer på å transportere
              ned ting fra Norge. Det er også viktig for oss at vi støtter opp
              om de lokale bedriftene i Tanzania dersom vi skulle ha behov for
              noe.<br></br>
              <br></br> Vi får også spørsmål fra folk som ønsker å reise ned og
              hjelpe til lokalt i Tanzania. Dette har vi ikke behov for per i
              dag!{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HvordanHjelpe;
