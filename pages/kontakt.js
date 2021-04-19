import Head from "next/head";
import Image from "next/image";

const Kontakt = () => {
  return (
    <>
      <Head>
        <title>Helping Hands - Kontakt oss</title>
        <link rel="icon" href="/helping-hands-logo-icon.svg" />
      </Head>

      <div className="container-fluid">
        <div className="kontakt row">
          <div className="col-md-6">
            <h2>Kontakt oss</h2>
            <h3 className="kontakt__h3">
              Dersom det er noe du lurer på, kan du gjerne ta kontakt med oss.
            </h3>
            <h5>Helping Hands</h5>
            <h6>Generelle henvendelser</h6>
            <p className="epost">info@helpinghands.no</p>
            <h5>Daniélla Rodrigues</h5>
            <h6>CEO & Co-founder</h6>
            <p className="epost">daniella@helpinghands.no</p>
            <h5>Yvonne Helland</h5>
            <h6>CEO & Co-founder</h6>
            <p className="epost">yvonne@helpinghands.no</p>
          </div>
          <div className="col-md-6">
            <Image
              src="/gladness-carrying-uniforms.jpg"
              alt="Gladness carrying uniforms on her head"
              height="520"
              width="400"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Kontakt;
