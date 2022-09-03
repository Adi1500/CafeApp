import './css/App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Nar from './pages/narudzbe'
import Skl from './pages/skladiste'
import { FaBox } from 'react-icons/fa';
import { FaGlassMartiniAlt } from 'react-icons/fa';
import React from 'react';

function App() {
  return (
    <div className="App">
        <Navigation />
        <Main />
    </div>
  );
}

const Navigation = () => (
  <div className='NavigationClass'>
    <nav>
      <ul>
        <li><NavLink to='/'>Narudžbe <FaGlassMartiniAlt size={17}/></NavLink></li>
        <li><NavLink to='/about'>Skladište <FaBox size={17}/></NavLink></li>
      </ul>
    </nav>
  </div>
);

const Main = () => (
  <Routes>
    <Route exact path='/' element={<Nar/>}></Route>
    <Route exact path='/about' element={<Skl/>}></Route>
  </Routes>
);

export default App;
