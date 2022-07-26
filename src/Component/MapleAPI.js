import { useState } from "react";

function MapleAPI(){

    const [inputNick, setInputNick] = useState('');
    const [name, setName] = useState("");
    const [charIMG, setCharIMG] = useState('');

    async function sendNick(){
        let data = await (await fetch("http://localhost:3001/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "Nick": inputNick
          }),
          
        })).json();
        
        if(data.error) {
          console.log("서버오류: ",data.error);
          return;
        }
        setCharIMG(data.AvatarImgURL._text);
        // setName(data.data);
    };



    function changeInput(e){
        setInputNick(e.target.value);
    }
    function DownEnterKey(e){
      if(e.key === 'Enter') sendNick();
    }

    return (
        <div>
            <input value={inputNick} onChange={changeInput} onKeyDown={DownEnterKey}></input>
            <button onClick={sendNick}> 입력</button>
            <hr />
            {name}
            <hr />
            <img src={charIMG}></img>
        </div>
    );
}

export default MapleAPI;