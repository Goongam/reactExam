/* eslint-disable */

import './App.css';
import { useMemo, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CoinTracker from './Component/CoinTracker';
import CubeSimul from './Component/CubeSimul';
import ShowTodoList from './Component/TodoList';
import MapleAPI from './Component/MapleAPI';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  

  return (
   <div>
    
    <Router>

      <Link to="/TodoList">TodoList</Link> | 
      <Link to="/CubeSimul">CubeSimul</Link> | 
      <Link to="/Coin">Coin</Link> | 
      <Link to="/Maple">Maple</Link>

      <Switch>
        <Route path="/TodoList">
          <ShowTodoList />
        </Route>
        
        <Route path="/CubeSimul">
          <CubeSimul />
        </Route>

        <Route path="/Coin">
          <CoinTracker />
        </Route>

        <Route path="/Maple">
          <MapleAPI />
        </Route>
      </Switch>

      
    </Router>
    
    {
      
    }

   </div>
  );
}



export default App;
