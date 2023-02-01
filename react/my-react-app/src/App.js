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

    const token = localStorage.getItem('token');

    if(window.location.pathname === "/" || window.location.pathname === "/about"){
        if(!token){
            return (
                <Login /*setToken={setToken}*/ />
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
