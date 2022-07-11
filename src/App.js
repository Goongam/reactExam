/* eslint-disable */

import './App.css';
import { useMemo, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CoinTracker from './Component/CoinTracker';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState('');

  const addTodoList = ()=>{
    setTodoList((currentList)=> [inputTodo,...currentList]);
    setInputTodo('');
  }

  const inputChange = (e)=>{
    setInputTodo(e.target.value);
  }

  return (
   <div>
    <h2>ToDo List({todoList.length})</h2>
    <input type="text" onChange={inputChange} value={inputTodo} ></input>
    <button onClick={ addTodoList }>ADD</button>
    <hr />
    <ShowTodoList todoList={todoList} setTodoList={setTodoList}/>
    <hr />
    <CoinTracker />
   </div>
  );
}

function ShowTodoList({todoList, setTodoList}){

  const deleteTodo = (event)=>{
    let deleteIndex = event.target.value;
    setTodoList((currentList)=>{
      currentList.splice(deleteIndex, 1);
      return [...currentList];
    });
  }

  return (
    <div>
      {todoList.map((todo, index)=>{
        return(
          <div key={index}>
            {todo}
            <button value={index} onClick={deleteTodo}>delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
