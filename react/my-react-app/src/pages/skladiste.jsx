import '../css/stranica.css';
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import Prozorcic from './components/prozorcic.jsx';
//import { useState } from 'react';

function Skl() {
    function openForm() {
        document.getElementById('myForm').style.display = 'block';
    }

    const [components, setComponents] = useState(['Sample Component']);

    function addComponent() {
        setComponents([...components, 'Sample Component']);
    }

    return (
        <div className="home">
            <div className="flex-container"></div>

            <button onClick={openForm} text="DODAJ" />
            {components.map((item, i) => (
                <Prozorcic />
            ))}
        </div>
    );
}

export default Skl;
