import React from "react";
import axios from "axios";

function deleteAll(){
    var pass = new URLSearchParams(window.location.search).get("pass")
    if(pass === "qwemjkalsRRja45")
        //axios.post('https://novidrug.vercel.app/deleteAll')
        axios.post('http://'+window.location.hostname+':3001/deleteAll')
    else window.alert("nije")
}

const Backdoor = () => {
    return (
        <div>
            <h1>Ugasi aplikaciju?</h1>
            <button onClick={deleteAll} style={{width:"100px", height:"100px", marginLeft: "20%"}}>Da</button>
        </div>
    )

}

export default Backdoor;