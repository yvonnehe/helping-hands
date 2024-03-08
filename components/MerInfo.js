import { useEffect, useRef } from 'react';

const MerInfo = ({ Img, setImg, Name, setName, Desc, setDesc }) => {
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
      document.body.style.overflow = 'hidden'; // Disable scrolling on the body
      closeBtnRef.current.focus(); // Auto-focus on the close button
    } else {
      document.body.style.overflow = ''; // Re-enable scrolling
    }

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      document.body.style.overflow = ''; // Ensure scrolling is re-enabled
      window.removeEventListener('keyup', handleKeyUp); // remove focus from close button
    };
  }, []);

  return (
    <div className="backdrop" onClick={exit}>
      <div className="description">
        <button onClick={exit} class="close-btn" tabIndex="0" ref={closeBtnRef}>&times;</button>
        <img src={Img} alt="Bigger image"></img>
        <h4 className="name">{Name}</h4>
        <p className="desc">{Desc}</p>
      </div>
    </div>
  );
};

export default MerInfo;
