import { useEffect, useRef } from 'react';

const MerInfo = ({ Id, Img, setImg, Name, Desc }) => {
  const closeBtnRef = useRef(null);

  const exit = (e) => {
    if (e.target.classList.contains("backdrop") || e.currentTarget.className === "close-btn") {
      setImg(null);
    }
  };

  useEffect(() => {
    const handleKeyUp = (e) => {
      if (e.key === 'Escape') {
        setImg(null);
      }
    };

    if (Img) {
      document.body.style.overflow = 'hidden'; 
      closeBtnRef.current?.focus(); 
    } else {
      document.body.style.overflow = ''; 
    }

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      document.body.style.overflow = ''; 
      window.removeEventListener('keyup', handleKeyUp); 
    };
  }, [Img]);

  return (
    <div className="backdrop" onClick={exit}>
      <div className="description">
        <button onClick={exit} className="close-btn" tabIndex={0} ref={closeBtnRef}>
          &times;
        </button>
        <img src={Img} alt={Name} decoding="async" />
        <h4 className="name">{Name}</h4>
        <p className="desc">{Desc}</p>
        <a
          href={`/vipps-fadder?child=${encodeURIComponent(Id)}`}
          className="btn btn--child"
        >
          Bli fadder for {Name}
        </a>
      </div>
    </div>
  );
};

export default MerInfo;