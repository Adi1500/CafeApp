import React, { useState } from 'react';
import axios from 'axios';

function EditComponent({ title }) {
    const [editStorageList, setEditStorageList] = useState([]);

    function callAxiosStorage() {
        axios
            .get('http://localhost:3001/storage', {
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
        name.value = '';
        price.value = '';
        quantity.value = '';
        description.value = '';
        alert('gotovo');
        //posalje zahtjev node-u sa ovim podacima
        let response = await fetch('http://localhost:3001/changeData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(details),
        });
    };

    callAxiosStorage();

    return (
        <form className="main-panel-form" onSubmit={handleSubmit}>
            <div className="main-panel-headers">
                <span className="main-panel-headers-items">Ime Proizvod a</span>
                <span className="main-panel-headers-items">Količina</span>
                <span className="main-panel-headers-items">Cijena</span>
                <span className="main-panel-headers-items">Opis</span>
            </div>
            {editStorageList.map((item) => (
                <div className="main-panel-items">
                    <label className="main-panel-subitems">
                        {item.ime_proizvoda}
                    </label>
                    <input type="hidden" id="name" value={item.ime_proizvoda} />
                    <input
                        type="text"
                        placeholder={item.kolicina_skladiste}
                        id="quantity"
                    />
                    <input
                        type="text"
                        placeholder={item.cijena_skladiste}
                        id="price"
                    />
                    <input
                        type="text"
                        placeholder={item.opis_skladiste}
                        id="description"
                    />
                    <button
                        className="main-panel-button"
                        id={item.ime_proizvoda}
                    >
                        AAAAAAA
                    </button>
                </div>
            ))}
            <button type="submit" value={'choad'}>
                SUBMIT
            </button>
        </form>
    );
}

export default EditComponent;
