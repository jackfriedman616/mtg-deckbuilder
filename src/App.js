import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './styles/variables.css';
import './styles/index.css';

import Home from "./components/Home.js";
import Nav from "./components/Nav.js";
import Gallery from "./components/Gallery.js";
import ItemDetail from "./components/ItemDetail.js";
import Checkout from "./components/Decklist.js";
import Footer from "./components/Footer.js";

const App = () => {

  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width:768px").matches)
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const [deckCount, setDeckCount] = useState(0); 
  const [deck, setDeck] = useState([]); 


  const addToDeck = ( pItem ) => {
    // pass the item through
    // check if the item is already in the basket
    let addNew = true;
    deck.forEach(b => {
      if (b.id === pItem.id) {
        b.count++;
        addNew = false;
      }
    }); 

    let vDeck = [...deck];
    if(addNew)  {
      let vItem = pItem;
      vItem.count = 1; 
      vDeck.push(vItem);
    }
    setDeck(vDeck);

  }

  const removeFromDeck = (pItem) => {
    deck.forEach(b => {
      if (b.id === pItem.id) {
        b.count--;
      }
    });

    let newDeck = deck.filter(b => b.count > 0)
    setDeck(newDeck);
  }



  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    setIsMobile(window.matchMedia("(max-width:768px").matches);
  }

  useEffect(()=> {
    const timeout = setTimeout(() => {
      resizeWindow(); 
      window.addEventListener("resize", resizeWindow); 

    }, 500)
    return () => {
      window.removeEventListener("resize", resizeWindow)
      clearTimeout(timeout);
    }
  }, [windowWidth, windowHeight])

  useEffect(() => {
    let vDeck = [...deck]; 
    let count = vDeck.reduce((prev, curr) => {
      return prev + curr.count;
    },0)
    console.log(count);
    setDeckCount(count);
  }, [deck])

  return (
    <div className="grid grid-main">
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}> 
        <Nav isMobile={isMobile} deckCount={deckCount} deck={deck} addToDeck={addToDeck} removeFromDeck={removeFromDeck}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery isMobile={isMobile} addToDeck={addToDeck} removeFromDeck={removeFromDeck} deck={deck}/>} />
          <Route path="/gallery/:id" element={<ItemDetail addToDeck={addToDeck} removeFromDeck={removeFromDeck} deck={deck} isMobile={isMobile}/>} />
          <Route path="/decklist" element={<Checkout deck={deck} addToDeck={addToDeck} removeFromDeck={removeFromDeck}/>} />
          <Route path="/deck" element={<Checkout title="Deck" deck={deck} addToDeck={addToDeck} removeFromDeck={removeFromDeck}/>} />
          <Route path="/search/:searchTerm" element={<Gallery title="Deck" deck={deck} addToDeck={addToDeck} removeFromDeck={removeFromDeck} isMobile={isMobile}/>} />

        </Routes>
        <Footer />
      </BrowserRouter>      
    </div>
  );
}

export default App;
