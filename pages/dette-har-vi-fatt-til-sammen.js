import NextHead from "../components/NextHead";
import Miriam from "../components/Miriam";
import Skredder from "../components/Skredder";
import Skole from "../components/Skole";
import Familieplan from "../components/Familieplan";
import Utdanning from "../components/Utdanning";

const Sammen = () => {
  return (
    <>
      <NextHead />

      <div className="historie1 con">
        <h2>Dette har vi fått til sammen</h2>
        <h3>Skolegang og høyere utdanning</h3>
        <p className="sammenp">
          Mange barn er ikke på skolen på grunn av dårlig økonomi eller
          manglende utstyr. Flere barn har ikke sekk, bøker
          eller de mangler helt enkle ting som sko å gå med. De mangler
          gjerne uniform eller at den er hullete og utslitt.
          <br /><br />
          Når et barn får lunsj på skolen, er det større
          sannsynlighet for at familien sender barnet på skolen.  
          Ved hjelp av mange faddere, betaler vi for skolegang
          og utdanning til over 100 barn og unge. Vi vil rette en spesiell takk
          til fadderne våre, som har gjort det mulig for oss å hjelpe så mange
          barn og unge med skolegang.
        </p>
        <Skole />
      </div>
      <div className="historie2 con">
        <h3>Miriam</h3>
        <p className="sammenp">
          Når vi møtte Miriam for første gang i 2018, var hun nettopp blitt
          plutselig og uforklarlig lam fra livet og ned. Vi ble grepet av hennes
          styrke og stå-på vilje. Hun smilte gjennom lange dager på sykehus.
          Selv måtte vi snu oss for å felle noen tårer. Denne stå-på viljen har
          vært en viktig faktor for hennes utvikling. 
          <br /><br />
          Ved hjelp av fysioterapi
          flere ganger i uken i over 2 år, har hun sakte men sikkert fått
          følelsen tilbake igjen i bena. Vi retter
          en stor takk til fysioterapauten Peter, som har gjort en fantastisk
          innsats for Miriam. Samt faddere som har vært med å støtte oss gjennom
          hennes behandling.
        </p>
        <Miriam />
      </div>
      <div className="historie3 con">
        <h3>Seminar om familieplanlegging</h3>
        <p className="sammenp">
          Mange jenter blir tidlig gravide, gjerne helt ned i 14-15 års alder.
          Dette fører til frafall på skolen, fordi det ikke er lovlig å være
          gravid når man er på skolen. Vi ansatte lokalt helsepersonell til å ha
          kurs om familieplanlegging, samt gratis HIV testing og
          prevensjonsmidler. 
        </p>
        <Familieplan />
      </div>
      <div className="historie4 con">
        <h3>Voksenopplæring</h3>
        <p className="sammenp">
          Vi har møtt mange damer som ønsker en bedre jobb for kunne forsørge
          familiene sine. De hadde småjobber fra før, og tjente minimalt. Flere
          har ønsket å bli skreddere. De har fått en god utdannelse av en dyktig
          lærer, ansatt av oss. De har også fått med seg sin egen symaskin ved
          endt utdannelse, som vi kjøpte inn. Disse damene har i ettertid klart
          seg i yrket på egenhånd, og dermed kunnet forsørge familiene sine. 
        </p>
        <Skredder />
      </div>
      <div className="historie5 con">
        <h3>Seminar om utdanning</h3>
        <p className="sammenp">
          Det er vanlig at jenter dropper ut fra skolen før- eller i løpet av
          videregående. Mange av dem blir tidlig gravide, og det er ikke vanlig
          at jenter tar høyere utdanning. Hvis familien har lite penger, blir
          guttene prioritert foran jentene. 
          <br /><br />
          Vi inviterte suksessfulle kvinner i
          jobb til å holde seminar for de lokale jentene. Gladness hadde også en
          “pep-talk” om deres egenverdi og muligheter, samt viktigheten av å
          kunne være selvstendig og ikke avhengig av en mann. Alle
          jentene som ikke allerede gikk på skolen, ønsket å begynne 
          etter å ha vært på seminaret. 
        </p>
        <Utdanning />
      </div>
    </>
  );
};

export default Sammen;
