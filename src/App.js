/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useMemo, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';

function App() {
  
  const [data, setData] = useState(["남자 코트 추천","강남 고기 맛집","해외 여행 추천"]);
  const [따봉, 따봉변경] = useState(0);

  const [title, setTitle] = useState("제목1");
  const changeTitle = ()=>{
    setTitle("바뀐제목");
  }



  useEffect(()=>{console.log("함수호출 title:",title);},[title]);

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

      
      <Modal title={title} date="날짜" onClick={changeTitle} />
      <Modal title="제목" />
      
    </div>
  );
}

Modal.propTypes = {
  onClick: PropTypes.func,
}

// const MemorizedCompo = memo(Modal);
function Modal({title, date, onClick}){
  return(
      <div className='modal'>
        <h2>{title}</h2>
        <p>{date}</p>
        <p>상세내용</p>
        <button onClick={onClick}>click!</button>
      </div>
  );
}

export default App;
