import { fadderbarnList } from "../data/fadderbarn";

const Andre = ({ setImg, setName, setDesc, setAmount }) => {
  const andre = fadderbarnList.filter(b => b.category === "andre");

  return (
    <div className="img-grid">
      {andre.map((person) => (
        <div
          key={person.name}
          className="img-wrap"
          onClick={() => {
            setImg(person.image);
            setName(person.name);
            setDesc(person.description);
            setAmount(person.amount);
          }}
        >
          <img src={person.image} alt={person.name} />
        </div>
      ))}
    </div>
  );
};

export default Andre;
