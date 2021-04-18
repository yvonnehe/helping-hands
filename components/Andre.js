const Andre = ({ setImg }) => {
  return (
    <div className="img-grid">
      <div className="img-wrap" onClick={() => setImg("/mama-vanessa.jpg")}>
        <img src="/mama-vanessa.jpg"></img>
      </div>
      <div className="img-wrap" onClick={() => setImg("/ndelekwa.jpg")}>
        <img src="/ndelekwa.jpg"></img>
      </div>
    </div>
  );
};

export default Andre;
