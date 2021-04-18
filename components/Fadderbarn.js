const Fadderbarn = ({ setImg, setName, setDesc }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-student-square.jpg");
          setName("Raymond");
          setDesc("desc ray");
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
          setImg("/helping-hands-nathalya.jpg");
          setName("Nathalya");
          setDesc("desc nat");
        }}
      >
        <img src="/helping-hands-nathalya.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-obedi.jpg");
          setName("Obedi");
          setDesc("obedi");
        }}
      >
        <img src="/helping-hands-obedi.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-amos.jpg");
          setName("Amos");
          setDesc("amos");
        }}
      >
        <img src="/helping-hands-amos.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-kurwa.jpg");
          setName("Kurwa");
          setDesc("kurwa");
        }}
      >
        <img src="/helping-hands-kurwa.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-musa.jpg");
          setName("Musa");
          setDesc("musa");
        }}
      >
        <img src="/helping-hands-musa.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-joyce.jpg");
          setName("Joyce");
          setDesc("joyce");
        }}
      >
        <img src="/helping-hands-joyce.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-joseph.jpg");
          setName("Joseph");
          setDesc("joseph");
        }}
      >
        <img src="/helping-hands-joseph.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-jonas.jpg");
          setName("Jonas");
          setDesc("jonas");
        }}
      >
        <img src="/helping-hands-jonas.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/helping-hands-ali.jpg");
          setName("Ali");
          setDesc("desc ali");
        }}
      >
        <img src="/helping-hands-ali.jpg" alt="Tanzanian student"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/Adrian.jpg");
          setName("Adrian");
          setDesc("desc adrian");
        }}
      >
        <img src="/Adrian.jpg" alt="Tanzanian child"></img>
      </div>
    </div>
  );
};

export default Fadderbarn;
