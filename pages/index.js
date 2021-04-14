import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Helping Hands</title>
        <link rel="icon" href="/helping-hands-logo-icon-2.svg" />
      </Head>

      <h1>Gi skolegang i gave</h1>
      <p>Du kan støtte et barns skolegang gjennom vår fadderordning</p>
      <button class="btn btn--orange">LES MER</button>

      <div>
        <h3>
          Vil du bidra med å støtte barn og ungdom i skolegang i Tanzania?
        </h3>
        <h4>Støtt med VIPPS</h4>
        <p>Vipps til 13947 - Støtt oss med valgfritt beløp</p>
        <h4>Bli fadder</h4>
        <p>
          Du kan velge om du vil være Fadder for et spesifikt barn, eller støtte
          vårt arbeid med et månedlig beløp.
        </p>
      </div>

      <div>
        <h4>100% av innsamlede midler går til formålet</h4>
        <p>
          Tall basert på regnskap 2020. Vi ønsker at de pengene vi samler inn
          skal gå der de trengs mest, derfor gjør vi vårt ytterste for å gjøre
          dette mulig. Administrasjonskostnadene betaler vi fra egen lomme.
          Gladness sin lønn er betalt av egne givere som ønsker å støtte henne i
          arbeidet hun gjør.
        </p>
      </div>

      <div>
        <h3>Følg oss på sosiale medier</h3>
        <h4>For oppdateringer om hva vi jobber med</h4>
        <button class="btn btn--gray">Facebook</button>
        <button class="btn btn--gray">Instagram</button>
      </div>

      <div>
        <h3>Dette har vi fått til sammen</h3>
        <h4>Miriam</h4>
        <p>Kort tekst om Miriam</p>
      </div>
    </>
  );
}
