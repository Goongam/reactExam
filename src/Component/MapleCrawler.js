import { useState } from "react";
import {Link} from "react-router-dom";


function MapleCrawler(){

    const [inputNick, setInputNick] = useState("");
    const [searchingNick, setSearchingNick] = useState("");
    const [NickisNULL, setNickisNULL] = useState(false);
    const [findLv, setfindLv] = useState('');
    const [findJob,setfindJob] = useState('');
    const [findExp,setfindExp] = useState('');
    const [findPopularity,setfindPopularity] = useState('');
    const [findGuild,setfindGuild] = useState('');
    const [findImg, setfindImg] = useState('');
    const [searching, setSearching] = useState(false);
    const [errorMSG , setErrorMSG] = useState("");
    async function searchNick(){
        setSearching(true);
        setErrorMSG("");
        
        try {
            const res = await fetch(`http://localhost:3001/MapleCrawling/info/${inputNick}`);
            const findData = await res.json();
            console.log(findData);
            if(Object.keys(findData).includes('error')) setNickisNULL(true);
            else {
                setNickisNULL(false);
                setSearchingNick(inputNick);

                setfindLv(findData.info.Lv);
                setfindExp(findData.info.Exp);
                setfindGuild(findData.info.Guild);
                setfindJob(findData.info.Job);
                setfindPopularity(findData.info.Popularity);
                setfindImg(findData.info.Img);
        }
        } catch (error) {
            setErrorMSG("서버와 연결할 수 없음");
        }
        setSearching(false);
    }


    return(
        <>
            <input type="text" placeholder="input nickname..." value={inputNick} onKeyDown={e=>{if (e.key === "Enter") searchNick() }} onChange={e=>{setInputNick(e.target.value)}}></input>
            <button onClick={searchNick}>검색</button>
        
            <hr></hr>
            <div>
                {
                searching ? "검색중" :
                    NickisNULL ? "닉네임을 찾을 수 없음":
                    errorMSG !== "" ? errorMSG :
                    searchingNick === "" ? "" : //초기값
                    
                    <div>
                        <p>검색결과</p>
                        <Link to={`/MapleCrawler/user/${searchingNick}`}> <img width={100} height={100} src={findImg} alt="characterImg"></img> {searchingNick} / {findLv} / ({findJob}) / {findExp} / {findPopularity} /{findGuild}</Link>
                    </div>
                }
            </div>
        </>
        
    );
}

export default MapleCrawler;