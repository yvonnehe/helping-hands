import NextHead from "../components/NextHead";
import Fadderbarn from "../components/Fadderbarn";
import Andre from "../components/Andre";
import MerInfo from "../components/MerInfo";
import { useState } from "react";

const Fadderordning = () => {
  const [Img, setImg] = useState(null);
  const [Name, setName] = useState(null);
  const [Desc, setDesc] = useState(null);

  return (
    <>
      <NextHead title="Fadderordning - Helping Hands" />

      <div className="omfadder">
        <div className="con omfadder--padding"> 
        <h2>Fadderordning</h2>
        <h3>Om fadderordningen</h3>
        <p className="fadderp">
          Helping Hands fadderordning er laget for å støtte barn og ungdom
          gjennom skolen. I noen tilfeller andre familier som trenger hjelp av
          spesielle grunner. Vi ønsker å gi flest mulig barn og unge mulighet
          til skolegang og høyere utdanning.
        </p>
        <p className="fadderp">Dersom du ikke ønsker å være fadder for et spesifikt barn,
          kan du også kontakte oss for å bli månedlig giver. Da distribuerer vi
          pengene slik vi mener det er best, for eksempel til barn som ikke har
          fått fadder, hvis et av barna blir syke, eller andre i vanskelige
          situasjoner.</p>
        <p className="fadderp">
          <a href="/bli-fadder" className="sponsor-link sunshinelink">
            Fyll ut dette skjemaet dersom du ønsker å bli fadder</a>, 
            så tar vi kontakt med deg!
        </p>
      </div>
      </div>
      <div className="ledigefadder con">
        <h3>Venter på fadder</h3>
        <Fadderbarn setImg={setImg} setName={setName} setDesc={setDesc} />
        {Img && (
          <MerInfo
            Img={Img}
            setImg={setImg}
            Name={Name}
            setName={setName}
            Desc={Desc}
            setDesc={setDesc}
          />
        )}
      </div>
      <div className="andrefadder">
        <div className="con andrefadder--padding">
        <h3>Andre med behov for ekstra støtte</h3>
        <Andre setImg={setImg} setName={setName} setDesc={setDesc} />
        {Img && (
          <MerInfo
            Img={Img}
            setImg={setImg}
            Name={Name}
            setName={setName}
            Desc={Desc}
            setDesc={setDesc}
          />
        )}
        </div>
      </div>
      <div className="faqfadder con">
        <h3>Fadderordning FAQ - vanlig stilte spørsmål</h3>
        <h4 className="h4-questions">
          Hva er det jeg betaler for når jeg er fadder for et barn/en ungdom?
        </h4>
        <p className="fadderp">
          Når du blir fadder for et barn, skal det være oppført hva som er
          inkludert i beløpet du betaler. Vanligvis er det skolekostnader,
          skoleutstyr og uniform. Skolekostnadene varierer fra skole til skole.{" "}
        </p>
        <h4 className="h4-questions">Hvorfor er man bare fadder 1 år om gangen?</h4>
        <p className="fadderp">
          Fadderordningen baserer seg på skolegangen og skoleutstyret vi betaler
          for, som er på ett års basis. Det hender at barna flytter, bytter
          skole, eller uteksamineres. Vi sender derfor en oppdatering årlig om
          barnet skal fortsette på den samme skolen, eller om det er endringer.
          Da kan man velge om man ønsker å fortsette som fadder eller ikke.
        </p>
        <h4 className="h4-questions">
          Hva skjer dersom jeg ikke lenger har mulighet til å være fadder?
        </h4>
        <p className="fadderp">
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
        <h4 className="h4-questions">Hvor mange oppdateringer får jeg/vi?</h4>
        <p className="fadderp">
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
