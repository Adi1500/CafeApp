import '../css/skladiste.css';
import React, { useState } from 'react';
import Prozorcic from './components/prozorcic.jsx';
import ComponentConfig from './components/componentConfig';
import EditComponent from './components/editComponents';
import { FiCoffee } from 'react-icons/fi';
import { MdOutlineLocalDrink } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';
import { FaHamburger } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

function Skl() {
    function openForm() {
        document.getElementById('myForm').style.display = 'block';
        document.getElementById('page-mask').style.display = 'block';
    }

    var [state, setState] = useState("tn");
    var [editing, setEditing] = useState(false)
    console.log(editing)
    
    return (
        <div className="home" id='a'>
            <div className='flexbox-container'>
                <div id="page-mask"></div>
                <Prozorcic />
                <div className='side-panel' >
                    <span onClick={() => setState("tn")} className='side-panel-items' id='tn' tabIndex='0'><FiCoffee/> Topli napici</span>
                    <span onClick={() => setState("sok")} className='side-panel-items' id='sok' tabIndex='0'><MdOutlineLocalDrink/> Sokovi</span>
                    <span onClick={() => setState("alc")} className='side-panel-items' id='alc' tabIndex='0'><BiDrink/> Alkohol</span>
                    <span onClick={() => setState("hra")} className='side-panel-items' id='hra' tabIndex='0'><FaHamburger/> Hrana</span>
                    <span onClick={() => setState("pp")} className='side-panel-items' id='pp' tabIndex='0'><AiFillStar/> Posebne pounde</span>
                    <button className="plus-button" onClick={openForm}></button>
                    <button onClick={() => setEditing(!editing)}>EDIT</button>
                </div>
                <div className='main-panel'>
                    {!editing && state === 'tn' && <ComponentConfig title={'topli'}/>}
                    {!editing && state === 'sok' && <ComponentConfig title={'sokovi'}/>}
                    {!editing && state === 'alc' && <ComponentConfig title={'alkohol'}/>}
                    {!editing && state === 'hra' && <ComponentConfig title={'hrana'}/>}
                    {!editing && state === 'pp' && <ComponentConfig title={'pounde'}/>}

                    {editing && state === 'tn' && <EditComponent title={'topli'}/>}
                    {editing && state === 'sok' && <EditComponent title={'sokovi'}/>}
                    {editing && state === 'alc' && <EditComponent title={'alkohol'}/>}
                    {editing && state === 'hra' && <EditComponent title={'hrana'}/>}
                    {editing && state === 'pp' && <EditComponent title={'pounde'}/>}
                </div>
            </div>
        </div>
        
    );
   
}

export default Skl;
