import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../css/Login.css';
import { Helmet } from 'react-helmet'

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [loginStatus, setLoginStatus] = useState(false);

    async function loginUser(credentials) {
    return fetch('https://novidrug.vercel.app/login', {
    //return fetch('http://'+window.location.hostname+':3001/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
    }).then(res => res.json()).then(data => {
            console.log(data)
            if(!data.auth){
                setLoginStatus(false);
            }
            else{
                setLoginStatus(true);
                localStorage.setItem('token', data.token );
                //setToken(data.token)
            }
        })
        
    }

  const handleSubmit = async e => {
        e.preventDefault();
        const credentials = await loginUser({
            username,
            password
        });  
        window.location.reload();
        
  }

  return(
    
    <div className="login-wrapper">
    <Helmet>
    <style>
    {`
      *,
      *::before,
      *::after {
        all: revert;
      }
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-image: none;
        background-repeat : revert;
        }
    `}
    </style>
    </Helmet>
      <h1>Prijavite se</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Korisničko ime</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Lozinka</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Prijavi se</button>
        </div>
      </form>
    </div>
  )
}
