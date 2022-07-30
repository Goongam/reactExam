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
    async function searchNick(){
        
        const res = await fetch(`http://localhost:3001/MapleCrawling/${inputNick}`);
        const findData = await res.json();
        
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
    }


    return(
        <>
            <input type="text" placeholder="input nickname..." value={inputNick} onChange={e=>{setInputNick(e.target.value)}}></input>
            <button onClick={searchNick}>검색</button>
        
            <hr></hr>
            <div>
                {
                 NickisNULL ? "닉네임을 찾을 수 없음":
                    searchingNick === "" ? "" :
                    <div>
                        <p>검색결과</p>
                        <Link to={`/${searchingNick}`}> <img width={100} height={100} src={findImg}></img> {searchingNick} / {findLv} / ({findJob}) / {findExp} / {findPopularity} /{findGuild}</Link>
                    </div>
                }
            </div>
        </>
        
    );
}

export default MapleCrawler;