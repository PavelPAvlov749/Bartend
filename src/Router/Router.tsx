
// ---------- REACT & REACT HOOKS
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// ---------- REDUX
import { Global_state_type } from "../Redux/Store";

// ---------- IMPORT PROVATE & PUBLICK ROUND & ROUTE INTERFACE
import { PRIVATE_ROUTES, PUBLICK_ROUTES } from "./Routes";
import { ROUTE } from "../Redux/Types";

// The router component iterates over the routes array and returns a route component
//  with the corresponding react component. if user is not authorized iterates over PUBLKICK_ROUTES array
// anotherwise over PRIVATE_ROUTES


export const Router = React.memo((props: { isDarkTheme: boolean }) => {
    
    const isAuth = useSelector((state: Global_state_type) => { return state.App.isAuth })
   
    if (isAuth) {

        return (
            <div className="content">
                <Routes>
                    {PRIVATE_ROUTES.map((route : ROUTE) => {
                        return (
                            <Route key={route.path} element={route.element} path={route.path}/>
                        )
                    })}
                </Routes>
           
            </div>
        )
    }

    else {
        return (
            <>
                <Routes>
                    {PUBLICK_ROUTES.map((route : ROUTE) => <Route path={route.path} element={route.element}/>)}
                </Routes>
            </>
        )
    }

})