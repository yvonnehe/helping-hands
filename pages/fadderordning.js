import NextHead from "../components/NextHead";
import Fadderbarn from "../components/Fadderbarn";
import Andre from "../components/Andre";
import MerInfo from "../components/MerInfo";
import { useState } from "react";

const Fadderordning = () => {
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
          Helping Hands' fadderordning er laget for å støtte barn og ungdom gjennom skolegangen – og i noen tilfeller også familier som trenger hjelp av spesielle grunner.
          Vi ønsker å gi flest mulig barn og unge mulighet til skolegang og høyere utdanning.
        </p>
        <p className="fadderp">
          Dersom du ikke ønsker å være fadder for et spesifikt barn, kan du også kontakte oss 
          for å bli månedlig giver. Da fordeler vi midlene der behovet er størst – 
          for eksempel til barn uten fadder, ved sykdom, 
          eller i andre krevende situasjoner.
        </p>
        {/* <p className="fadderp">
          <a href="/vipps-fadder" className="sponsor-link sunshinelink">
            Fyll ut dette skjemaet dersom du ønsker å bli fadder</a>, 
            så tar vi kontakt med deg!
        </p> */}
        <p className="fadderp">
          Fyll ut fadderskjemaet for å bli fadder – og gi et barn en bedre fremtid.
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
        <Fadderbarn setImg={setImg} setName={setName} setDesc={setDesc} setAmount={setAmount} />
        {Img && (
          <MerInfo
            Img={Img}
            setImg={setImg}
            Name={Name}
            setName={setName}
            Desc={Desc}
            setDesc={setDesc}
            Amount={Amount}
            setAmount={setAmount}
          />
        )}
      </div>
      <div className="andrefadder">
        <div className="con andrefadder--padding">
        <h3>Andre med behov for ekstra støtte</h3>
        <Andre setImg={setImg} setName={setName} setDesc={setDesc} setAmount={setAmount} />
        {Img && (
          <MerInfo
            Img={Img}
            setImg={setImg}
            Name={Name}
            setName={setName}
            Desc={Desc}
            setDesc={setDesc}
            Amount={Amount}
            setAmount={setAmount}
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
          Når du blir fadder for et barn, vil det stå oppført hva som er inkludert 
          i beløpet du betaler. Vanligvis dekker dette skolekostnader, skoleutstyr 
          og skoleuniform. Skolekostnadene varierer fra skole til skole.{" "}
        </p>
        <h4 className="h4-questions">
          Hva skjer dersom jeg ikke lenger har mulighet til å være fadder?
        </h4>
        <p className="fadderp">
          Dersom du må avslutte fadderskapet, betyr ikke det at barnet ditt 
          plutselig står uten skolegang. Vi forplikter oss til barna vi støtter, 
          og vil fortsette å følge dem opp.

          Men det får konsekvenser for hvor mange barn vi har kapasitet til 
          å hjelpe. Uten faste inntekter og faddere til å støtte arbeidet vårt, 
          kan vi dessverre ikke love støtte til flere barn – selv om behovet er stort.

          Vi har full forståelse for at livet går i faser – noen ganger har 
          man mulighet til å bidra, andre ganger ikke. Dette skal ikke gå 
          utover barna, men vår kapasitet til å hjelpe flere avhenger av støtten vi får.
        </p>
        <h4 className="h4-questions">Hvor mange oppdateringer får jeg/vi?</h4>
        <p className="fadderp">
          Hvor mange oppdateringer du får, kan variere. Noen barn og ungdommer 
          bor i nærheten av prosjektlederen vår, Gladness, i Tanzania og/eller 
          trenger ekstra oppfølging. Andre studerer langt unna, og det kan 
          gjøre oppfølgingen mer sporadisk.

          Vi gjør vårt beste for å holde fadderne oppdatert – men det er 
          viktig å vite at dette arbeidet skjer på frivillig basis og uten lønn. 
          Det betyr samtidig at alle pengene går direkte til barnet ditt og 
          til formålet vi har beskrevet.
        </p>
      </div>
    </>
  );
};

export default Fadderordning;
