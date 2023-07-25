const Fadderbarn = ({ setImg, setName, setDesc }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-zakayo.jpg");
          setName("Zakayo");
          setDesc("Han er 20 år gammel. Han og brødrene har mistet begge foreldrene sine. Likevel står de på, og kjemper for drømmene sine. Zakayo er ferdig på videregående med god hjelp fra faddere. Nå har han begynt på studie for å bli farmasøyt. For skolegang, kost og losji, pensumbøker og alt utstyr han trenger mangler han 740 kr i mnd. Dette beløpet kan deles på flere faddere."
          );
        }}
      >
        <img src="/helping-hands-zakayo.jpg" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-mohammed.png");
          setName("Mohammed");
          setDesc("Han er 19 år gammel. Han er ikke så glad i skolebenken og synes det er utfordrende. Han må gjenta et klassetrinn, og i Tanzania må det da gjøres privat. Han vil ikke gi seg, og skal jobbe hardere enn noen gang. Vi synes alle fortjener en ny sjanse. Det er godt nok så lenge man gjør sitt beste. Han har allerede en fadder. For de resterende 480 kr i mnd kan du hjelpe han med skolegang, kost og losji, uniform, hygieneprodukter og alt annet han trenger til oppholdet på boarding skole."
          );
        }}
      >
        <img src="/helping-hands-mohammed.png" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-rashid.png");
          setName("Rashid");
          setDesc("Han er 12 år gammel og går siste året på barneskolen. Han har 5 søsken. Han trenger hjelp til videre skolegang. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-rashid.png" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-mary.png");
          setName("Mary");
          setDesc("Hun er 13 år gammel og går siste året på barneskolen. Hun bor med mor og 2 søsken. Hun trenger din hjelp. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-mary.png" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-abdala.png");
          setName("Abdala");
          setDesc("Han er 9 år gammel og går i 3. Klasse. Han bor med mor og lillebror. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-abdala.png" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-christopher.png");
          setName("Christopher");
          setDesc("Han er 8 år gammel og går i 3.klasse. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-christopher.png" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-salimu.png");
          setName("Salimu");
          setDesc("Han er 11 år gammel og går i 5.klasse. Han bor med mor og 2 søsken. For mat på skolen, sko, sekk, uniform og andre nødvendigheter koster det 100 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-salimu.png" alt="Tanzaniansk student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-irene.png");
          setName("Irene");
          setDesc("Hun er 17 år gammel. Hun vil gjerne fortsette skolegangen, men moren har andre planer og vil ikke betale for henne. Hun trenger hjelp til å betale ungdomsskolen. For 480kr i mnd kan du hjelpe henne med skolegang, uniform og alle skolesaker hun trenger."
          );
        }}
      >
        <img src="/helping-hands-irene.png" alt="Tanzaniansk student"></img>
      </div>
    </div>
  );
};

export default Fadderbarn;
