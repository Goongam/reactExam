/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const [data, setData] = useState(["남자 코트 추천","강남 고기 맛집","해외 여행 추천"]);
  const [따봉, 따봉변경] = useState(0);

  // function changeData(){
  //   let newArray = [...data];
  //   //newArray[0] = '여자 코트 추천';
  //   newArray.sort();
  //   setData(newArray);
  // }

  return (
    <div className="App">
      <div className='black-nav'>
        개발 Blog
      </div>
      {/* <button onClick={changeData}>aaaa</button> */}
      <div className='list'>
        <h3>{data[0]} <span onClick={ ()=>{따봉변경( 따봉+1 )} }> 👍 </span> {따봉} </h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>

      <div className='list'>
        <h3>{data[1]} <span></span></h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>

      <div className='list'>
        <h3>{data[2]} <span></span></h3>
        <p>2월 17일 발행</p>
        <hr></hr>
      </div>

      
      <Modal />
      
    </div>
  );
}

function Modal(){
  return(
      <div className='modal'>
        <h2>제목</h2>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
  );
}

export default App;
