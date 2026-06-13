import { fadderbarnList } from "../data/fadderbarn";

const Fadderbarn = ({ setId, setImg, setName, setDesc, setAmount }) => {
  const barn = fadderbarnList.filter((b) => b.category === "fadderbarn");

  const open = (child) => {
    setId(child.id);
    setImg(child.image);
    setName(child.name);
    setDesc(child.description);
    setAmount(child.amount);
  };

  return (
    <div className="img-grid">
      {barn.map((child) => (
        <div
          key={child.id}
          className="img-wrap"
          role="button"
          tabIndex={0}
          aria-label={`Mer om ${child.name}`}
          onClick={() => open(child)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open(child);
            }
          }}
        >
          <img src={child.image} alt={child.name} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  );
};

export default Fadderbarn;