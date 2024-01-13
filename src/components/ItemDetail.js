import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import '../styles/itemDetail.css';

const ItemDetail = ({addToDeck, removeFromDeck, deck, isMobile}) => {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [counter, setCounter] = useState(0);
  const [mainImg, setMainImg] = useState([]);

  const fetchData = async () => {
    let dataAll = await fetch('https://raw.githubusercontent.com/jackfriedman616/MTG-Mongoose-React-Deckbuilder/main/Public/Products.json')
      .then(res => res.json())
      .catch(err => [])
    let item = dataAll.filter(i => {return i.id === params.id*1})[0];
    setItem(item);
    setMainImg(item.img);

    let rProducts = dataAll.filter(d => {return d.colorId[0] === item.colorId[0] && d.id !== item.id});
    setRelatedProducts(rProducts);

    let oProducts = dataAll.filter(d => d.id !== item.id);
    oProducts.sort(() => Math.random() > 0.5 ? 1 : -1);
    let oProduct = oProducts.slice(0,10);
    setOtherProducts(oProduct);
  }

  useEffect(() => {
    window.scrollTo({top: 0})
    fetchData();
    getCurrentCount();
  }, [params.id])

  useEffect(() => {
    getCurrentCount()
  }, [deck, item])

  const getCurrentCount = () => {
    let inDeckItem = [...deck.filter(b => b.id === item.id)];
    if (inDeckItem[0]?.hasOwnProperty('count') ) {
      setCounter(inDeckItem[0].count);
    } else {
      setCounter(0);
    }
  }

  const scrollLeft = (e) => {
    let slider = e.target.parentElement.querySelector('.slider');
    let newScroll = slider.scrollLeft - 400 > 0 ? slider.scrollLeft - 400 : 0;
    slider.scrollTo({left: newScroll, behavior: 'smooth'})
  }

  const scrollRight = (e) => {
    let slider = e.target.parentElement.querySelector('.slider');
    let newScroll = slider.scrollLeft + 400 < slider.scrollWidth ? slider.scrollLeft + 400 : slider.scrollWidth;
    slider.scrollTo({left: newScroll, behavior: 'smooth'})
  }

  const increment = () => {
    addToDeck(item);
  }

  const decrement = () => {
    removeFromDeck(item);
    setCounter( counter-1 > 0 ? counter - 1 : 0);
  }

  const setImage = (e) => {
    setMainImg(item.img[e.target.id.split("-")[2]])
  }

  return(
    <div className="item-detail mt-5">
      <div className="item-detail-header">
        <h1>{item.name}</h1>

        <div className={`d-flex flex-row h-auto ${isMobile ? '' : 'justify-content-center' }`}>
          <i className="fa-solid fa-square-minus me-3 text-red pointer" onClick={decrement}></i>
          <span className='me-3'>{counter}</span>
          <i className="fa-solid fa-square-plus me-3 text-green pointer" onClick={increment}></i>
        </div>
      </div>
      <div className="item-detail-description">
        {item.description}
      </div>
      <div className="img-detail-container">
        <div>
          <img src={mainImg.link} className="main-img" alt={mainImg.title} title={mainImg.title} />
        </div>
        <div>
                {item?.img?.map((im, ind) => {
                    return <img key={`img-sm-${ind}`} id={`img-sm-${ind}`} src={im.link} alt={`Product ${ind}`} className={`small-img ${mainImg.link === im.link ? 'active-img' : ''}`} onClick={setImage}/>
                    })
                }
        </div>
      </div>


      <div className={`item-detail-slider-1 ${relatedProducts.length === 0 ? 'd-none': ''}`}>
        <h3 className="mt-5 mb-2">Related Products</h3>
        <div className="slider-container mb-5">
          <i className="fa-solid fa-caret-left fa-3x" onClick={scrollLeft}></i>
          <div className="slider">
            {relatedProducts.length > 0 && relatedProducts.map((r,ind) => {
              return (
                <ItemCard data={r} key={`item-${r.id}`} addToDeck={addToDeck} deck={deck} removeFromDeck={removeFromDeck}/>
              )
            })}
          </div>
          <i className="fa-solid fa-caret-right fa-3x" onClick={scrollRight}></i>
        </div>
      </div>

      <div className={`item-detail-slider-2 ${otherProducts.length === 0 ? 'd-none' : ''}`}>
        <h3 className="mt-5 mb-2">Users Also Viewed</h3>
        <div className="slider-container mb-5">
          <i className="fa-solid fa-caret-left fa-3x" onClick={scrollLeft}></i>
          <div className="slider">
            {otherProducts.length > 0 && otherProducts.map((p,ind) => {
              return (
                <ItemCard data={p} key={`item-${p.id}`} addToDeck={addToDeck} deck={deck} removeFromDeck={removeFromDeck}/>
              )
            })}
          </div>
          <i className="fa-solid fa-caret-right fa-3x" onClick={scrollRight}></i>
        </div>
      </div>
    </div>
  )
}

export default ItemDetail;