import '../styles/itemCard.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const ItemCard = ( {data, addToDeck, removeFromDeck, deck} ) => {

  const [counter, setCounter] = useState(0);

  useEffect(() => {

  }, [counter])
  useEffect(() => {
    getCurrentCount()
  }, [deck])

  const getCurrentCount = () => {
    let inDeckItem = [...deck.filter(b => b.id === data.id)];
    if (inDeckItem[0]?.hasOwnProperty('count') ) {
      setCounter(inDeckItem[0].count);
    }
  }

  const increment = () => {
    addToDeck(data);
    // setCounter(counter+1);
  }
  const decrement = () => {
    removeFromDeck(data);
    setCounter( counter-1 > 0 ? counter - 1 : 0);
  }

  return (
    <div className="item-card">

      <div className="img-container">
        <img src={data.img[0].link} alt={data.name}/>
        <Link className="overlay" to={`/shop/${data.id}`} >
          <span>View Product Detail</span>
        </Link>
      </div>
      <div className="item-name d-flex justify-content-evenly align-item-center">
        <span className="truncate-text" title={data.name}>{data.name}</span>
      </div>
      <div className='d-flex flex-row justify-content-center'>
        <i className="fa-solid fa-square-minus me-3 text-red pointer" onClick={decrement}></i>
        <span className="me-3">{counter}</span>
        <i className="fa-solid fa-square-plus me-3 text-green pointer" onClick={increment}></i>
      </div>

    </div>
  )
}

export default ItemCard;