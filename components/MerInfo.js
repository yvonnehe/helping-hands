const MerInfo = ({ Img, setImg }) => {
  const exit = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setImg(null);
    }
  };

  return (
    <div className="backdrop" onClick={exit}>
      <img src={Img} alt="Bigger image"></img>
      <div className="description">
        <h4>{Name}</h4>
        <p>{Desc}</p>
      </div>
    </div>
  );
};

export default MerInfo;
