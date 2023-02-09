import React, { useState } from "react";
import axios from "axios";
import { GrRevert } from "react-icons/gr";
import { TiTickOutline } from "react-icons/ti";

function EditComponent({ title }) {
  const [editStorageList, setEditStorageList] = useState([]);
  const local = JSON.parse(localStorage.getItem("token"));
  const token = local.token;
  function callAxiosStorage() {
    //axios.get("https://novidrug.vercel.app/storage", {
        axios.get('http://'+window.location.hostname+':3001/storage', {
        params: {
          title: title,
        },
        headers: {
          "x-access-token": token,
        },
      })
      .then((data) => {
        console.log(data.data);
        setEditStorageList(data.data);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, quantity, description } = e.target.elements;
    //uzima vrijednosti input fieldova
    let details = {
      name: name.value,
      price: price.value,
      quantity: quantity.value,
      description: description.value,
    };
    //vrati polja u formi da budu prazna
    console.log(name, price, quantity, description);
    name.value = "";
    price.value = "";
    quantity.value = "";
    description.value = "";
    alert("gotovo");
    //posalje zahtjev node-u sa ovim podacima
    
    //let response = await fetch("https://novidrug.vercel.app/changeData", {
      let response = await fetch('http://'+window.location.hostname+':3001/changeData', {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "x-access-token": token,
      },
      body: JSON.stringify(details),
    });
  };

  callAxiosStorage();

  return (
    <div className="main-panel-form">
      <div className="main-panel-headers">
        <span className="main-panel-headers-items">Ime Proizvoda</span>
        <span className="main-panel-headers-items">Količina</span>
        <span className="main-panel-headers-items">Cijena</span>
        <span className="main-panel-headers-items">Opis</span>
      </div>
      {editStorageList.map((item) => (
        <form className="main-panel-items" onSubmit={handleSubmit}>
          <label className="main-panel-subitems" style={{ marginTop: "7%" }}>
            {item.ime}
          </label>
          <input type="hidden" id="name" value={item.id} />
          <input
            type="text"
            placeholder={item.kolicina}
            id="quantity"
            className="main-panel-subitems"
            style={{marginTop: "1%", marginBottom: "20%"}}
          />
          <input
            type="text"
            placeholder={item.cijena}
            id="price"
            className="main-panel-subitems"
            style={{marginTop: "1%", marginBottom: "20%"}}
          />
          <textarea
            placeholder={item.opis}
            rows="3"
            id="description"
            className="main-panel-subitems"
            style={{marginTop: "1%", marginBottom: "20%"}}
          />
          <div>
            <button
              className="main-panel-button"
              style={{ backgroundColor: "#04aa6d" }}
              id={item.id}
              type="submit"
            >
              <TiTickOutline size={27} />
            </button>
            <button className="main-panel-button" type="reset">
              <GrRevert size={20} />
            </button>
          </div>
        </form>
      ))}
    </div>
  );
}

export default EditComponent;
