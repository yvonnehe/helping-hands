import NextHead from "../components/NextHead";
import Miriam from "../components/Miriam";
import Skredder from "../components/Skredder";
import Skole from "../components/Skole";
import Familieplan from "../components/Familieplan";
import Utdanning from "../components/Utdanning";

const Sammen = () => {
  return (
    <>
      <NextHead 
        title="Dette har vi fått til sammen - Helping Hands" 
        description="Se hvordan Helping Hands har forandret liv i Tanzania gjennom skolegang, utdanning, familieplanlegging og yrkesopplæring."
      />

      <div className="historie1">
        <div className="con historie1--padding">
          <h2>Dette har vi fått til sammen</h2>
          <h3>Skolegang og høyere utdanning</h3>
          <p className="sammenp">
            Mange barn går ikke på skolen på grunn av dårlig økonomi eller mangel på utstyr. 
            Flere mangler en enkel sekk, skolebøker – eller helt grunnleggende ting som sko å gå med. 
            Noen har ikke uniform, eller så er den hullete og utslitt.
          </p>
          <p className="sammenp">
            Når et barn får lunsj på skolen, øker sannsynligheten for at familien sender barnet dit. 
            Takket være mange engasjerte faddere har vi gjennom årene kunnet dekke skolegang og utdanning 
            for over 160 barn og unge. Vi retter en spesiell takk til fadderne våre, som har gjort det mulig 
            å gi så mange barn en mulighet til utdanning og en bedre fremtid.
          </p>
          <Skole />
        </div>
        </div>
        <div className="historie2 con">
          <h3>Miriam</h3>
          <p className="sammenp">
            Da vi møtte Miriam for første gang i 2018, hadde hun nettopp blitt plutselig og uforklarlig lam fra livet og ned. 
            Vi ble dypt berørt av styrken og viljestyrken hennes – hun møtte lange dager på sykehuset med et smil, 
            selv om vi selv måtte snu oss bort for å tørke noen tårer. Denne ukuelige viljen har vært en viktig drivkraft i hennes utvikling.
          </p>
          <p className="sammenp">
            Gjennom målrettet fysioterapi flere ganger i uken i over to år, har hun sakte, men sikkert fått følelsen tilbake i beina. 
            Vi vil rette en stor takk til fysioterapeuten Peter, som har gjort en enestående innsats for Miriam, 
            og til fadderne som har støttet oss gjennom hele hennes behandlingsforløp.
          </p>
          <Miriam />
        </div>
        <div className="historie3">
        <div className="con historie3--padding">
          <h3>Seminar om familieplanlegging</h3>
          <p className="sammenp">
            Mange jenter blir gravide i ung alder – noen helt ned i 14–15-årsalderen. 
            Selv om det nå er lovlig å gå på skolen mens man er gravid, 
            fører sosiale holdninger og forventninger ofte til at jentene faller fra. 
            For å bidra til å forebygge tidlige graviditeter og gi unge mulighet til å ta informerte valg, 
            har vi engasjert lokalt helsepersonell til å holde kurs om familieplanlegging, 
            samt tilby gratis HIV-testing og prevensjonsmidler.
          </p>
          <Familieplan />
        </div>
        </div>
        <div className="historie4 con">
          <h3>Voksenopplæring</h3>
          <p className="sammenp">
            Vi har møtt mange kvinner som ønsker seg en bedre jobb for å kunne forsørge familiene sine. 
            Mange av dem hadde småjobber fra før, men tjente svært lite. Flere uttrykte et ønske om å bli skreddere. 
            Gjennom et opplæringsprogram ledet av en dyktig lærer vi ansatte, fikk de en solid utdanning i faget. 
            Ved fullført opplæring fikk hver deltaker sin egen symaskin, som vi sto for innkjøpet av. 
            I ettertid har disse kvinnene klart seg på egenhånd som skreddere og har dermed kunnet forsørge seg selv og sine familier.
          </p>
          <Skredder />
        </div>
        <div className="historie5">
        <div className="con historie5--padding">
          <h3>Seminar om utdanning</h3>
          <p className="sammenp">
            Det er vanlig at jenter slutter på skolen før eller i løpet av videregående. 
            Mange blir gravide i ung alder, og det er fortsatt uvanlig at jenter tar høyere utdanning. 
            I familier med dårlig økonomi blir guttene ofte prioritert fremfor jentene når det gjelder skolegang.
          </p>
          <p className="sammenp">
            For å inspirere og motivere, inviterte vi suksessrike yrkeskvinner til å holde seminar for de lokale jentene. 
            Gladness holdt også en engasjerende og motiverende prat om selvverd, muligheter og viktigheten av å være selvstendig, 
            uten å måtte være avhengig av en mann. Alle jentene som ikke allerede gikk på skolen, uttrykte et ønske om å begynne etter seminaret.
          </p>
          <Utdanning />
        </div>
      </div>
    </>
  );
};

export default Sammen;
