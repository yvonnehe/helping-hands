const Fadderbarn = ({ setImg, setName, setDesc }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-student-square.jpg");
          setName("Raymond");
          setDesc(
            "Han har tidligere fått hjelp av oss til å fullføre videregående. Nå tar han bachelor i «forsikring og risikoanalyse». Han er er fantastisk ung mann, som jobber beinhardt. For skolegang, kost, losji og alt av skoleutstyr koster det 1200kr i mnd. Han har allerede noen faddere, men trenger flere for å dekke hele summen. Han mangler støtte på 250 kr i mnd. Denne summen kan deles på flere faddere."
          );
        }}
      >
        <img
          src="/helping-hands-student-square.jpg"
          alt="Tanzanian student"
        ></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-amos.jpg");
          setName("Amos");
          setDesc(
            "En av mødrene vi hjelper, har fått problemer med å få jobb nå pga korona situasjonen i Tanzania. Hun har derfor ikke klart å betale skolen for sønnen slik hun pleier. Vi ønsker å hjelpe henne, og sønnen hennes gjennom denne vanskelige tiden. Han drømmer om å bli lege. Du kan støtte ham gjennom hans skolegang med 325kr i mnd. Eller et mindre månedlig beløp, alt hjelper."
          );
        }}
      >
        <img src="/helping-hands-amos.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-zakayo.jpg");
          setName("Zakayo");
          setDesc("Zakayo er 20 år gammel. Han og brødrene har mistet begge foreldrene sine. Likevel står de på, og kjemper for drømmene sine. Zakayo er ferdig på videregående med god hjelp fra faddere. Nå har han begynt på studie for å bli farmasøyt. For skolegang, kost og losji, pensumbøker og alt utstyr han trenger koster det 12 600 kr i året. Han har allerede en fadder, men trenger flere som kan støtte med den resterende summen på 740 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-zakayo.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-emmanuel.jpg");
          setName("Emmanuel");
          setDesc("Han er 17 år gammel og har akkurat begynt på boarding skole. Han har vokst opp med mange søsken, og måtte tidlig lære seg å ta ansvar. Han er nest eldst i søskenflokken, og har fungert som en “far” for sine yngre søsken. Det har vært lite tid til skolearbeid, helt til nå. Han er glad for å endelig kunne fokusere på skolearbeid. Han har allerede en fadder. For de resterende 580 kr i mnd kan du hjelpe han med skolegang, kost og losji, uniform, hygieneprodukter og alt annet han trenger til oppholdet på boarding skole."
          );
        }}
      >
        <img src="/helping-hands-emmanuel.jpg" alt="Tanzanian student"></img>
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
        <img src="/helping-hands-mohammed.png" alt="Tanzanian student"></img>
      </div>
    </div>
  );
};

export default Fadderbarn;
