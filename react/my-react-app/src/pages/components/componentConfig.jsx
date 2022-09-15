import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ComponentConfig = ( { title } ) => {
  const [storageList, setStorageList] = useState([])

  function axiosCall() {
    axios.get('http://localhost:3001/storage', {
          params: {
            title: title
          }
        }).then((data) => {
            console.log(title)
            setStorageList(data.data);
          });
  }

  useEffect(() => {
    setTimeout(() => {
      axiosCall()
      setInterval(() => {
        axiosCall()
      }, 10000);
    }, 0);
  }, []);


    
        return (
          <div>
            {storageList.map(item => (
              <div>
                <p>{item.ime_proizvoda}</p>
                <p>{item.kolicina_skladiste}</p>
                <p>{item.cijena_skladiste}</p>
                <p>{item.opis_skladiste}</p>
                <p>{item.skupina}</p>
              </div>
            ))}
          </div>
        )
}

export default ComponentConfig;