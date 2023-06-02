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
import Chart from './Component/Chart';
import MainPage from './Component/MainPage';
import NotFound from './Component/NotFound';
import TextEditor from './Component/TextEditor';
import Prefetching from './Component/Prefetching';
import MapleCubeAPI from './Component/MapleCubeAPI';
import KakaoLogin from './Component/KakaoLogin';
import Success from './Component/oauth/Success';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { QueryClient , QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import ContextTestComp from './Component/ContextTestComp';

function App() {
  
  const queryClient = new QueryClient();

  return (
   <>
    <QueryClientProvider client={queryClient}>
    <Router>
      <header className='black-nav'><Link to="/reactExam">Goongam</Link></header>
      <div className='warp'>
        <div className='Navigator'>
          <li><Link to="/TodoList">TodoList</Link></li>
          <li><Link to="/CubeSimul">CubeSimul</Link></li>
          <li><Link to="/Coin">Coin</Link></li>
          <li><Link to="/MapleAPI">MapleAPI</Link></li>
          <li><Link to="/MapleCrawler">MapleSearch</Link></li>
          <li><Link to="/Chart">Chart</Link></li>
          <li><Link to="/TextEditor">TextEditor</Link></li>
          <li><Link to="/Prefetching">Prefetching</Link></li>
          <li><Link to="/MapleCubeAPI">MapleCubeAPI</Link></li>
          <li><Link to='/KakaoLogin'>KakaoLogin</Link></li>
          <li><Link to='/ContextTest'>ContextTest</Link></li>
          {/* <li><Link to='/success'>Success</Link></li> */}
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

          <Route path="/Chart">
            <Chart />
          </Route>

          <Route path="/TextEditor">
            <TextEditor />
          </Route>
          
          <Route path="/Prefetching">
            <Prefetching />
          </Route>

          <Route path="/MapleCubeAPI">
            <MapleCubeAPI />
          </Route>

          <Route path={'/KakaoLogin'}>
            <KakaoLogin />
          </Route>

          <Route path={'/ContextTest'}>
            <ContextTestComp />
          </Route>

          <Route path={'/success'}>
            <Success />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        </div>
      </div>
      <footer>Footer</footer>
    </Router>
    
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
   </>
  );
}



export default App;
