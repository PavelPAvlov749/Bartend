import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import logo from "./Assets/bartendLogo.png"
import { initializeThunk } from './Redux/AppReducer';
import { Navbar } from './Components/Navbar';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router/Router';


function App() {
  const dispatch : any = useDispatch()
  useEffect(() => {
    dispatch(initializeThunk())
  },[])
  const isInit = useSelector((state : Global_state_type) => {
    return state.App
  })

  if(isInit.isInit){
    return (
      <div className="App">
        <HashRouter>
        <Navbar/>
      <Router props={{isAuth : isInit.isAuth}}></Router>
        </HashRouter>
     
      </div>
    );
  }else{
    return (
      <div className='App init_screen_container'>
        <img src={logo} alt="" />
      <span>INITIALIZE APP</span>
      </div>
    )
  }

}

export default App;
