/* eslint-disable */

import './App.css';
import { useMemo, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CoinTracker from './Component/CoinTracker';
import CubeSimul from './Component/CubeSimul';
import ShowTodoList from './Component/TodoList';
import Maple from './Component/MapleAPI';
import MapleCrawler from "./Component/MapleCrawler";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  
  

  return (
   <>
    
    <Router>
      <header className='black-nav'>Goongam</header>
      <div className='warp'>
        <div className='Navigator'>
          <li><Link to="/TodoList">TodoList</Link></li>
          <li><Link to="/CubeSimul">CubeSimul</Link></li>
          <li><Link to="/Coin">Coin</Link></li>
          <li><Link to="/MapleAPI">MapleAPI</Link></li>
          <li><Link to="/MapleCrawler/${}">MapleSearch</Link></li>
        </div>
        
        <div className='container'>
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

          <Route path="/MapleAPI">
            <Maple />
          </Route>
          
          <Route path="/MapleCrawler">
            <MapleCrawler />
          </Route>
        </Switch>

        </div>
      </div>
      <footer>Footer</footer>
    </Router>
    
    {
      
    }

   </>
  );
}



export default App;
