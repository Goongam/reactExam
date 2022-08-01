/* eslint-disable */

import './App.css';
import { useMemo, useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import CoinTracker from './Component/CoinTracker';
import CubeSimul from './Component/CubeSimul';
import ShowTodoList from './Component/TodoList';
import Maple from './Component/MapleAPI';
import MapleCrawler from "./Component/MapleCrawler";
import ViewCrawlingData from "./Component/ViewCrawlingData";
import MainPage from './Component/MainPage';
import NotFound from './Component/NotFound';

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
      <header className='black-nav'><Link to="/reactExam">Goongam</Link></header>
      <div className='warp'>
        <div className='Navigator'>
          <li><Link to="/TodoList">TodoList</Link></li>
          <li><Link to="/CubeSimul">CubeSimul</Link></li>
          <li><Link to="/Coin">Coin</Link></li>
          <li><Link to="/MapleAPI">MapleAPI</Link></li>
          <li><Link to="/MapleCrawler">MapleSearch</Link></li>
        </div>
        
        <div className='container'>
        <Switch>

          <Route path="/reactExam">
            <MainPage />
          </Route>

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
          
          <Route path="/MapleCrawler/user/:nick">
            <ViewCrawlingData />
          </Route>

          <Route path="/MapleCrawler">
            <MapleCrawler />
          </Route>

          

          <Route path="*">
            <NotFound />
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
