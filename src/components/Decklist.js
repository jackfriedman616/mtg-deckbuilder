import ItemCard from "./ItemCard.js";
import '../styles/decklist.css';
import { useEffect, useState } from "react";

const Decklist = ( {title = "Decklist", deck, addToDeck, removeFromDeck} ) => {

  const goldfishNotReady = () => {
    alert("Playtest environment not yet available. Sorry for the inconvenience.")
  }

  return (
    <div className="decklist mb-5">
      <h2 className="text-center mb-5 mt-5">{title}</h2>

      {deck.length === 0 && 
        <div className="text-center">Please go to the shop to add some products!</div>
      }

      <div className="items mb-5">
        {deck.map((b,index) => {
          return <ItemCard data={b} key={`item-${b.id}`} addToDeck={addToDeck} deck={deck} removeFromDeck={removeFromDeck}/>
        })}
      </div>

      <div className="btn-container mt-5 mb-5">
        <button onClick={goldfishNotReady}>Playtest</button>
      </div>
    </div>
  );
}

export default Decklist;