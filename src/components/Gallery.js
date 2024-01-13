import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import '../styles/gallery.css'
import { useParams } from "react-router-dom";

const Gallery = ({isMobile, addToDeck, removeFromDeck, deck}) => {

    const [hiddenComponents, setHiddenComponents] = useState(isMobile);
    const [hiddenAccessories, setHiddenAccessories] = useState(isMobile);
    const [data, setData] = useState([]);
    const [filterCurrent, setFilterCurrent] = useState('');
    const params = useParams(); 

  

    const fetchData =  async(pFilter = null) => {
        let data = await fetch('https://raw.githubusercontent.com/jackfriedman616/mtg-deckbuilder/master/public/Products.json')
                    .then(res => res.json())
                    .catch(err => []); 
                    
        //filter data
        if (pFilter !== null && pFilter.length > 0) {
          data = data.filter(d => {return d.colorId[0] === pFilter.toLowerCase()})
        }
        setData(data);
    }
    const fetchData2 =  async(pFilter = null) => {
        let data = await fetch('https://raw.githubusercontent.com/jackfriedman616/mtg-deckbuilder/master/public/Products.json')
                    .then(res => res.json())
                    .catch(err => []); 
                    
        //filter data
        if (pFilter !== null && pFilter.length > 0) {
          data = data.filter(d => {return d.colorId.toLowerCase().includes(pFilter.toLowerCase()) | d.name.toLowerCase().includes(pFilter.toLowerCase()) | d.description.toLowerCase().includes(pFilter.toLowerCase())})
          console.log(data);
        }
        setData(data);
    }

    useEffect(() => {
      fetchData();
    }, [])

    useEffect(() => {
      fetchData(filterCurrent);
    }, [filterCurrent])

    useEffect(() => {
      setHiddenComponents(isMobile ? true : false)
      setHiddenAccessories(isMobile ? true : false)
    }, [isMobile])

    useEffect(() => {
      fetchData2(params.searchTerm); 
    },[params.searchTerm])
    
    const hideComp = () => {
      console.log(isMobile ? true : false)
      setHiddenAccessories(isMobile ? true : hiddenAccessories)
      setHiddenComponents(!hiddenComponents)
    }
    
    const hideAccessories = () => { 
      console.log(isMobile ? true : false)
      setHiddenComponents(isMobile ? true : hiddenComponents)
      setHiddenAccessories(!hiddenAccessories)
    }

    const setFilter = ( e ) => {
      console.log(e.target.innerText)
      setFilterCurrent(e.target.innerText);
      fetchData(e.target.innerText);
    }


    return (
      <div className="gallery-container">
        
        <div className="grid"> 
          <ul className="sidebar">
            <div>
              <h5 onClick={hideComp}>Components <i className={`fa-solid ${ hiddenComponents ? 'fa-caret-left': 'fa-caret-down'}`}></i></h5>
              <ul className={`${hiddenComponents ? 'hidden' : ''}`}>
                <li className={`filter-item ${filterCurrent==='White' ? 'filter-item-active' : ''}`} onClick={setFilter}>White <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Blue' ? 'filter-item-active' : ''}`} onClick={setFilter}>Blue <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Black' ? 'filter-item-active' : ''}`} onClick={setFilter}>Black <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Red' ? 'filter-item-active' : ''}`} onClick={setFilter}>Red <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Green' ? 'filter-item-active' : ''}`} onClick={setFilter}>Green <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Multicolor' ? 'filter-item-active' : ''}`} onClick={setFilter}>Multicolor <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
              </ul>
            </div>
            <div>
              <h5 onClick={hideAccessories}>Accessories <i className={`fa-solid ${ hiddenAccessories ? 'fa-caret-left': 'fa-caret-down'}`}></i></h5>
              <ul className={`${hiddenAccessories ? 'hidden' : ''}`}>
                <li className={`filter-item ${filterCurrent==='Mouse' ? 'filter-item-active' : ''}`} onClick={setFilter}>Mouse <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Keyboards' ? 'filter-item-active' : ''}`} onClick={setFilter}>Keyboards <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Headset' ? 'filter-item-active' : ''}`} onClick={setFilter}>Headset <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
                <li className={`filter-item ${filterCurrent==='Stickers' ? 'filter-item-active' : ''}`} onClick={setFilter}>Stickers <i className="ms-3 fa-regular fa-circle-xmark" onClick={setFilter}></i></li>
              </ul>
            </div>
          </ul>
          <div className="items">
            {data.length > 0 && data.map((item, index) => {
              return (
              <ItemCard data={item} key={`item-${item.id}`} addToDeck={addToDeck} deck={deck} removeFromDeck={removeFromDeck}/>
              )

            })}
            
          </div>
        </div>

    
          

      </div>
    );
  }
  
  export default Gallery;
  