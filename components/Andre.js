const Andre = ({ setImg, setName, setDesc }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/mama-vanessa.jpg");
          setName("Mama Vanessa");
          setDesc(
            "Hun er mor til 2 barn, og jobber som skredder. Hun klarer ikke å jobbe så effektivt, da hun har en stygg skade i skulderen. Hun går til fysioterapeut hver uke, og er på riktig vei. Denne familien trenger støtte. Du kan være fadder for Mama Vanessa og barna, med et valgfritt beløp i mnd."
          );
        }}
      >
        <img src="/mama-vanessa.jpg"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/ndelekwa.jpg");
          setName("Ndelekwa");
          setDesc(
            "Han er lam etter en ulykke. Han har ingen familie til å ta vare på seg. Litt tilbake i tid ble han alvorlig syk, og måtte bli innlagt. Nå blir han tatt vare på av en sykepleier. Du kan være fadder for Ndelekwa, med et valgfritt beløp i mnd."
          );
        }}
      >
        <img src="/ndelekwa.jpg"></img>
      </div>
    </div>
  );
};

export default Andre;
