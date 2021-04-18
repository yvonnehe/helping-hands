const Andre = ({ setImg, setName, setDesc }) => {
  return (
    <div className="img-grid">
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/mama-vanessa.jpg");
          setName("Mama Vanessa");
          setDesc("mama v");
        }}
      >
        <img src="/mama-vanessa.jpg"></img>
      </div>
      <div
        className="img-wrap"
        onClick={() => {
          setImg("/ndelekwa.jpg");
          setName("Ndelekwa");
          setDesc("desc");
        }}
      >
        <img src="/ndelekwa.jpg"></img>
      </div>
    </div>
  );
};

export default Andre;
