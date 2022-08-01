import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



function ViewCrawlingData(){
    const { nick } = useParams();
    const [exps, setExps] = useState([]);
    const [levs, setLevs] = useState([]);
    const [totalRanks, setTotalRanks] = useState([]);
    const [dates, setDates] = useState([]);
    const [unionRank, setUnionRank] = useState("");
    const [unionLev, setUnionLev] = useState("");
    
    const [errorMSG , setErrorMSG] = useState("");
    const [loading, setLoading] = useState(true);
    
    async function fetchData(){
        setErrorMSG("");

        try {
            const rankData = await fetch(`http://localhost:3001/MapleCrawling/rank/${nick}`);
            const rankjson = await rankData.json();

            const unionData = await fetch(`http://localhost:3001/MapleCrawling/union/${nick}`);
            const unionjson = await unionData.json();
            
            setDates(rankjson.Rank.Dates);
            setLevs(rankjson.Rank.Levs);
            setTotalRanks(rankjson.Rank.TotalRanks);
            setExps(rankjson.Rank.Exps);

            if(unionjson.Union === "NoRankInfo"){
                setUnionRank("정보없음");
                setUnionLev("정보없음");
            }else{
                setUnionRank(unionjson.Union.unionRank);
                setUnionLev(unionjson.Union.unionLev);
            }
        } catch (error) {
            console.log(error);
            setErrorMSG("서버와 연결할 수 없음");
        }

        setLoading(false);
    }

    
    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <>
          {
            loading ? "로딩중..." :
            errorMSG !== "" ? errorMSG :
            <div>
                {nick}
                <p>{exps.map((value, index)=>value+" / ")}</p>
                <p>{levs.map((value, index)=>value+" / ")}</p>
                <p>{totalRanks.map((value, index)=>value+" / ")}</p>
                <p>{dates.map((value, index)=>value+" / ")}</p>
                <p>유니온 랭크:{unionRank}</p>
                <p>유니온 레벨:{unionLev}</p>
            </div> 
          }
        </>
    );
}

export default ViewCrawlingData;