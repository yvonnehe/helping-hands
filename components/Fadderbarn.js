const Fadderbarn = ({ setImg, setName, setDesc }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-student-square.jpg");
          setName("Raymond");
          setDesc(
            "Han har tidligere fått hjelp av oss til å fullføre videregående. Nå tar han bachelor i «forsikring og risikoanalyse». Han er er fantastisk ung mann, som jobber beinhardt. For skolegang, kost, losji og alt av skoleutstyr koster det 1200kr i mnd. Han har allerede noen faddere, men trenger flere for å dekke hele summen. Han mangler støtte på 550kr i mnd. Denne summen kan deles på flere faddere."
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
          setImg("/helping-hands-nathalya.jpg");
          setName("Nathalya");
          setDesc(
            "En bestemt ung jente. Hun er 16 år gammel og bor med foreldrene, men faren er veldig syk og kan ikke jobbe, derfor har de ikke så mye. Hun drømmer om å bli dyrepleier/veterinær/jobbe med dyr. Nå går hun på videregående. Du kan støtte henne med skolegang, sekk, uniform, skoleting og det hun trenger for 570kr i mnd. Hun har allerede en fadder, men vi trenger en til for 380kr i mnd eller 2 for 190kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-nathalya.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-obedi.jpg");
          setName("Obedi");
          setDesc(
            "Han er 18 år gammel og går på videregående. Drømmer om å studere økonomi eller noe innenfor business. Snill og beskjeden, ønsker seg en utdannelse så han kan ta vare på moren og familien sin. Du kan støtte ham med skolegang, uniform, skoleutstyr, madrass, sekk og det han trenger for 570kr i mnd. Han har allerede to faddere, men trenger en til som kan støtte han med de resterende 177kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-obedi.jpg" alt="Tanzanian student"></img>
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
          setImg("/helping-hands-kurwa.jpg");
          setName("Kurwa");
          setDesc(
            "Hun trenger hjelp til «beauty» utdannelse. I august er hun ferdig med utdannelsen og praksis. Hun har en tvillingsøster som er veldig viktig for henne. Begge foreldrene deres er døde, og har bodd hos tanten. For 570kr i måneden (betalt over ett år), kan du støtte henne med alt hun trenger gjennom utdannelsen. Skolepenger, opphold på internatskole, måltider, produkter til utdannelsen og andre småting. Denne summen kan også deles på to eller flere faddere."
          );
        }}
      >
        <img src="/helping-hands-kurwa.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-musa.jpg");
          setName("Musa");
          setDesc(
            "Han er 14 år gammel, og bor med lillesøster, storesøster og foreldrene. Familien er i en vanskelig situasjon og hadde satt stor pris hjelp. For 400kr i mnd får han skolegang, mat på skolen, sekk, uniform og skrivesaker. Vi har allerede en fadder til Musa, men trenger noen som kan dekke de resterende 350kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-musa.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-joyce.jpg");
          setName("Joyce");
          setDesc(
            "Hun er fra en av familiene våre der moren er alenemamma med 3 barn. Joyce er den eldste. De har ikke så mye, og hun har ikke fått mulighet til å fullføre skolen. Hun ønsker å gå på videregående så hun kan få en utdannelse! Du kan bli fadder for Joyce for 570kr i mnd, eller dele beløpet med en eller flere andre. Alt hjelper for henne så hun kan få gått på skolen."
          );
        }}
      >
        <img src="/helping-hands-joyce.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-jonas.jpg");
          setName("Jonas");
          setDesc(
            "Har ønsket å gå på videregående men ikke hatt råd. Det er kun han og moren. Du kan støtte ham med skolegang, uniform, sekk, madrass, skoleutstyr og det han trenger på skolen for 630kr. Vi har en fadder som støtter med 315kr, og ønsker også gjerne evt en fadder til på 315kr eller to faddere på mindre beløp."
          );
        }}
      >
        <img src="/helping-hands-jonas.jpg" alt="Tanzanian student"></img>
      </div>
    </div>
  );
};

export default Fadderbarn;
