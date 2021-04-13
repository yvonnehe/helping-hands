import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Helping Hands</title>
        <link rel="icon" href="/helping-hands-logo-icon-2.svg" />
      </Head>

      <h0>Gi skolegang i gave</h0>
      <p>Du kan støtte et barns skolegang gjennom vår fadderordning</p>
      <button>LES MER</button>

      <div>
        <h2>
          Vil du bidra med å støtte barn og ungdom i skolegang i Tanzania?
        </h2>
        <Image />
        <h3>Støtt med VIPPS</h3>
        <p>Vipps til 13947 - Støtt oss med valgfritt beløp</p>
        <Image />
        <h3>Bli fadder</h3>
        <p>
          Du kan velge om du vil være Fadder for et spesifikt barn, eller støtte
          vårt arbeid med et månedlig beløp.
        </p>
      </div>

      <div>
        <Image />
        <h3>100% av innsamlede midler går til formålet</h3>
        <p>
          Tall basert på regnskap 2020. Vi ønsker at de pengene vi samler inn
          skal gå der de trengs mest, derfor gjør vi vårt ytterste for å gjøre
          dette mulig. Administrasjonskostnadene betaler vi fra egen lomme.
          Gladness sin lønn er betalt av egne givere som ønsker å støtte henne i
          arbeidet hun gjør.
        </p>
      </div>

      <div>
        <h2>Følg oss på sosiale medier</h2>
        <h3>For oppdateringer om hva vi jobber med</h3>
        <button>Facebook</button>
        <button>Instagram</button>
      </div>

      <div>
        <h2>Dette har vi fått til sammen</h2>
        <Image />
        <h3>Miriam</h3>
        <p>Kort tekst om Miriam</p>
      </div>
    </>
  );
}
