import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemCard from './ItemCard';


import '../styles/nav.css'

const Nav = ({ isMobile, deckCount, deck, addToDeck, removeFromDeck }) => {


    const nav = useNavigate(); 
    const [hiddenNav, setHiddenNav] = useState(isMobile);
    const [desktopDeckVisible, setDesktopDeckVisible] = useState(false);
    const [total, setTotal] = useState(0); 
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      setHiddenNav(isMobile)
    }, [isMobile])


    useEffect(() => {
      if (searchTerm.length === 0) {
        nav('/Gallery')
      } else {
        nav('/search/'+searchTerm);
      }
    }, [searchTerm])

    const toggleNav = () => {
      setHiddenNav(!hiddenNav);
    }

    const desktopDeck = () => {
      let el = document.getElementById("desktop-deck");
      if(document.activeElement === el) {
        el.blur()
      } else {
        el.focus()
      }
      // setDesktopBasketVisible(!desktopBasketVisible);
    }

    const calculateTotal = () => {
      let sum = deck.reduce((prev, curr) => {
        return prev + (curr.price * curr.count); 
      }, 0)
      console.log("sum", sum); 
      setTotal(sum.toFixed(2)); 
    }

    const updateSearch = (e) => {
      setSearchTerm(e.target.value);
    }

    const enterPressed = (e) => {
      if (e.keyCode === 13 && isMobile) {
        setHiddenNav(true);

      } else {
        return;
      }
    }

    return (
      <div className="nav-container">
        <Link to="/" className="logo">
          <h2 >
            MTG <br></br> Gallery
          </h2>
        </Link>

        {isMobile?
          <i className="fa-solid fa-bars" onClick={toggleNav}></i>
          : null
        }

          <div className={`${isMobile ? "mobile-nav" : ""} ${hiddenNav ? "" : "active"}`}>
            <ul className={`nav`}>
                <li className="nav-items">
                    <Link to="/" className="nav-link" onClick={() => isMobile? setHiddenNav(true):null}>Home</Link>
                </li>
                <li className="nav-items">
                    <Link to="/shop" className="nav-link" onClick={() => isMobile? setHiddenNav(true):null}>Shop</Link>
                </li>
            </ul>
            <div className="icons">
              <div className="d-flex flex-row flex-nowrap align-item-center">
                <input id="search" type="text" value={searchTerm} onChange={updateSearch} onKeyUp={enterPressed}/>
                <i className="fa-solid fa-magnifying-glass" onClick={() => document.getElementById("search").focus()}></i>
              </div>
              <div>
                {isMobile &&
                  <Link to="/deck" className="inherit-color" onClick={() => isMobile? setHiddenNav(true):null}>
                    <i className="fa-solid fa-deck-shopping position-relative">
                      <span className="deck-count">{deckCount}</span>
                    </i>
                  </Link>
                }

                {!isMobile && 
                  <i className="fa-solid fa-deck-shopping position-relative" onClick={desktopDeck}>
                    <span className="deck-count">{deckCount}</span>
                  </i>

                }
              </div>
            </div>
          </div>

          {/* <div id="desktop-basket" className={`desktop-basket ${desktopBasketVisible ? 'visible' : 'invisible'} ${isMobile ? 'd-none' : ''}`}> */}
          <div id="desktop-deck" className={`desktop-deck  ${isMobile ? 'd-none' : ''}`} tabIndex="1">
                {/* <i className={`fa-solid fa-times ${desktopBasketVisible ? '' : 'd-none' }`} onClick={desktopBasket}></i> */}
                <i className={`fa-solid fa-times`} onClick={desktopDeck}></i>
                <div className="grid mt-5 mb-5 justify-content-center gap-3">
                  <h3 className="text-center">Deck</h3>
                  {deck.length > 0 && deck.map((b,ind) => {
                    return <ItemCard data={b} key={`item-${b.id}`} addToDeck={addToDeck} deck={deck} removeFromDeck={removeFromDeck}/>
                  })}

                  {/* Total */}
                  <div className="total mb-2">
                    Total: $<span>{total}</span>
                  </div>

                  {/* checkout button */}
                  <Link to="/decklist" className="btn" onClick={() => {document.getElementById("desktop-deck").blur()}}><button>Playtest</button></Link>
                </div>
          </div>
        
      </div>
    );
  }
  
  export default Nav;
  
