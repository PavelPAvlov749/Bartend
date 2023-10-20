// ---------- IMPORT REACT & REACT HOOKS
import React, {Suspense, useEffect } from 'react';
// --------- STYLES IPMOIRTS
import "./App.css"
import "./Styles/Global_styles.css"

// ---------- REDUX
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import { initializeThunk } from './Redux/AppReducer';
// @ts-ignore


// ---------- LOADER
import loader from "./Assets/icons8-jigger-64.png";

// --------- IMPORT COMPOMNENTS

import {HashRouter, Route, Routes} from 'react-router-dom';
import { BLANK_SHIFT, SHIFT_MANAGER } from './Router/Routes';
import { ShiftConstructorContainer } from './PremixesApp/Components/ConstructorPage/ShiftCounstructorContainer';
import { MainPage } from './PremixesApp/Components/MainPage/MainPage';
import { HomePage } from './Components/mainScreen';
// @ts-ignore
const Navbar = React.lazy(() => import('./Components/Navbar'));
const Router = React.lazy(() => import('./Router/Router'));
// @ts-ignore





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
          {/* <Routes>
            <Route path='home' element={<HomePage/>}></Route>
            <Route path='shiftManager' element={<MainPage/>}/>
          </Routes> */}
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
