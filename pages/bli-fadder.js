import NextHead from "../components/NextHead";

const BliFadder = () => {
  return (
    <>
      <NextHead />

      <div className="container-fluid">
        <div className="kontakt row">
          <div className="col-md-6">
            <h2>Bli fadder</h2>
            <h3 className="kontakt__h3">
              Dersom det er noe du lurer på, kan du gjerne ta kontakt med oss.
            </h3>
            <form>
                <div className="form-group">
                    <label for="name">Navn</label>
                    <input type="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">E-post adresse</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">
                        Brukes kun til å sende oppdateringer om ditt fadderbarn eller annen fadder relevant informasjon.
                    </small>
                </div>

                <div className="form-group">
                    <label for="fadderbarn">Fadderbarn</label>
                    <select className="form-control" id="fadderbarn">
                        <option>Velg fadderbarn</option>
                        <option value="1">La oss komme med et forslag</option>
                        <option value="2">Navn</option>
                        <option value="3">Navn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label for="amount">Beløp</label>
                    <input type="number" className="form-control" id="amount" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Kommentar</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="fasttrekk" value="fasttrekk" aria-describedby="paymentHelp" />
                        <label className="form-check-label" for="fasttrekk">Fast trekk</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="avtalegiro" value="avtalegiro" aria-describedby="paymentHelp" />
                        <label className="form-check-label" for="avtalegiro">AvtaleGiro</label>
                    </div> 
                </div>
                <small id="paymentHelp" className="form-text text-muted">
                    Ved valg av AvtaleGiro påløper et fakturagebyr på 39kr. Fast trekk settes opp i egen nettbank.
                </small>

                <button className="btn btn--orange" type="submit">
                    Send
                </button>
            </form>
          </div>
          <div className="col-md-6">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default BliFadder;
