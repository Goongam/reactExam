import { useState } from "react";

function MapleAPI(){

    const [inputId, setInputId] = useState(0);
    const [name, setName] = useState("");
    
    async function sendID(){
        let data = await (await fetch("http://localhost:3001/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": inputId
          }),
          
        })).json();
        console.log(data);
        setName(data.data);
    };



    function changeInput(e){
        setInputId(e.target.value);
    }

    return (
        <div>
            <input type="number" value={inputId} onChange={changeInput}></input>
            <button onClick={sendID}> 입력</button>
            <hr />
            {name}
        </div>
    );
}

export default MapleAPI;