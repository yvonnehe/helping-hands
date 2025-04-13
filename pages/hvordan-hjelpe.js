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
              Vi får mange henvendelser fra mennesker som ønsker å bidra til 
              arbeidet vårt – og det setter vi enormt stor pris på! 
              For å gjøre det litt enklere, har vi samlet noen forslag 
              til hvordan du kan engasjere deg:
            </p>
            <h4 className="h4-questions">Ta gjerne kontakt med oss dersom:</h4>
            <ul>
              <li>
                Din arbeidsplass eller bedrift ønsker å samarbeide med oss eller 
                støtte arbeidet vårt.
              </li>{" "}
              <li>
                Skolen din har lyst til å bidra til en god sak – for eksempel gjennom 
                loddsalg, innsamlinger eller andre aktiviteter.
              </li>
              <li>
                Du ønsker å arrangere et event via oss. Tidligere har vi arrangert 
                veldedighetskonserter, yogatimer, utsalg av hjemmelagde produkter, og mer.
              </li>
              <li>
                Du som privatperson ønsker å <a className="buttonlink sunshinelink" href="/vipps-fadder">bli fadder eller fast giver.</a> Du velger selv beløpet.{" "}
              </li>
              <li>
                Du vil <a className="buttonlink sunshinelink" href="/stottemedlem">bli støttemedlem</a> og vise at du heier på arbeidet vårt. Det koster kun 50 kr i året, 
                og er et fint alternativ hvis du ikke har mulighet til å være fadder akkurat nå.
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
              Mange ønsker å donere brukte klær eller andre personlige eiendeler – noe vi setter stor pris på.
              Dessverre har vi ikke mulighet til å ta imot slike gaver. 
              Det er langt mer lønnsomt å handle lokalt enn å bruke store summer på frakt fra Norge. 
              I tillegg er det viktig for oss å støtte lokale bedrifter i Tanzania når vi har behov for varer og utstyr.
            </p>
            <p>
              Vi får også henvendelser fra personer som ønsker å reise ned og bidra lokalt i Tanzania.
              Dette er et flott engasjement, men per i dag har vi ikke behov for hjelp på stedet.{" "}
            </p>
            <p>
              Tusen takk for at du ønsker å bidra – det betyr mye!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HvordanHjelpe;
