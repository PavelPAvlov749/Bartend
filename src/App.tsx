// ---------- IMPORT REACT & REACT HOOKS
import React, { Suspense, useEffect } from 'react';
// --------- STYLES IPMOIRTS
import "./App.css"
import "./Assets/Styles/Global_styles.css"

// ---------- REDUX
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import { app_actions, initializeThunk } from './Redux/AppReducer';



// --------- IMPORT COMPOMNENTS

import { HashRouter } from 'react-router-dom';
import { Preloader } from './Modules/PremixesApp/Components/Preloader';


const Navbar = React.lazy(() => import('./Components/Navbar'));
const Router = React.lazy(() => import('./Router/Router'));


function App() {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(initializeThunk());
  }, [])
  const isDarkTheme = useSelector((state: Global_state_type) => state.App.isDarktheme);
  const isInit = useSelector((state: Global_state_type) => state.App.isInit);
  const isError = useSelector((state : Global_state_type) => state.App.isError);

  if (isInit) {
    return (
      <div className={isDarkTheme ? "App DarkTheme translate_animation" : "App LightTheme translate_animation"}>
        
        <HashRouter>
          <Suspense fallback={<Preloader />}>
            <Navbar theme={isDarkTheme} />
            <Router isDarkTheme={isDarkTheme} ></Router>
          </Suspense>

        </HashRouter>

      </div>
    )

  } else {
    return <Preloader />
  }

}

export default App;
