import React, { useState } from 'react';
import axios from 'axios';

function EditComponent({ title }) {
    const [editStorageList, setEditStorageList] = useState([]);

    function callAxiosStorage() {
        axios
            .get('http://'+window.location.hostname+':3001/storage', {
                params: {
                    title: title,
                },
            })
            .then((data) => {
                //console.log(title)
                setEditStorageList(data.data);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, price, quantity, description } = e.target.elements;
        //uzima vrijednosti input fieldova
        let details = {
            name: name.value,
            price: price.value,
            quantity: quantity.value,
            description: description.value,
        };
        //vrati polja u formi da budu prazna
        console.log(name, price, quantity, description)
        name.value = '';
        price.value = '';
        quantity.value = '';
        description.value = '';
        alert('gotovo');
        //posalje zahtjev node-u sa ovim podacima
        let response = await fetch('http://'+window.location.hostname+':3001/changeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(details),
        });
    };

    callAxiosStorage();

    return (
        <div className="main-panel-form">
            <div className="main-panel-headers">
                <span className="main-panel-headers-items">Ime Proizvoda</span>
                <span className="main-panel-headers-items">Količina</span>
                <span className="main-panel-headers-items">Cijena</span>
                <span className="main-panel-headers-items">Opis</span>
            </div>
            {editStorageList.map((item) => (
                <form className="main-panel-items" onSubmit={handleSubmit}>
                    <label className="main-panel-subitems" style={{ marginTop: "7%" }}>
                        {item.ime_proizvoda}
                    </label>
                    <input type="hidden" id="name" value={item.ime_proizvoda} />
                    <input
                        type="text"
                        placeholder={item.kolicina_skladiste}
                        id="quantity"
                        className="main-panel-subitems"
                    />
                    <input
                        type="text"
                        placeholder={item.cijena_skladiste}
                        id="price"
                        className="main-panel-subitems"
                    />
                    <textarea
                        placeholder={item.opis_skladiste}
                        rows="3"
                        id="description"
                        className="main-panel-subitems"
                    />
                    <div>
                        <button className="main-panel-button" style={{backgroundColor:"#04aa6d"}} id={item.ime_proizvoda} type="submit">
                            ZAVRŠI
                        </button>
                        <button className="main-panel-button" type='reset'>
                            OTKAŽI
                        </button>
                    </div>
                </form>
            ))}

        </div>
    );
}

export default EditComponent;
