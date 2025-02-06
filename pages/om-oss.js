import NextHead from "../components/NextHead";
import Image from "next/image";

const OmOss = () => {
  return (
    <>
      <NextHead title="Om oss - Helping Hands" />

    <div className="teamstory">
      <div className="container-fluid">
        <div className="row teamstory--padding">
          <div className="col-lg-6">
            <h2>Om oss</h2>
            <h3>Helping Hands teamet</h3>
            <p>
              Helping Hands ble grunnlagt i januar 2016 av Daniélla Rodrigues og
              Yvonne Helland. Hovedformålet med denne organisasjonen er å få
              barn og ungdom i skolegang, og prosjektet befinner seg i Tanzania.
              Vår prosjektleder Gladness Andrew Massawe driver våre prosjekter
              på en daglig basis i Tanzania. <br></br>
              <br></br> Vi har også flere dyktige frivillige hos oss i Norge som
              hjelper oss med prosjekter, arrangementer, og innsamlinger. Vi
              hadde ikke klart oss uten dere! Les mer om hvordan du kan bidra
              <a className="her" href="/hvordan-hjelpe">
                her
              </a>
              .
            </p>
            <h3>Vår historie</h3>
            <p>
              Da Daniélla reiste til Tanzania for å jobbe som frivillig på et
              barnehjem, traff hun flere mennesker i vanskelige livssituasjoner.
              Hun begynte å samle inn penger fra venner og kjente hjemmefra, men
              fant ut at dette ikke var nok. Hun trengte hjelp. Hun måtte gjøre
              det ordentlig, hun måtte starte opp selv. Det naturlige valget
              falt på Yvonne, og dermed grunnla de Helping Hands da de begge var
              kun 20 år gamle studenter.{" "}
            </p>
          </div>
          <div className="col-lg-6 my-auto">
            <img
              src="/helping-hands-team.JPG"
              alt="Helping Hands teamet"
              width="100%"
            />
            <p className="imagedescription">
              Fra venstre: Daniélla, Gladness og Yvonne
            </p>
          </div>
        </div>
        </div>
        </div>
        <div className="container-fluid">
        <div className="gladness row flex-column-reverse flex-lg-row">
          <div className="col-lg-6 my-auto">
            <img
              src="/Gladness.jpg"
              alt="Gladness - En Tanzaniansk kvinne smiler i gul kjole med afrikansk mønster"
              width="100%"
            />
          </div>
          <div className="col-lg-6">
            <h3>Gladness - hjertet i organisasjonen</h3>
            <p>
              Ingenting av dette hadde vært mulig dersom ikke Daniélla hadde
              kommet i kontakt med Gladness. Gladness har stor kjennskap til
              lokalsamfunnet - hun kjenner menneskene, hun snakker språket. Med
              midlene Daniélla og Yvonne fikk samlet inn i Norge, ble det mulig
              for Gladness å finne de familiene i nærområdet sitt med behov for
              en ekstra hånd på veien. Hun er ansvarlig for alle de ansatte som
              jobber for oss i Tanzania.
              <br></br>
              <br></br>
              Gladness er en ekstremt dyktig dame, som brenner for mennesker og
              sitt eget lokalsamfunn. Hun følger opp alle skolebarn og deres
              familier. Hun sjekker at alle har det bra, og følger opp dersom
              noen blir syke og trenger hjelp, eller dersom barna mangler noe
              til skolen. Hun har også valgt å ta inn vanskeligstilte barn i
              sitt hjem i tillegg til sine egne tre barn som hun tar vare på.
              Der det finnes hjerterom finnes det husrom, mener hun. Men
              Gladness har vel helst det første.
              <br></br>
              <br></br> Gladness — hjertet i Helping Hands, vi hadde ikke vært
              noe sted uten deg.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OmOss;
