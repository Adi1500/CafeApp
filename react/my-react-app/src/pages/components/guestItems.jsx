import React from "react";
import '../../css/gosti2.css'

const GuestItems = ({ item, handleClick }) => {
  if(item.kolicina_skladiste > 0){
    return (
      <div className="cards">
        <div className="details">
          <div><span className="shop-item-title">{item.ime_proizvoda}</span></div>
          <div><span className="opisItems">{item.opis_skladiste}</span></div>
          <div><span className="shop-item-price">{item.cijena_skladiste}KM</span></div>
          <div><button className="btn btn-primary shop-item-button" onClick={() => handleClick(item)}>DODAJ</button></div>
        </div>
      </div>
    );
  }
};

export default GuestItems;