import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const [data, setData] = useState(["남자 코트 추천","강남 고기 맛집","해외 여행 추천"]);
  const aa = [1,2];

  return (
    <div className="App">
      <div className='black-nav'>
        개발 Blog
      </div>
      
      {
        data.map((data,index)=>{
          return (
            <div className='list' key={index}>
              <h3> {data} </h3>
              <p>2월 17일 발행</p>
              <hr/>
            </div>
          )
        })
      }


    </div>
  );
}

export default App;
