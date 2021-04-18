const Fadderbarn = ({ setImg }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-student-square.jpg")}
      >
        <img
          src="/helping-hands-student-square.jpg"
          alt="Tanzanian student"
        ></img>
        <h4>Raymond</h4>
        <p>desc ray</p>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-nathalya.jpg")}
      >
        <img src="/helping-hands-nathalya.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-obedi.jpg")}
      >
        <img src="/helping-hands-obedi.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-amos.jpg")}
      >
        <img src="/helping-hands-amos.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-kurwa.jpg")}
      >
        <img src="/helping-hands-kurwa.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-musa.jpg")}
      >
        <img src="/helping-hands-musa.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-joyce.jpg")}
      >
        <img src="/helping-hands-joyce.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-joseph.jpg")}
      >
        <img src="/helping-hands-joseph.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-jonas.jpg")}
      >
        <img src="/helping-hands-jonas.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => setImg("/helping-hands-ali.jpg")}
      >
        <img src="/helping-hands-ali.jpg" alt="Tanzanian student"></img>
      </div>
      <div className="img-wrap" onClick={() => setImg("/Adrian.jpg")}>
        <img src="/Adrian.jpg" alt="Tanzanian child"></img>
      </div>
    </div>
  );
};

export default Fadderbarn;
