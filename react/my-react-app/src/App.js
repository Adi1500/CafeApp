import './css/App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Nar from './pages/narudzbe.jsx';
import Skl from './pages/skladiste.jsx';
import Gosti from './pages/gosti';
import Backdoor from './pages/backdoor'
import Login from './pages/components/login';
import { FaBox } from 'react-icons/fa';
import { FaGlassMartiniAlt } from 'react-icons/fa';
import React, { useState } from 'react';

function App() {

    

    if(window.location.pathname === "/" || window.location.pathname === "/about"){
        const token = localStorage.getItem('token');
        //const token = local;
        if(!token){
            return (
                <Login />
            )
        }
        const item = JSON.parse(token)
        const now = new Date();
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem('token')
            return (
                <Login />
            )
        }
        return (
            <div className="App" id='almir'>
                <Navigation />
                <Main />
            </div>
        );
    }
    else return (
        <div className='myreact-reset' id='almir'>
            <Main />
        </div>
    )
}

const Navigation = () => (
    <div className="NavigationClass">
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        Narudžbe <FaGlassMartiniAlt size={17} />
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about">
                        Skladište <FaBox size={17} />
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
);

const Main = () => (
    <Routes>
        <Route exact path="/" element={<Nar />}></Route>
        <Route exact path="/about" element={<Skl />}></Route>
        <Route exact path="/gosti" element={<Gosti />}></Route>
        <Route exact path="/backdoor" element={<Backdoor />}></Route>
    </Routes>
);

export default App;
