import React from "react";
import "../../css/gosti2.css";

const GuestItems = ({ item, handleClick }) => {
  if (item.kolicina > 0) {
    return (
      <div className="cards">
        <div className="details">
          <div>
            <span className="shop-item-title">{item.ime}</span>
          </div>
          <div>
            <span className="opisItems">{item.opis}</span>
          </div>
          <div>
            <span className="shop-item-price">{item.cijena}KM</span>
          </div>
          <div>
            <button
              className="btn btn-primary shop-item-button"
              onClick={() => handleClick(item)}
            >
              DODAJ
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default GuestItems;
