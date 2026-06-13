import NextHead from "../components/NextHead";
import Fadderbarn from "../components/Fadderbarn";
import Andre from "../components/Andre";
import MerInfo from "../components/MerInfo";
import { useState } from "react";

const Fadderordning = () => {
  const [Id, setId] = useState(null);
  const [Img, setImg] = useState(null);
  const [Name, setName] = useState(null);
  const [Desc, setDesc] = useState(null);
  const [Amount, setAmount] = useState(null);

  return (
    <>
      <NextHead 
        title="Fadderordning - Helping Hands" 
        description="Bli fadder og gi barn og unge i Tanzania muligheten til skolegang gjennom Helping Hands fadderordning."
      />

      <div className="omfadder">
        <div className="con omfadder--padding"> 
        <h2>Fadderordning</h2>
        <h3>Om fadderordningen</h3>
        <p className="fadderp">
          Som fadder gir du et barn i Tanzania noe som varer, nemlig skolegang. 
          Hver måned dekker du skole, utstyr og uniform, og følger barnet gjennom 
          skoleårene. I noen tilfeller hjelper vi også familier som står i en 
          spesielt vanskelig situasjon.
        </p>
        <p className="fadderp">
          Vil du ikke binde deg til ett bestemt barn, kan du bli månedlig giver. 
          Da fordeler vi støtten din der behovet er størst, for eksempel til barn 
          uten fadder, ved sykdom eller i andre krevende situasjoner. Det velger 
          du rett i skjemaet.
        </p>
        {/* <p className="fadderp">
          <a href="/vipps-fadder" className="sponsor-link sunshinelink">
            Fyll ut dette skjemaet dersom du ønsker å bli fadder</a>, 
            så tar vi kontakt med deg!
        </p> */}
        <p className="fadderp">
          Bli fadder i dag, og gi et barn muligheten til å fullføre skolen.
        </p>
        <a
          href={`/vipps-fadder`}
          className="btn btn--sponsor"
        >
          Bli fadder 
        </a>
      </div>
      </div>
      <div className="ledigefadder con">
        <h3>Venter på fadder</h3>
        <Fadderbarn setId={setId} setImg={setImg} setName={setName} setDesc={setDesc} setAmount={setAmount} />
        {Img && (
          <MerInfo
            Id={Id}
            Img={Img}
            setImg={setImg}
            Name={Name}
            Desc={Desc}
          />
        )}
      </div>
      {/* <div className="andrefadder">
        <div className="con andrefadder--padding">
        <h3>Andre med behov for ekstra støtte</h3>
        <Andre setId={setId} setImg={setImg} setName={setName} setDesc={setDesc} setAmount={setAmount} />
        {Img && (
          <MerInfo
            Id={Id}
            Img={Img}
            setImg={setImg}
            Name={Name}
            Desc={Desc}
          />
        )}
        </div>
      </div> */}
      <div className="faqfadder con">
        <h3>Fadderordning FAQ - vanlig stilte spørsmål</h3>
        <h4 className="h4-questions">
          Hva er det jeg betaler for når jeg er fadder for et barn/en ungdom?
        </h4>
        <p className="fadderp">
          Når du blir fadder for et barn, vil det stå oppført hva som er inkludert 
          i beløpet du betaler. Vanligvis dekker dette skolekostnader, skoleutstyr 
          og skoleuniform. Skolekostnadene varierer fra skole til skole.{" "}
        </p>
        <h4 className="h4-questions">
          Hva skjer dersom jeg ikke lenger har mulighet til å være fadder?
        </h4>
        <p className="fadderp">
          Hvis du må avslutte, står ikke barnet plutselig uten skolegang. Vi 
          forplikter oss til barna vi har tatt inn, og følger dem videre. Samtidig 
          er det de faste fadderne som avgjør hvor mange nye barn vi kan si ja til. 
          Vi vet at livet går i faser, så si fra i god tid hvis du må stoppe, så 
          finner vi en løsning sammen.
        </p>
        <h4 className="h4-questions">Hvor ofte får jeg oppdateringer om fadderbarnet mitt?</h4>
        <p className="fadderp">
          Hvor mange oppdateringer du får, kan variere. Noen barn og ungdommer 
          bor i nærheten av prosjektlederen vår, Gladness, i Tanzania og/eller 
          trenger ekstra oppfølging. Andre studerer langt unna, og det kan 
          gjøre oppfølgingen mer sporadisk.

          Vi gjør vårt beste for å holde fadderne oppdatert, men det er 
          viktig å vite at dette arbeidet skjer på frivillig basis og uten lønn. 
          Det betyr samtidig at alle pengene går direkte til barnet ditt og 
          til formålet vi har beskrevet.
        </p>
      </div>
    </>
  );
};

export default Fadderordning;