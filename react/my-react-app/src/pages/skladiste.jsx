import '../css/skladiste.css';
import '../css/stranica.css';
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import Prozorcic from './components/prozorcic.jsx';
//import { useState } from 'react';

function Skl() {
    function openForm() {
        document.getElementById('myForm').style.display = 'block';
        document.getElementById('page-mask').style.display = 'block';
    }

    return (
        <div className="home" id='a'>
            <button className="plus-button" onClick={openForm}></button>     
            <div id="page-mask"></div>
            <Prozorcic />

        </div>
    );
}

export default Skl;
