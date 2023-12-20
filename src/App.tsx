// ---------- IMPORT REACT & REACT HOOKS
import React, { Suspense, useEffect } from 'react';
// --------- STYLES IPMOIRTS
import "./App.css"
import "./Assets/Styles/Global_styles.css"
// ---------- REDUX
import { useDispatch, useSelector } from 'react-redux';
import { Global_state_type } from './Redux/Store';
import { initializeThunk } from './Redux/AppReducer';

// --------- IMPORT COMPOMNENTS
import { HashRouter } from 'react-router-dom';
import { Preloader } from './Modules/PremixesApp/Components/Preloader';
import Navbar from './Components/Navbar/Navbar';

const Router = React.lazy(() => import('./Router/Router'));




// ----------------------
// 
// This is the Root App Component
// Runs Init functions and
// Contains Navbar and Router Component
// 
// ----------------------

function App() {
  const dispatch: any = useDispatch()
  // Initialize the APP
  // Check authState,Fetch userData
  useEffect(() => {
    dispatch(initializeThunk());
  }, []);

  // Initialization boolean Flag
  const isInit = useSelector((state: Global_state_type) => state.App.isInit);

  // If App was initialized render the App


  if (isInit) {
    return (
      <div className={"App DarkTheme translate_animation"}>
        <HashRouter>
          <Suspense fallback={<Preloader />}>
          
            <Navbar/>
            <Router></Router>
          </Suspense>
        </HashRouter>

      </div>
    )

  }
  else 
  {
    // Anotherwise Render Preloader
    return <Preloader />
  }

}

export default App;
