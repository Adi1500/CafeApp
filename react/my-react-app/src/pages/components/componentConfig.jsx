import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../css/skladiste.css';

const ComponentConfig = ( { title } ) => {
  const [storageList, setStorageList] = useState([])
  function callAxiosStorage() {
    axios.get('http://'+window.location.hostname+':3001/storage', {
        params: {
          title: title
        }
    }).then((data) => {
          //console.log(title)
          setStorageList(data.data);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      callAxiosStorage()
      setInterval(() => {
        callAxiosStorage()
      }, 10000);
    }, 0);
  }, []);

  function removeFromStorage(event) {
    var answer = window.confirm("Da li želite ukloniti ovu narudžbu?");
    if (answer) {
      axios.post('http://'+window.location.hostname+':3001/removeStorage', { id: event.target.id })
    }
  }

        return (
          <form className='main-panel-form'>
            <div className='main-panel-headers'>
              <span className='main-panel-headers-items'>Ime Proizvoda</span>
              <span className='main-panel-headers-items'>Količina</span>
              <span className='main-panel-headers-items'>Cijena</span>
              <span className='main-panel-headers-items'>Opis</span>
            </div>            
            {storageList.map(item => (
              <div className='main-panel-items'>
                <span className='main-panel-subitems'>{item.ime_proizvoda}</span>
                <span className='main-panel-subitems'>{item.kolicina_skladiste}</span>
                <span className='main-panel-subitems'>{item.cijena_skladiste}</span>
                <span className='main-panel-subitems'>{item.opis_skladiste}</span>
                <button className='main-panel-button' id={item.ime_proizvoda} onClick={removeFromStorage}>Ukloni</button>
              </div>
            ))}
          </form>
        )
}

export default ComponentConfig;