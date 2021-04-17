import Head from "next/head";

const Kontakt = () => {
  return (
    <>
      <Head>
        <title>Helping Hands - Kontakt oss</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="kontakt">
        <h2>Kontakt oss</h2>
        <h3>
          Dersom det er noe du lurer på, kan du gjerne ta kontakt med oss.
        </h3>
        <p>Vi er tilgjengelige på e-post:</p>
        <h5>Helping Hands</h5>
        <h6>Generelle henvendelser</h6>
        <p>info@helpinghands.no</p>
        <h5>Daniélla Rodrigues</h5>
        <h6>CEO & Co-founder</h6>
        <p>daniella@helpinghands.no</p>
        <h5>Yvonne Helland</h5>
        <h6>CEO & Co-founder</h6>
        <p>yvonne@helpinghands.no</p>
      </div>
    </>
  );
};

export default Kontakt;
