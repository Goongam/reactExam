import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Chart} from 'chart.js/auto'; //Bar에러 시 import 
  import { Line } from 'react-chartjs-2';
  

export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: true,
        text: '레벨 그래프',
        },
    },
    scales: {
        y:{
            axis: 'y',
            display: true,
            position: 'left',
            
        },
        y_sub:{
            position: 'right',
    
        }
      },
};
  



function ViewCrawlingData(){
    const { nick } = useParams();
    const [exps, setExps] = useState([]);
    const [levs, setLevs] = useState([]);
    const [totalRanks, setTotalRanks] = useState([]);
    const [dates, setDates] = useState([]);
    const [unionRank, setUnionRank] = useState("");
    const [unionLev, setUnionLev] = useState("");
    const [charimg, setCharImg] = useState("");

    const [errorMSG , setErrorMSG] = useState("");
    const [loading, setLoading] = useState(true);

 
    const data = {
        labels: [...dates].reverse(),
        datasets: [
            {
            label: '레벨',
            data: [...levs].reverse(),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                type: 'bar',
                label: '경험치',
                data: [...exps].map(exp=>+exp.replace(/,/g, "")).reverse(),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y_sub'
            },
        ],
    };


    async function fetchData(){
        setErrorMSG("");

        try {
            const rankData = await fetch(`http://localhost:3001/MapleCrawling/rank/${nick}`);
            const rankjson = await rankData.json();

            const unionData = await fetch(`http://localhost:3001/MapleCrawling/union/${nick}`);
            const unionjson = await unionData.json();
            
            const infoData = await fetch(`http://localhost:3001/MapleCrawling/info/${nick}`);
            const infojson = await infoData.json();

            setDates(rankjson.Rank.Dates);
            setLevs(rankjson.Rank.Levs);
            setTotalRanks(rankjson.Rank.TotalRanks);
            setExps(rankjson.Rank.Exps);
            setCharImg(infojson.info.Img);

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
                <p><img src={charimg}></img></p>
                <p>{exps.map((value, index)=>value+" / ")}</p>
                <p>{levs.map((value, index)=>value+" / ")}</p>
                <p>{totalRanks.map((value, index)=>value+" / ")}</p>
                <p>{dates.map((value, index)=>value+" / ")}</p>
                <p>유니온 랭크:{unionRank}</p>
                <p>유니온 레벨:{unionLev}</p>


                <Line options={options} data={data} />

            </div>
            
          }
        </>
    );
}

export default ViewCrawlingData;