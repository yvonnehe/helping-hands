import Head from "next/head";
import Miriam from "../components/Miriam";
import Skredder from "../components/Skredder";

const Sammen = () => {
  return (
    <>
      <Head>
        <title>Helping Hands - Dette har vi fått til sammen</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="historie1">
        <h2>Dette har vi fått til sammen</h2>
        <h3>Skolegang og høyere utdanning</h3>
        <p>
          Mange barn er ikke på skolen på grunn av dårlig økonomi eller
          manglende utstyr. Ved hjelp av mange faddere, betaler vi for skolegang
          og utdanning til over 70 barn og unge. Flere barn har ikke sekk, bøker
          eller helt enkelt sko til å gå med. Vi har møtt barn med familier som
          ikke har råd til å betale lunsj på skolen. Vi har mange eksempler på
          at barna har vokst ut av uniformene, eller at de har vært forferdelig
          slitte. De viser en enorm takknemlighet for å kunne gå på skolen, og
          spesielt hvis de får lunsj på skolen. Vi vil rette en spesiell takk
          til fadderne våre, som har gjort det mulig for oss å hjelpe så mange
          barn og unge med skolegang.
        </p>
      </div>
      <div className="historie2">
        <h3>Miriam</h3>
        <p>
          Når vi møtte Miriam for første gang i 2018, var hun nettopp blitt
          plutselig og uforklarlig lam fra livet og ned. Vi ble grepet av hennes
          styrke og stå-på vilje. Hun smilte gjennom lange dager på sykehus.
          Selv måtte vi snu oss for å felle noen tårer. Denne stå-på viljen har
          vært en viktig faktor for hennes utvikling. Ved hjelp av fysioterapi
          flere ganger i uken i over 2 år, har hun sakte men sikkert fått
          følelsen tilbake igjen i bena. Vi er mektig imponert over henne, og
          veldig takknemlige som fikk være med på denne utviklingen. Vi retter
          en stor takk til fysioterapauten Peter, som har gjort en fantastisk
          innsats for Miriam. Samt faddere som har vært med å støtte oss gjennom
          hennes behandling.
        </p>
        <Miriam />
      </div>
      <div className="historie3">
        <h3>Seminar om familieplanlegging</h3>
        <p>
          Mange jenter blir tidlig gravide, gjerne helt ned i 14-15 års alder.
          Dette fører til frafall på skolen, fordi det ikke er lovlig å være
          gravid når man er på skolen. Vi ansatte lokalt helsepersonell til å ha
          kurs om familieplanlegging, samt gratis HIV testing og
          prevensjonsmidler. Det var veldig bra oppmøte på seminaret og damene
          var fornøyd.
        </p>
      </div>
      <div className="historie4">
        <h3>Voksenopplæring</h3>
        <p>
          Vi har møtt mange damer som ønsker en bedre jobb for kunne forsørge
          familiene sine. De hadde småjobber fra før, og tjente minimalt. Flere
          har ønsket å bli skreddere. De har fått en god utdannelse av en dyktig
          lærer, ansatt av oss. De har også fått med seg sin egen symaskin ved
          endt utdannelse, som vi kjøpte inn. Disse damene har i ettertid klart
          seg i yrket på egenhånd, og dermed kunnet forsørge familiene sine. Vi
          er imponert over motivasjonen deres, og stolte over hva de har fått
          til.
        </p>
        <Skredder />
      </div>
      <div className="historie5">
        <h3>Seminar om utdanning</h3>
        <p>
          Det er vanlig at jenter dropper ut fra skolen før- eller i løpet av
          videregående. Mange av dem blir tidlig gravide, og det er ikke vanlig
          at jenter tar høyere utdanning. Hvis familien har lite penger, blir
          guttene prioritert foran jentene. Vi inviterte suksessfulle kvinner i
          jobb til å holde seminar for de lokale jentene. Gladness hadde også en
          “pep-talk” om deres egenverdi og muligheter, samt viktigheten av å
          kunne være selvstendig og ikke avhengig av en mann. Når
          utdanningsseminaret var ferdig, tok med med oss en stor bukett av
          jenter til skredderen - for de skulle begynne på skolen igjen. Alle
          jentene som ikke allerede gikk på skolen, ønsket å begynne på skolen
          etter å ha vært på seminaret. Det var også et ekstra seminar på
          slutten om prevensjon.
        </p>
      </div>
    </>
  );
};

export default Sammen;
