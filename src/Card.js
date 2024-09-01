// Card.js
import React from 'react';
import './Card.css';

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card"  onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
<<<<<<< HEAD
          src="public/image/back.png"
=======
          src={process.env.PUBLIC_URL + "/image/back.png"}
>>>>>>> 47ce11b (footer-added)
          alt="card back"
        />
        </div>
    </div>
  );
};

export default Card;
