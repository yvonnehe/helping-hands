import NextHead from "../components/NextHead";
import Image from "next/image";

const Kontakt = () => {
  return (
    <>
      <NextHead 
        title="Kontakt - Helping Hands" 
        description="Ta kontakt med Helping Hands for generelle henvendelser eller samarbeid. Finn kontaktinformasjon til våre grunnleggere og organisasjonen her."
      />

    <div className="kontakt">
      <div className="container-fluid">
        <div className="row kontakt--padding">
          <div className="col-md-6">
            <h2>Kontakt oss</h2>
            <h3 className="kontakt__h3">
              Lurer du på noe, eller vil du komme i kontakt med oss? Vi svarer gjerne – send oss en e-post!
            </h3>
            <h4 className="contact-names">Helping Hands</h4>
            <h5 className="titles">Generelle henvendelser</h5>
            <p className="epost">info@helpinghands.no</p>
            <h4 className="contact-names">Daniélla Rodrigues</h4>
            <h5 className="titles">CEO & Co-founder</h5>
            <p className="epost">daniella@helpinghands.no</p>
            <h4 className="contact-names">Yvonne Helland</h4>
            <h5 className="titles">CEO & Co-founder</h5>
            <p className="epost">yvonne@helpinghands.no</p>
            <p className="orgnr">Org.nr: 915922058</p>
          </div>
          <div className="col-md-6">
            <img
              src="/gladness-carrying-uniforms.jpg"
              alt="Gladness som bærer uniformer på hodet"
              width="100%"
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Kontakt;
