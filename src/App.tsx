import React, { useEffect } from 'react';
// STYLES IPMOIRTS
import "./App.css"
import "./Styles/Global_styles.css"
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import { initializeThunk } from './Redux/AppReducer';
import { Navbar } from './Components/Navbar';
import { HashRouter } from 'react-router-dom';
import { Router } from './Router/Router';

import loader from "./Assets/icons8-jigger-64.png";
import { Header } from './Components/mainScreen';


function App() {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(initializeThunk())
  }, [])
  const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
  const isInit = useSelector((state: Global_state_type) => {
    return state.App.isInit
  })
  const isAuth = useSelector((state : Global_state_type) => state.App.isAuth)
  console.log(isInit)
  if (isInit) {

    return (
      <div className={isDarkTheme ? "App DarkTheme translate_animation" : "App LightTheme translate_animation"}>
        <HashRouter>
        
         
          <Navbar theme={isDarkTheme}/>
          <Router isDarkTheme={isDarkTheme} ></Router>
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
