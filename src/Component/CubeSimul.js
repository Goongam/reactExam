import { useEffect, useState } from "react";
import cubeSimulStyle from "./css/cubeSimulStyle.css"

const CubeColor = {
    'rare': 'lightblue',
    'epic': 'purple',
    'unique': 'yellow',
    'legend':'green'
};
const GRADE = ['rare','epic','unique','legend'];
const chance = {
    'jangin':{'rare':4.7619,'epic':1.1858,'unique':0},
    'myung':{'rare':7.9994,'epic':1.6959,'unique':0.1996},
};
function CubeSimul(){

    const [color, setColor] = useState('lightblue');
    const [cubeGrade, setCubeGrade] = useState('rare');
    const [selectedGrade, setSelectedGrade] = useState('rare');
    const [logs, setLogs] = useState([]);
    const [usedCount, setUsedCount] = useState(0);
    const [selectedCube, setSelectedCube] = useState('jangin');
    const [isMiracle, setMiracle] = useState(false);

    function clickGo(){
        if(cubeGrade === 'legend') return;
        setUsedCount(usedCount+1);
        const random = Math.random() * 100;
        console.log(random)
        let cubeChance = chance[selectedCube][cubeGrade];
        if(isMiracle) cubeChance *= 2;
        if(random <= cubeChance) { //등급업 성공

            setLogs( (prev) => 
                [...prev,{
                    'grade':GRADE[ GRADE.indexOf(cubeGrade) + 1],
                    'message':`${GRADE[ GRADE.indexOf(cubeGrade) + 1]}으로 등급업!`
                }]
            )


            setCubeGrade(GRADE[ GRADE.indexOf(cubeGrade) + 1]);
            
        }
    }

    function clickReset(){
        setCubeGrade(selectedGrade);
        setLogs([]);
        setUsedCount(0);
    }

    function changeGrade(e){
        setCubeGrade(e.target.value);
        setSelectedGrade(e.target.value);
    }
    function changeCube(e){
        setSelectedCube(e.target.value);
    }
    function changeMiracle(e){
        setMiracle(e.target.checked);
    }

    useEffect(()=>{
        setColor(CubeColor[cubeGrade]);
    },[cubeGrade]);

    return (
        <div>
            시작
            <select onChange={changeGrade}>
                <option value={'rare'}>레어</option>
                <option value={'epic'}>에픽</option>
                <option value={'unique'}>유니크</option>
                <option value={'legend'}>레전</option>
            </select>
     
            <br />
            큐브
            <select onChange={changeCube}>
                <option value={'jangin'}>장인</option>
                <option value={'myung'}>명장</option>
            </select>
            <br />
            미라클
            <input type="checkbox" onChange={changeMiracle} checked={isMiracle}/>
            <br />
            <button onClick={clickGo}>GO</button>
            <button onClick={clickReset}>RESET</button>
            <span> {usedCount}개/{0}메소/등급업확률(
                { isMiracle ? chance[selectedCube][cubeGrade] *2 
                : chance[selectedCube][cubeGrade] }%)</span>
            <div id="logBox" style={{'border-color': color}} >
                {/* <h5 className="log">레전드리 등급업! 0개 / 0메소</h5>
                <h5 className="log">레전드리 등급업! 0개 / 0메소</h5>
                <h5 className="log">레전드리 등급업! 0개 / 0메소</h5> */}
                {logs.map((log, index)=>
                    <h5 className={"log "+log.grade} key={index}>{log.message}</h5>
                )}
            </div>

        </div>
    );
}

export default CubeSimul;