// ---------- IMPORT REACT & REACT HOOKS
import React, {Suspense, useEffect } from 'react';
// --------- STYLES IPMOIRTS
import "./App.css"
import "./Assets/Styles/Global_styles.css"

// ---------- REDUX
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import { initializeThunk } from './Redux/AppReducer';

// ---------- LOADER
import loader from "./Assets/Icons/icons8-jigger-64.png";

// --------- IMPORT COMPOMNENTS

import {HashRouter} from 'react-router-dom';


const Navbar = React.lazy(() => import('./Components/Navbar'));
const Router = React.lazy(() => import('./Router/Router'));






function App() {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(initializeThunk())
  }, [])
  
  const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
  const isInit = useSelector((state: Global_state_type) => state.App.isInit)
  
  if (isInit) {

    return (
      <div className={isDarkTheme ? "App DarkTheme translate_animation" : "App LightTheme translate_animation"}>
        <HashRouter>
          <Suspense fallback={<>LOADING</>}>
          <Navbar theme={isDarkTheme}/>
          <Router isDarkTheme={isDarkTheme} ></Router>
          </Suspense>
         
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
