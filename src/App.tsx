import React, { useEffect } from 'react';
import "./App.css"
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import { initializeThunk } from './Redux/AppReducer';
import { Navbar } from './Components/Navbar';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router/Router';

import loader from "./Assets/icons8-jigger-64.png";


function App() {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(initializeThunk())
  }, [])
  
  const appState = useSelector((state: Global_state_type) => {
    return state.App
  })

  if (appState.isInit) {

    return (
      <div className={appState.isDarktheme ? "App DarkTheme translate_animation" : "App LightTheme translate_animation"}>
        <HashRouter>
          <Navbar theme={appState.isDarktheme}/>
          <Router isAuth={appState.isAuth} isDarkTheme={appState.isDarktheme} isFetch={appState.isFetch}></Router>
        </HashRouter>

      </div>
    )


  } else {
    return (
      <div className='App init_screen_container'>
        <img src={loader} id='loader' alt="" />
        <span>INITIALIZE APP</span>
      </div>
    )
  }

}

export default App;
