import NextHead from "../components/NextHead";
import Image from "next/image";

const Kontakt = () => {
  return (
    <>
      <NextHead />

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
            <p className="orgnr">Org.nr: 915922058</p>
          </div>
          <div className="col-md-6">
            <img
              src="/gladness-carrying-uniforms.jpg"
              alt="Gladness carrying uniforms on her head"
              width="100%"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Kontakt;
