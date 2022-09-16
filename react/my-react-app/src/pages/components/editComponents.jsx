import React, {useState} from "react";
import axios from "axios";

function EditComponent({ title }) {

    const [editStorageList, setEditStorageList] = useState([])

    function callAxiosStorage() {
        axios.get('http://localhost:3001/storage', {
            params: {
              title: title
            }
        }).then((data) => {
              //console.log(title)
              setEditStorageList(data.data);
          });
      }

    callAxiosStorage()
      
    return(
        <form className='main-panel-form'>
            <div className='main-panel-headers'>
            <span className='main-panel-headers-items'>Ime Proizvod     a</span>
            <span className='main-panel-headers-items'>Količina</span>
            <span className='main-panel-headers-items'>Cijena</span>
            <span className='main-panel-headers-items'>Opis</span>
            </div>            
            {editStorageList.map(item => (
            <div className='main-panel-items'>
                <span className='main-panel-subitems'>{item.ime_proizvoda} AA</span>
                <span className='main-panel-subitems'>{item.kolicina_skladiste}</span>
                <span className='main-panel-subitems'>{item.cijena_skladiste} A A </span>
                <input
                    type="text"
                    value={item.cijena_skladiste}
                />
                <button className='main-panel-button' id={item.ime_proizvoda}>AAAAAAA</button>
            </div>
            ))}
        </form>
    )
}

export default EditComponent