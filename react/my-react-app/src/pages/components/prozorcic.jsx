import React from 'react';
import '../skladiste';
import '../../css/skladiste.css';


//ovaj prozorcic kopiran s interneta, ovo je samo da imamo s cim radit
function Prozorcic() {

    function closeForm() {
        document.getElementById('myForm').style.display = 'none';
        document.getElementById('page-mask').style.display = 'none';
        document.getElementById('name').value = '';
        document.getElementById('group').value = '';
        document.getElementById('price').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('description').value = '';
    }

//kad kliknes dodaj dugme na prozorcicu, pozove se ova funkcija
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, price, quantity, description, group } = e.target.elements;
      //uzima vrijednosti input fieldova
      let details = {
        name: name.value,
        price: price.value,
        quantity: quantity.value,
        description: description.value,
        group: group.value
      };
      //vrati polja u formi da budu prazna
      name.value = ''
      price.value = ''
      quantity.value = ''
      description.value = ''
      group.value = ''
      alert("dodano")
      //posalje zahtjev node-u sa ovim podacima
      let response = await fetch("http://localhost:3001/storeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
      
      
    };

    return (
        <div className="form-popup" id="myForm">
            <form className="form-container" onSubmit={handleSubmit}>
                <h1>NOVI PROIZVOD</h1>

                <label htmlFor="name">
                    <b>Ime Proizvoda</b>
                </label>
                <input
                    type="text"
                    placeholder="Unesi ime"
                    name="name"
                    required
                    id="name"
                />

                <label htmlFor="group">
                    <b>Skupina</b>
                </label>
                <select id="group" name="group" required placeholder='Izaberi opciju'>
                    <option style={{display:"none"}}></option>
                    <option value="topli">Topli napici</option>
                    <option value="sokovi">Sokovi</option>
                    <option value="alkohol">Alkohol</option>
                    <option value="sendvici">Sendviči</option>
                    <option value="meso">Meso</option>
                    <option value="palacinci">Palačinci</option>
                    <option value="dodaci">Dodaci</option>
                    <option value="ponude">Posebne ponude</option>
                </select>

                <label htmlFor="price">
                    <b>Cijena</b>
                </label>
                <input
                    step="0.01"
                    type="number"
                    placeholder="Unesi cijenu"
                    name="price"
                    required
                    id="price"
                />

                <label htmlFor="quantity">
                    <b>Količina</b>
                </label>
                <input
                    type="number"
                    placeholder="Unesi količinu"
                    name="quantity"
                    required
                    id="quantity"
                />

                <label htmlFor="description">
                    <b>Opis</b>
                </label>
                <textarea
                    placeholder='Unesi opis'
                    name='description'
                    required
                    id='description'>
                </textarea>

                <input type="submit" className="btn" value={"DODAJ"}/> 


            </form>
            <button onClick={closeForm} className="dltBtn">
                ZATVORI
            </button>
        </div>
    );
}

export default Prozorcic;
