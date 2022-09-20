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
import { GrEdit } from 'react-icons/gr'
import { useEffect } from 'react';

function Skl() {
    

    function openForm() {
        document.getElementById('myForm').style.display = 'block';
        document.getElementById('page-mask').style.display = 'block';
    }

    var [state, setState] = useState("tn");
    var [editing, setEditing] = useState(false)
    var IdList = ["tn", "sok", "alc", "hra", "pp"]
    console.log(editing)
    
    useEffect(() => {
        var data = window.localStorage.getItem('state')
        if(data !== null ){
            setState(JSON.parse(data)) 
            document.getElementById(JSON.parse(data)).className = "side-panel-items-alter"
        }
        else 
            document.getElementById("tn").className = "side-panel-items-alter"
    },[])
    
    function changeActive(e) {
        window.localStorage.setItem('state', JSON.stringify(e.target.id))
        setState(e.target.id)
        for(let i = 0; i < IdList.length; i++){
            if(IdList[i] === e.target.id) 
                document.getElementById(IdList[i]).className = "side-panel-items-alter"
            else
                document.getElementById(IdList[i]).className = "side-panel-items"
        }
        console.log(e.target.id)
    }

    function isEditing(e) {
        setEditing(!editing)
        if(editing)
            document.getElementById("edbtn").className = "edit-button"
        else   
            document.getElementById("edbtn").className = "edit-button-alter"
    }

    return (
        <div className="home" id='a'>
            <div className='flexbox-container'>
                <div id="page-mask"></div>
                <Prozorcic />
                <div className='side-panel' >
                    <span onClick={changeActive} className='side-panel-items-alter' id='tn' tabIndex='0'><FiCoffee/> Topli napici</span>
                    <span onClick={changeActive} className='side-panel-items' id='sok' tabIndex='0'><MdOutlineLocalDrink/> Sokovi</span>
                    <span onClick={changeActive} className='side-panel-items' id='alc' tabIndex='0'><BiDrink/> Alkohol</span>
                    <span onClick={changeActive} className='side-panel-items' id='hra' tabIndex='0'><FaHamburger/> Hrana</span>
                    <span onClick={changeActive} className='side-panel-items' id='pp' tabIndex='0'><AiFillStar/> Posebne pounde</span>
                    <button className="edit-button" onClick={isEditing} id="edbtn"><GrEdit/></button>
                    <button className="plus-button" onClick={openForm}></button>
                </div>
                <div className='main-panel'>
                    {!editing && state === "tn" && <ComponentConfig title={'topli'}/>}
                    {!editing && state === "sok" && <ComponentConfig title={'sokovi'}/>}
                    {!editing && state === "alc" && <ComponentConfig title={'alkohol'}/>}
                    {!editing && state === "hra" && <ComponentConfig title={'hrana'}/>}
                    {!editing && state === "pp" && <ComponentConfig title={'pounde'}/>}

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
