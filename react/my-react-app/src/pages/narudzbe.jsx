import axios from "axios";
import "../css/stranica.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import notification from "../not.wav";
import "../css/sidebar.css";

function RenderingArrayOfObjects() {
  const [orderList, setOrderList] = useState([]);
  const [orderLength, setOrderLength] = useState();
  const listOfLists = [];
  const counter = [];
  var indents = [];
  var buttonID = [];
  var ukupno = [];
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const local = JSON.parse(localStorage.getItem("token"));
  const token = local.token;

  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };
  const sidebarClass = sidebarOpen ? "sidebar open" : "sidebar";

  const [sidebarOpenTablet, setSideBarOpenTablet] = useState(false);
  const handleViewSidebarTablet = () => {
    setSideBarOpenTablet(!sidebarOpenTablet);
  };
  const sidebarClassTablet = sidebarOpenTablet
    ? "sidebar open tablet"
    : "sidebar tablet";
  var d;
  var audio = new Audio(notification);

  function deleteCard(e) {
    //upit za potvrdu ako slucajno klikne da obrise
    //var answer = window.confirm("Da li želite ukloniti ovu narudžbu?");
    //if (answer) {
      //axios.post("https://novidrug.vercel.app/drop", {
      axios.post("http://localhost:3001/drop", { id: e.target.id}, {headers: {"x-access-token":token} });
      //axios.post('http://'+window.location.hostname+':3001/drop', { id: e.target.id });
      //window.location.reload();
    //}
  }

    function callAxiosNarudzbe() {
        //axios.get('https://novidrug.vercel.app/orders'
        axios.get('http://'+window.location.hostname+':3001/orders', {headers: {"x-access-token":token}}).then((data) => {
            setOrderList(data.data);
        });
    }

  useEffect(() => {
    /*setTimeout(() => {
      callAxiosNarudzbe();
      setInterval(() => {
        callAxiosNarudzbe();
      }, 10000);
    }, 0);*/
    callAxiosNarudzbe()
  }, [callAxiosNarudzbe()]);

  for (let i = 0; i < orderList.length; i++) {
    if (counter.indexOf(orderList[i].broj_stola) > -1) continue;
    else counter.push(orderList[i].broj_stola);
  }

  useEffect(() => {
    setTimeout(() => {
      d = window.localStorage.getItem("bN");
      if (d !== null) setOrderLength(JSON.parse(d));
      else setOrderLength("0");
      setInterval(() => {
        d = window.localStorage.getItem("bN");
        if (d !== null) setOrderLength(JSON.parse(d));
        else setOrderLength("0");
      }, 10000);
    }, 1000);
  }, []);

  if (counter.length > orderLength) {
    console.log(counter.length, orderLength);
    //audio.play();
  }

  window.localStorage.setItem("bN", JSON.stringify(counter.length));
  console.log(counter.length, orderLength);

  for (let i = 0; i < counter.length; i++) {
    document.getElementById("sdb" + counter[i]).style.backgroundColor = "red";
    listOfLists[i] = [counter[i]];
    ukupno[i] = 0;
  }

  for (let i = 0; i < counter.length; i++) {
    orderList.forEach((item) => {
      if (item.broj_stola === counter[i])
        ukupno[i] =
          parseFloat(ukupno[i]) + parseFloat(item.cijena * item.kolicina);
    });
  }

  const orderArrays = () => {
    orderList.forEach(function (curValue) {
      let niz = listOfLists.find((val) => val[0] === curValue.broj_stola);

      var price = parseFloat(curValue.cijena);
      var total = price * curValue.kolicina;
      // let ind = listOfLists.findIndex((n) => n === niz);

      niz.push(
        <div>
          {curValue.kolicina}X {curValue.ime}&nbsp;&nbsp;
          <span className="price-align">{total.toFixed(2)} KM</span>
        </div>
      );

      //console.log(niz);
    });
    return;
  };
  orderArrays();

  for (let i = 0; i < listOfLists.length; i++) {
    buttonID[i] = listOfLists[i][0];
    listOfLists[i][0] = (
      <h1 style={{ textAlign: "center" }}>Broj Stola: {listOfLists[i][0]}</h1>
    );
  }

  for (var i = 0; i < listOfLists.length; i++) {
    indents.push(
      <div key={i}>
        <button onClick={deleteCard} className="btn-close">
          <IoIosClose size={45} id={buttonID[i]} />
        </button>
        <div>{listOfLists[i]}</div>
        <br></br>
        <div className="ukupna-cijena">UKUPNO: {ukupno[i].toFixed(2)}</div>
      </div>
    );
  }

  if (isDesktopOrLaptop)
    return (
      <div>
        <div className="flex-container">{indents}</div>;
        <div className={sidebarClass}>
          <div className="square" style={{ top: "3%", left: "7%" }} id={"sdb1"}>
            1
          </div>
          <div className="square" style={{ top: "6%", left: "7%" }} id={"sdb2"}>
            2
          </div>
          <div className="square" style={{ top: "9%", left: "7%" }} id={"sdb3"}>
            3
          </div>
          <div
            className="square"
            style={{ top: "12%", left: "7%" }}
            id={"sdb4"}
          >
            4
          </div>
          <div
            className="square"
            style={{ top: "15%", left: "7%" }}
            id={"sdb5"}
          >
            5
          </div>
          <div
            className="square"
            style={{ top: "18%", left: "7%" }}
            id={"sdb6"}
          >
            6
          </div>
          <div
            className="square"
            style={{ top: "21%", left: "7%" }}
            id={"sdb7"}
          >
            7
          </div>
          <div
            className="square"
            style={{ top: "24%", left: "7%" }}
            id={"sdb8"}
          >
            8
          </div>
          <div
            className="square"
            style={{ top: "-61%", left: "22%" }}
            id={"sdb9"}
          >
            9
          </div>
          <div
            className="square"
            style={{ top: "-58%", left: "22%" }}
            id={"sdb10"}
          >
            10
          </div>
          <div
            className="square"
            style={{ top: "-55%", left: "22%" }}
            id={"sdb11"}
          >
            11
          </div>
          <div
            className="square"
            style={{ top: "-52%", left: "22%" }}
            id={"sdb12"}
          >
            12
          </div>
          <div
            className="square"
            style={{ top: "-49%", left: "22%" }}
            id={"sdb13"}
          >
            13
          </div>
          <div
            className="square"
            style={{ top: "-46%", left: "22%" }}
            id={"sdb14"}
          >
            14
          </div>
          <div
            className="square"
            style={{ top: "-43%", left: "22%" }}
            id={"sdb15"}
          >
            15
          </div>
          <div
            className="square"
            style={{ top: "-40%", left: "22%" }}
            id={"sdb16"}
          >
            16
          </div>
          <div
            className="square"
            style={{ top: "-125%", left: "37%" }}
            id={"sdb17"}
          >
            17
          </div>
          <div
            className="square"
            style={{ top: "-122%", left: "37%" }}
            id={"sdb18"}
          >
            18
          </div>
          <div
            className="square"
            style={{ top: "-119%", left: "37%" }}
            id={"sdb19"}
          >
            19
          </div>
          <div
            className="square"
            style={{ top: "-116%", left: "37%" }}
            id={"sdb20"}
          >
            20
          </div>
          <div
            className="square"
            style={{ top: "-113%", left: "37%" }}
            id={"sdb21"}
          >
            21
          </div>
          <div
            className="square"
            style={{ top: "-110%", left: "37%" }}
            id={"sdb22"}
          >
            22
          </div>
          <div
            className="square"
            style={{ top: "-107%", left: "37%" }}
            id={"sdb23"}
          >
            23
          </div>
          <div
            className="square"
            style={{ top: "-104%", left: "37%" }}
            id={"sdb24"}
          >
            24
          </div>
          <div
            className="square"
            style={{ top: "-189%", left: "52%" }}
            id={"sdb25"}
          >
            25
          </div>
          <div
            className="square"
            style={{ top: "-186%", left: "52%" }}
            id={"sdb26"}
          >
            26
          </div>
          <div
            className="square"
            style={{ top: "-183%", left: "52%" }}
            id={"sdb27"}
          >
            27
          </div>
          <div
            className="square"
            style={{ top: "-180%", left: "52%" }}
            id={"sdb28"}
          >
            28
          </div>
          <div
            className="square"
            style={{ top: "-177%", left: "52%" }}
            id={"sdb29"}
          >
            29
          </div>
          <div
            className="square"
            style={{ top: "-174%", left: "52%" }}
            id={"sdb30"}
          >
            30
          </div>
          <div
            className="square"
            style={{ top: "-171%", left: "52%" }}
            id={"sdb31"}
          >
            31
          </div>
          <div
            className="square"
            style={{ top: "-168%", left: "52%" }}
            id={"sdb32"}
          >
            32
          </div>
          <div
            className="square"
            style={{ top: "-253%", left: "67%" }}
            id={"sdb33"}
          >
            33
          </div>
          <div
            className="square"
            style={{ top: "-250%", left: "67%" }}
            id={"sdb34"}
          >
            34
          </div>
          <div
            className="square"
            style={{ top: "-247%", left: "67%" }}
            id={"sdb35"}
          >
            35
          </div>
          <div
            className="square"
            style={{ top: "-244%", left: "67%" }}
            id={"sdb36"}
          >
            36
          </div>
          <div
            className="square"
            style={{ top: "-241%", left: "67%" }}
            id={"sdb37"}
          >
            37
          </div>
          <div
            className="square"
            style={{ top: "-238%", left: "67%" }}
            id={"sdb38"}
          >
            38
          </div>
          <div
            className="square"
            style={{ top: "-235%", left: "67%" }}
            id={"sdb39"}
          >
            39
          </div>
          <div
            className="square"
            style={{ top: "-232%", left: "67%" }}
            id={"sdb40"}
          >
            40
          </div>
          <div
            className="square"
            style={{ top: "-317%", left: "82%" }}
            id={"sdb41"}
          >
            41
          </div>
          <div
            className="square"
            style={{ top: "-314%", left: "82%" }}
            id={"sdb42"}
          >
            42
          </div>
          <div
            className="square"
            style={{ top: "-311%", left: "82%" }}
            id={"sdb43"}
          >
            43
          </div>
          <div
            className="square"
            style={{ top: "-308%", left: "82%" }}
            id={"sdb44"}
          >
            44
          </div>
          <div
            className="square"
            style={{ top: "-305%", left: "82%" }}
            id={"sdb45"}
          >
            45
          </div>
          <div
            className="square"
            style={{ top: "-302%", left: "82%" }}
            id={"sdb46"}
          >
            46
          </div>
          <div
            className="square"
            style={{ top: "-299%", left: "82%" }}
            id={"sdb47"}
          >
            47
          </div>
          <div
            className="square"
            style={{ top: "-296%", left: "82%" }}
            id={"sdb48"}
          >
            48
          </div>
          <button onClick={handleViewSidebar} className="sidebar-toggle">
            <AiOutlineDoubleRight size={25} />
          </button>
        </div>
      </div>
    );
  else
    return (
      <div>
        <div
          className="flex-container"
          style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
        >
          {indents}
        </div>
        ;
        <div className={sidebarClassTablet} style={{ width: "90%" }}>
          <div
            className="square-tablet"
            style={{ top: "3%", left: "7%" }}
            id={"sdb1"}
          >
            1
          </div>
          <div
            className="square-tablet"
            style={{ top: "6%", left: "7%" }}
            id={"sdb2"}
          >
            2
          </div>
          <div
            className="square-tablet"
            style={{ top: "9%", left: "7%" }}
            id={"sdb3"}
          >
            3
          </div>
          <div
            className="square-tablet"
            style={{ top: "12%", left: "7%" }}
            id={"sdb4"}
          >
            4
          </div>
          <div
            className="square-tablet"
            style={{ top: "15%", left: "7%" }}
            id={"sdb5"}
          >
            5
          </div>
          <div
            className="square-tablet"
            style={{ top: "18%", left: "7%" }}
            id={"sdb6"}
          >
            6
          </div>
          <div
            className="square-tablet"
            style={{ top: "21%", left: "7%" }}
            id={"sdb7"}
          >
            7
          </div>
          <div
            className="square-tablet"
            style={{ top: "24%", left: "7%" }}
            id={"sdb8"}
          >
            8
          </div>
          <div
            className="square-tablet"
            style={{ top: "-53%", left: "22%" }}
            id={"sdb9"}
          >
            9
          </div>
          <div
            className="square-tablet"
            style={{ top: "-50%", left: "22%" }}
            id={"sdb10"}
          >
            10
          </div>
          <div
            className="square-tablet"
            style={{ top: "-47%", left: "22%" }}
            id={"sdb11"}
          >
            11
          </div>
          <div
            className="square-tablet"
            style={{ top: "-44%", left: "22%" }}
            id={"sdb12"}
          >
            12
          </div>
          <div
            className="square-tablet"
            style={{ top: "-41%", left: "22%" }}
            id={"sdb13"}
          >
            13
          </div>
          <div
            className="square-tablet"
            style={{ top: "-38%", left: "22%" }}
            id={"sdb14"}
          >
            14
          </div>
          <div
            className="square-tablet"
            style={{ top: "-35%", left: "22%" }}
            id={"sdb15"}
          >
            15
          </div>
          <div
            className="square-tablet"
            style={{ top: "-32%", left: "22%" }}
            id={"sdb16"}
          >
            16
          </div>
          <div
            className="square-tablet"
            style={{ top: "-109%", left: "37%" }}
            id={"sdb17"}
          >
            17
          </div>
          <div
            className="square-tablet"
            style={{ top: "-106%", left: "37%" }}
            id={"sdb18"}
          >
            18
          </div>
          <div
            className="square-tablet"
            style={{ top: "-103%", left: "37%" }}
            id={"sdb19"}
          >
            19
          </div>
          <div
            className="square-tablet"
            style={{ top: "-100%", left: "37%" }}
            id={"sdb20"}
          >
            20
          </div>
          <div
            className="square-tablet"
            style={{ top: "-97%", left: "37%" }}
            id={"sdb21"}
          >
            21
          </div>
          <div
            className="square-tablet"
            style={{ top: "-94%", left: "37%" }}
            id={"sdb22"}
          >
            22
          </div>
          <div
            className="square-tablet"
            style={{ top: "-91%", left: "37%" }}
            id={"sdb23"}
          >
            23
          </div>
          <div
            className="square-tablet"
            style={{ top: "-88%", left: "37%" }}
            id={"sdb24"}
          >
            24
          </div>
          <div
            className="square-tablet"
            style={{ top: "-165%", left: "52%" }}
            id={"sdb25"}
          >
            25
          </div>
          <div
            className="square-tablet"
            style={{ top: "-162%", left: "52%" }}
            id={"sdb26"}
          >
            26
          </div>
          <div
            className="square-tablet"
            style={{ top: "-159%", left: "52%" }}
            id={"sdb27"}
          >
            27
          </div>
          <div
            className="square-tablet"
            style={{ top: "-156%", left: "52%" }}
            id={"sdb28"}
          >
            28
          </div>
          <div
            className="square-tablet"
            style={{ top: "-153%", left: "52%" }}
            id={"sdb29"}
          >
            29
          </div>
          <div
            className="square-tablet"
            style={{ top: "-150%", left: "52%" }}
            id={"sdb30"}
          >
            30
          </div>
          <div
            className="square-tablet"
            style={{ top: "-147%", left: "52%" }}
            id={"sdb31"}
          >
            31
          </div>
          <div
            className="square-tablet"
            style={{ top: "-144%", left: "52%" }}
            id={"sdb32"}
          >
            32
          </div>
          <div
            className="square-tablet"
            style={{ top: "-221%", left: "67%" }}
            id={"sdb33"}
          >
            33
          </div>
          <div
            className="square-tablet"
            style={{ top: "-218%", left: "67%" }}
            id={"sdb34"}
          >
            34
          </div>
          <div
            className="square-tablet"
            style={{ top: "-215%", left: "67%" }}
            id={"sdb35"}
          >
            35
          </div>
          <div
            className="square-tablet"
            style={{ top: "-212%", left: "67%" }}
            id={"sdb36"}
          >
            36
          </div>
          <div
            className="square-tablet"
            style={{ top: "-209%", left: "67%" }}
            id={"sdb37"}
          >
            37
          </div>
          <div
            className="square-tablet"
            style={{ top: "-206%", left: "67%" }}
            id={"sdb38"}
          >
            38
          </div>
          <div
            className="square-tablet"
            style={{ top: "-203%", left: "67%" }}
            id={"sdb39"}
          >
            39
          </div>
          <div
            className="square-tablet"
            style={{ top: "-200%", left: "67%" }}
            id={"sdb40"}
          >
            40
          </div>
          <div
            className="square-tablet"
            style={{ top: "-277%", left: "82%" }}
            id={"sdb41"}
          >
            41
          </div>
          <div
            className="square-tablet"
            style={{ top: "-274%", left: "82%" }}
            id={"sdb42"}
          >
            42
          </div>
          <div
            className="square-tablet"
            style={{ top: "-271%", left: "82%" }}
            id={"sdb43"}
          >
            43
          </div>
          <div
            className="square-tablet"
            style={{ top: "-268%", left: "82%" }}
            id={"sdb44"}
          >
            44
          </div>
          <div
            className="square-tablet"
            style={{ top: "-265%", left: "82%" }}
            id={"sdb45"}
          >
            45
          </div>
          <div
            className="square-tablet"
            style={{ top: "-262%", left: "82%" }}
            id={"sdb46"}
          >
            46
          </div>
          <div
            className="square-tablet"
            style={{ top: "-259%", left: "82%" }}
            id={"sdb47"}
          >
            47
          </div>
          <div
            className="square-tablet"
            style={{ top: "-256%", left: "82%" }}
            id={"sdb48"}
          >
            48
          </div>
          <button
            onClick={handleViewSidebarTablet}
            className="sidebar-toggle"
            style={{ width: "6%", right: "-25%", height: "80px" }}
          >
            <AiOutlineDoubleRight size={15} />
          </button>
        </div>
      </div>
    );
}

const Nar = () => {
  return (
    <div>
      <RenderingArrayOfObjects />
    </div>
  );
};

export default Nar;
