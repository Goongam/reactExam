import { useState } from "react";

function MapleAPI(){

    const [inputNick, setInputNick] = useState('');
    const [name, setName] = useState("");
    const [charIMG, setCharIMG] = useState('');
    const [JobDetail, setJobDetail] = useState("");
    const [Lev, setLev] = useState(0);
    const [TotRank, setTotRank] = useState(0);
    const [WorldName, setWorldName] = useState("");
    const [WorldRank, setWorldRank] = useState(0);
    const [loading, setLoading] = useState(false);

    async function sendNick(){
      setLoading(true);
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
          setName("error!");
          setLoading(false);
          return;
        }
        console.log(data);

        //JobDetail
        //Lev
        //TotRank
        //WorldName
        //WorldRank
        
        setName(data.CharacterName._text);
        setCharIMG(data.AvatarImgURL._text);
        setJobDetail(data.JobDetail._text);
        setLev(data.Lev._text);
        setTotRank(data.TotRank._text);
        setWorldName(data.WorldName._text);
        setWorldRank(data.WorldRank._text);
        setLoading(false);
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
            {name === "" ? "" : 
             name === "error!" ? "해당 닉네임을 찾을 수 없음" :
              loading ? "loading..." : 
              <> 
                <p>{name}</p>
                <p>{JobDetail}</p>
                <p>{Lev}레벨</p>
                <p>{TotRank}위</p>
                <p>{WorldName}</p>
                <p>{WorldRank}위</p>
                <img src={charIMG} alt="CharacterImage"></img>
              </> }
            

            
            
        </div>
    );
}

export default MapleAPI;