import { useEffect, useState } from "react";
import cubeSimulStyle from "./css/cubeSimulStyle.css"

const CubeColor = {
    'rare': 'lightblue',
    'epic': 'purple',
    'unique': 'yellow',
    'legendary':'green'
};
const GRADE = ['rare','epic','unique','legendary'];
const cubes = {'jangin':{'name':'장인', 'value':'jangin','meso':14_000_000,'chance':{'rare':4.7619,'epic':1.1858,'unique':0}},
                'myung':{'name':'명장', 'value':'myung','meso':30_000_000,'chance':{'rare':7.9994,'epic':1.6959,'unique':0.1996}},
                'red':{'name':'레드', 'value':'red','meso':34_000_000,'chance':{'rare':6.0000,'epic':1.8000,'unique':0.3000}},
                'black':{'name':'블랙', 'value':'black','meso':55_000_000,'chance':{'rare':15.0000,'epic':3.5000,'unique':1.2000}}};

function CubeSimul(){

    const [color, setColor] = useState('lightblue');
    const [cubeGrade, setCubeGrade] = useState('rare');
    const [selectedGrade, setSelectedGrade] = useState('rare');
    const [logs, setLogs] = useState([]);
    const [usedCount, setUsedCount] = useState(0);
    const [selectedCube, setSelectedCube] = useState('jangin');
    const [isMiracle, setMiracle] = useState(false);
    const [usedMeso, setUsedMeso] = useState(0);


    function clickGo(){
        if(cubeGrade === 'legendary') return;
        setUsedCount(usedCount+1);

        setUsedMeso((prevMeso)=>prevMeso+cubes[selectedCube].meso);

        const random = Math.random() * 100;
        console.log(random)
        let cubeChance = cubes[selectedCube].chance[cubeGrade];
        if(isMiracle) cubeChance *= 2;
        if(random <= cubeChance) { //등급업 성공

            setLogs( (prev) => 
                [...prev,{
                    'grade':GRADE[ GRADE.indexOf(cubeGrade) + 1],
                    'message':`${GRADE[ GRADE.indexOf(cubeGrade) + 1]}(으)로 등급업!(누적 ${usedCount+1}개, ${(usedMeso+cubes[selectedCube].meso).toLocaleString('ko-KR')}메소)`
                }]
            )


            setCubeGrade(GRADE[ GRADE.indexOf(cubeGrade) + 1]);
            
        }
    }


    function clickReset(){
        setCubeGrade(selectedGrade);
        setLogs([]);
        setUsedCount(0);
        setUsedMeso(0);
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
                <option value={'legendary'}>레전</option>
            </select>
     
            <br />
            큐브
            <select onChange={changeCube}>
                {
                    Object.values(cubes).map(((cube, index)=>
                    <option key={index} value={cube.value}>{cube.name}</option>))
                }
                
            </select>
            <br />
            미라클
            <input type="checkbox" onChange={changeMiracle} checked={isMiracle}/>
            <br />
            <button onClick={clickGo}>GO</button>
            <button onClick={clickReset}>RESET</button>
            <span> {usedCount}개/{usedMeso.toLocaleString('ko-KR')}메소/등급업확률(
                { isMiracle ? (cubes[selectedCube].chance[cubeGrade] ?? 0 )* 2 
                : cubes[selectedCube].chance[cubeGrade] ?? 0 }%)</span>
            <div id="logBox" style={{'border-color': color}} >
                {logs.map((log, index)=>
                    <h5 className={"log "+log.grade} key={index}>{log.message}</h5>
                )}
            </div>

        </div>
    );
}

export default CubeSimul;