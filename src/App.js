// App.js
import React, { useState, useEffect } from 'react';
import Card from './Card.js';
import './App.css';

const cardImages = [
  { src: process.env.PUBLIC_URL + "/image/cat.png", matched: false },
  { src: process.env.PUBLIC_URL + "/image/horse.png", matched: false },
  { src: process.env.PUBLIC_URL + "/image/dog.png", matched: false },
  { src: process.env.PUBLIC_URL + "/image/bull.png", matched: false },
  { src: process.env.PUBLIC_URL + "/image/lion.png", matched: false },
  { src: process.env.PUBLIC_URL + "/image/elephant.png", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [autoFlipTimeout, setAutoFlipTimeout] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);


  // Shuffle cards and start a new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setShowCelebration(false);
  };

  // Handle a card choice
  const handleChoice = (card) => {

    if(card === choiceOne) return;
    if (choiceOne) {
      setChoiceTwo(card);
      // Clear the auto-flip timeout when second choice is made
      clearTimeout(autoFlipTimeout);
    } else {
      setChoiceOne(card);
      // Set a timeout to auto-flip the first choice if no second card is selected
      const timeout = setTimeout(() => {
        resetTurn(); // Flip back the first card after 3 seconds
      }, 2000); // 3 seconds delay
      setAutoFlipTimeout(timeout);
    }
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setShowCelebration(true);
      setTimeout(() => {
        shuffleCards();
      }, 3000); // Add a short delay before resetting
    }
  }, [cards]);


  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Card Flip Game</h1>

      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice} 
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <button className="simple-button" onClick={shuffleCards}>New Game</button>
      {showCelebration && <div className="celebration">Congratulations! All Cards Matched!</div>}

      <p className="footer">Copyright &#169; 2024 Savan Desai. All Rights Reserved.</p>
    </div>
  );
}

export default App;
