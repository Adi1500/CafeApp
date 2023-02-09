import { React, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../css/gosti.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import axios from "axios";
import "../css/accordion.css";
import "../css/gosti2.css";
import GuestItems from "./components/guestItems";
import Kafa from "../img/kafa.jpg";
import Hrana from "../img/hrana.jpg";
import Alkohol from "../img/alkohol.jpg";
import Sok from "../img/sok.jpg";
import Special from "../img/special.jpg";
/*import Palacinci from "../img/palacinci.jpg"
import Salata from "../img/salata.jpg"
import Meso from "../img/meso.jpg"
import Dodaci from "../img/dodaci.jpg"
import Sendvic from "../img/sendvic.jpg"*/

const Gosti = () => {
  const [menuList, setMenuList] = useState([]);

  const [cart, setCart] = useState([]);

  var zaliha = true;

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
    cart.push(item);
    handlePrice(cart);
  };

  const handleChange = (item, d) => {
    console.log(d.target.value);
    const ind = cart.indexOf(item);
    const arr = cart;

    arr[ind].amount = parseInt(d.target.value);

    console.log(arr[ind].amount);

    if (arr[ind].amount === 0 || arr[ind].amount < 0) {
      arr[ind].amount = 1;
      document.getElementById("qnt").value = 1;
    }
    console.log(arr[ind].amount);
    setCart([...arr]);
  };

  //cart
  var pr;
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((item) => item.id !== id);
    setCart(arr);
    console.log(cart);
    handlePrice(arr);
    console.log(arr);
  };

  var brs = new URLSearchParams(window.location.search).get("brs");
  console.log(brs);

  const handlePrice = (cartArray) => {
    let ans = 0;
    cartArray.map((item) => (ans += item.amount * item.cijena));
    setPrice(ans.toFixed(2));
    pr = ans.toFixed(2);
    console.log(pr);
  };

  useEffect(() => {
    
    //axios.get('https://novidrug.vercel.app/cjenovnik').then((result) => {
    axios.get('http://'+window.location.hostname+':3001/cjenovnik').then((result) => {
      setMenuList(result.data);
    });
  }, []);

  const sendToNode = () => {
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
      if (parseFloat(cart[i].kolicina) - parseFloat(cart[i].amount) < 0) {
        window.alert("Žao nam je, ali nemamo toliko " + cart[i].ime + "");
        zaliha = false;
      }
    }
    if(zaliha){
      //axios.post('https://novidrug.vercel.app/gostiNar', { cart: cart, brs: brs })
      axios.post('http://'+window.location.hostname+':3001/gostiNar', { cart: cart, brs: brs })
      window.location.reload()
    }
  };

  return (
    <div>
      <Helmet>
        <style>
          {`
      *,
      *::before,
      *::after {
        all: revert;
      }
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-image: none;
        background-repeat : revert;
        }
    `}
        </style>
      </Helmet>

      <Accordion allowZeroExpanded="true">
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton
              style={{ backgroundImage: "url(" + Kafa + ")" }}
            >
              Topli napici
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {menuList.map((item) => {
              if (item.podskupina === "topli")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton
              style={{ backgroundImage: "url(" + Sok + ")" }}
            >
              Sokovi
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {menuList.map((item) => {
              if (item.podskupina === "sokovi")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton
              style={{ backgroundImage: "url(" + Alkohol + ")" }}
            >
              Alkohol
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {menuList.map((item) => {
              if (item.podskupina === "alkohol")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton
              style={{ backgroundImage: "url(" + Hrana + ")" }}
            >
              Hrana
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <h1>Sendviči</h1>
            {menuList.map((item) => {
              if (item.skupina === "sendvici")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
            <h1>Palačinci</h1>
            {menuList.map((item) => {
              if (item.skupina === "palacinci")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
            <h1>Meso</h1>
            {menuList.map((item) => {
              if (item.skupina === "meso")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
            <h1>Dodaci</h1>
            {menuList.map((item) => {
              if (item.skupina === "dodaci")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
          </AccordionItemPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton
              style={{ backgroundImage: "url(" + Special + ")" }}
            >
              Posebne ponude
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            {menuList.map((item) => {
              if (item.podskupina === "ponude")
                return <GuestItems item={item} handleClick={handleClick} />;
              else return false;
            })}
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
      <hr
        style={{
          backgroundColor: "red",
          height: "2px",
          border: "0.5px solid red",
        }}
      />
      <div className="kolica">
        <h1>NARUDŽBA</h1>
        <div className="container content-section">
          {cart.map((item) => (
            <div className="cart-row" key={item.id}>
              <div className="cart-item cart-column">
                <span className="cart-item-title">{item.ime}</span>
              </div>
              <span className="cart-price cart-column">{item.cijena}KM</span>
              <div className="cart-quantity cart-column">
                <input
                  className="cart-quantity-input"
                  id="qnt"
                  type="number"
                  defaultValue={item.amount}
                  onChange={(e) => {
                    handleChange(item, e);
                    handlePrice(cart);
                  }}
                />

                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                  style={{ marginLeft: "7%", marginBottom: "10%", marginTop: "10%" }}
                >
                  UKLONI
                </button>
              </div>
            </div>
          ))}

          <div className="total">
            <strong className="cart-total-title">UKUPNO: {price} KM</strong>
          </div>
        </div>
      </div>
      <button className="purchaseBtn" onClick={sendToNode}>
        KUPI
      </button>
    </div>
  );
};

export default Gosti;
