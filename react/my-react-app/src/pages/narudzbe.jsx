import axios from 'axios';
import '../css/stranica.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive'
import notification from '../not.wav'

function RenderingArrayOfObjects() {
    const [orderList, setOrderList] = useState([]);
    const listOfLists = [];
    const counter = [];
    var indents = [];
    var buttonID = [];
    var ukupno = []
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    var d = window.localStorage.getItem('bN')
    var audio = new Audio(notification)

    function deleteCard(e) {
        //upit za potvrdu ako slucajno klikne da obrise
        var answer = window.confirm("Da li želite ukloniti ovu narudžbu?");
        if (answer) {
            axios.post('http://'+window.location.hostname+':3001/drop', { id: e.target.id });
            window.location.reload()
        }
    }

    function callAxiosNarudzbe() {
        axios.get('http://'+window.location.hostname+':3001/orders').then((data) => {
            setOrderList(data.data);
        });
    }

    useEffect(() => {
        setTimeout(() => {
            callAxiosNarudzbe()
            setInterval(() => {
                callAxiosNarudzbe()
            }, 10000);
        },0)
    }, []);

    for (let i = 0; i < orderList.length; i++) {
        if (counter.indexOf(orderList[i].broj_stola) > -1) continue;
        else counter.push(orderList[i].broj_stola);
    }

    if(counter.length > JSON.parse(d)){
        console.log(counter.length, JSON.parse(d))
        audio.play()
    }

    window.localStorage.setItem('bN', JSON.stringify(counter.length))
    console.log(counter.length, JSON.parse(d))

    for (let i = 0; i < counter.length; i++) {
        listOfLists[i] = [counter[i]];
        ukupno[i] = 0
    }

    for(let i = 0; i < counter.length; i++){
        orderList.forEach((item) => {
            if(item.broj_stola === counter[i])
                ukupno[i] = parseFloat(ukupno[i]) + parseFloat(item.cijena * item.kolicina) 
        })
    }

    const orderArrays = () => {
        orderList.forEach(function (curValue) {
            let niz = listOfLists.find((val) => val[0] === curValue.broj_stola);

            var price = parseFloat(curValue.cijena.replace('$', ''));
            var total = price * curValue.kolicina;
            // let ind = listOfLists.findIndex((n) => n === niz);

            niz.push(
                <div>
                    {curValue.kolicina}X {curValue.ime_narudzbe}&nbsp;&nbsp;
                    <span className="price-align">{total.toFixed(2)} KM</span>
                </div>
            );

            //console.log(niz);
        });
        return;
    };
    orderArrays();

    for(let i = 0; i < listOfLists.length; i++){
        buttonID[i] = listOfLists[i][0]
        listOfLists[i][0] = <h1 style={{textAlign: "center"}}>Broj Stola: {listOfLists[i][0]}</h1>
    }

    for (var i = 0; i < listOfLists.length; i++) {
        indents.push(
            <div key={i}>
                <button onClick={deleteCard} className='btn-close' >
                    <IoIosClose size={45} id={buttonID[i]}/>
                </button>
                <div>{listOfLists[i]}</div>
                <br></br>
                <div className='ukupna-cijena'>UKUPNO: {ukupno[i].toFixed(2)}</div>
            </div>);
    }
    
    if(isDesktopOrLaptop)
        return <div className="flex-container">{indents}</div>;
    else
        return <div className="flex-container" style={{gridTemplateColumns: "repeat(1, 1fr)"}}>{indents}</div>;
}

const Nar = () => {
    return <RenderingArrayOfObjects />;
};

export default Nar;
