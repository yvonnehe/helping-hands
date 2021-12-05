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
          setImg("/helping-hands-dorcas.jpg");
          setName("Dorcas");
          setDesc(
            "Moren til Dorcas fikk store økonomiske problemer da mannen døde. Dorcas trenger hjelp til skolegangen. Hun har allerede en fadder, men trenger flere for å dekke alle utgiftene. Du kan støtte henne med skolegang, uniform, sekk og skoleutstyr for de resterende 390 kr i mnd."
          );
        }}
      >
        <img src="/helping-hands-dorcas.jpg" alt="Tanzanian student"></img>
      </div>
    </div>
  );
};

export default Fadderbarn;
