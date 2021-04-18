import Head from "next/head";
import Image from "next/image";
import Fadderbarn from "../components/Fadderbarn";
import Andre from "../components/Andre";

const Fadderordning = () => {
  return (
    <>
      <Head>
        <title>Helping Hands - Fadderordning</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="omfadder">
        <h2>Fadderordning</h2>
        <h3>Om fadderordningen</h3>
        <p>
          Helping Hands fadderordning er laget for å støtte barn og ungdom
          gjennom skolen. I noen tilfeller andre familier som trenger hjelp av
          spesielle grunner. Vi ønsker å gi flest mulig barn og unge mulighet
          til skolegang og høyere utdanning.<br></br>
          <br></br> Dersom du ikke ønsker å være fadder for et spesifikt barn,
          kan du også kontakte oss for å bli månedlig giver. Da distribuerer vi
          pengene slik vi mener det er best, for eksempel til barn som ikke har
          fått fadder, hvis et av barna blir syke, eller andre i vanskelige
          situasjoner. <br></br>
          <br></br>Ta kontakt med oss på e-post dersom du ønsker å bli fadder!
        </p>
      </div>
      <div className="ledigefadder">
        <h3>Venter på fadder</h3>
        <Fadderbarn />
      </div>
      <div className="andrefadder">
        <h3>Andre med behov for ekstra støtte</h3>
        <Andre />
      </div>
      <div className="faqfadder">
        <h3>Fadderordning FAQ - vanlig stilte spørsmål</h3>
        <h5>
          Hva er det jeg betaler for når jeg er fadder for et barn/en ungdom?
        </h5>
        <p>
          Når du blir fadder for et barn, skal det være oppført hva som er
          inkludert i beløpet du betaler. Vanligvis er det skolekostnader,
          skoleutstyr og uniform. Skolekostnadene varierer fra skole til skole.{" "}
        </p>
        <h5>Hvorfor er man bare fadder 1 år om gangen?</h5>
        <p>
          Fadderordningen baserer seg på skolegangen og skoleutstyret vi betaler
          for, som er på ett års basis. Det hender at barna flytter, bytter
          skole, eller uteksamineres. Vi sender derfor en oppdatering årlig om
          barnet skal fortsette på den samme skolen, eller om det er endringer.
          Da kan man velge om man ønsker å fortsette som fadder eller ikke.
        </p>
        <h5>
          Hva skjer dersom jeg ikke lenger har mulighet til å være fadder?
        </h5>
        <p>
          Dette betyr ikke at ditt barn plutselig står uten skolegang. Vi
          forplikter oss til de barna vi hjelper, og fortsetter å hjelpe dem.
          Det det derimot har konsekvenser for, er hvor mange barn vi har
          mulighet til å hjelpe. Uten faste inntekter og faddere til å støtte
          oss, kan vi dessverre ikke love hjelp til flere barn, og det er mange
          barn som har behov for hjelp. Vi har selvfølgelig forståelse for at
          folk av og til har perioder i livet der de kan bidra, og andre
          perioder der man ikke kan bidra. Dette skal ikke gå utover barna, men
          vi ønsker selvfølgelig å hjelpe så mange som mulig.
        </p>
        <h5>Hvor mange oppdateringer får jeg/vi?</h5>
        <p>
          Hvor mange oppdateringer du får om fadderbarnet ditt varierer. Noen
          barn/ungdom bor i nærheten av kollegaen vår i Tanzania og/eller
          trenger ekstra oppfølging. Andre ungdommer studerer et stykke unna.
          Dermed vil det variere hvor mange oppdateringer en får om fadderbarnet
          sitt. Å oppdatere faddere er noe vi gjør på fritiden vår og uten lønn.
          Vi gjør vårt beste med den kapasiteten vi har. At vi jobber frivillig
          betyr at alle pengene faktisk kommer frem til ditt fadderbarn og det
          formålet vi har fortalt at pengene går til.
        </p>
      </div>
    </>
  );
};

export default Fadderordning;
