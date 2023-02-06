import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/skladiste.css";
import { ImCross } from "react-icons/im";

const ComponentConfig = ({ title }) => {
  const [storageList, setStorageList] = useState([]);
  function callAxiosStorage() {
    
    //axios.get('http://'+window.location.hostname+':3001/storage', {
    axios.get('https://novidrug.vercel.app/storage', {
        params: {
          title: title,
        },
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((data) => {
        console.log(data.data);
        setStorageList(data.data);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      callAxiosStorage();
      setInterval(() => {
        callAxiosStorage();
      }, 10000);
    }, 0);
  }, []);

  function removeFromStorage(event) {
    var answer = window.confirm("Da li želite ukloniti ovu narudžbu?");
    if (answer) {
      axios.post('https://novidrug.vercel.app/removeStorage', { id: event.target.id })
      //axios.post('http://'+window.location.hostname+':3001/removeStorage', { id: event.target.id })
    }
  }

  return (
    <form className="main-panel-form">
      <div className="main-panel-headers">
        <span className="main-panel-headers-items">Ime Proizvoda</span>
        <span className="main-panel-headers-items">Količina</span>
        <span className="main-panel-headers-items">Cijena</span>
        <span className="main-panel-headers-items">Opis</span>
      </div>
      {storageList.map((item) => (
        <div className="main-panel-items">
          <span className="main-panel-subitems">{item.ime}</span>
          <span className="main-panel-subitems">
            {item.kolicina > 0 && (
              <div style={{ color: "green" }}> DOSTUPNO </div>
            )}
            {item.kolicina < 1 && (
              <div style={{ color: "red" }}> NEDOSTUPNO </div>
            )}
          </span>
          <span className="main-panel-subitems">{item.cijena}</span>
          <span className="main-panel-subitems">{item.opis}</span>
          <button
            className="main-panel-button"
            id={item.ime}
            onClick={removeFromStorage}
          >
            <ImCross size={20} />
          </button>
        </div>
      ))}
    </form>
  );
};

export default ComponentConfig;
