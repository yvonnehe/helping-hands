const MerInfo = ({ Img, setImg, Name, setName, Desc, setDesc }) => {
  const exit = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setImg(null);
    }
  };

  return (
    <div className="backdrop" onClick={exit}>
      <div className="description">
        <img src={Img} alt="Bigger image"></img>
        <h4 className="name">{Name}</h4>
        <p className="desc">{Desc}</p>
      </div>
    </div>
  );
};

export default MerInfo;
