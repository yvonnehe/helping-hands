import { fadderbarnList } from "../data/fadderbarn";

const Fadderbarn = ({ setImg, setName, setDesc, setAmount }) => {
  const barn = fadderbarnList.filter(b => b.category === "fadderbarn");

  return (
    <div className="img-grid">
      {barn.map((child) => (
        <div
          key={child.name}
          className="img-wrap"
          onClick={() => {
            setImg(child.image);
            setName(child.name);
            setDesc(child.description);
            setAmount(child.amount);
          }}
        >
          <img src={child.image} alt={child.name} />
        </div>
      ))}
    </div>
  );
};

export default Fadderbarn;
