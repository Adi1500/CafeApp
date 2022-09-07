import React from 'react';
import '../skladiste';
import '../../css/stranica.css';

//ovaj prozorcic kopiran s interneta, ovo je samo da imamo s cim radit
function Prozorcic() {
    function closeForm() {
        document.getElementById('myForm').style.display = 'none';
    }
    return (
        <div className="form-popup" id="myForm">
            <form className="form-container">
                <h1>Login</h1>

                <label for="email">
                    <b>Email</b>
                </label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    required
                />

                <label for="psw">
                    <b>Password</b>
                </label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    required
                />

                <button type="submit" className="btn">
                    Login
                </button>
                <button>onClick={closeForm}</button>
            </form>
        </div>
    );
}

export default Prozorcic;
