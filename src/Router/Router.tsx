
// ---------- REACT & REACT HOOKS
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// ---------- REDUX
import { Global_state_type } from "../Redux/Store";

// ---------- IMPORT PROVATE & PUBLICK ROUND & ROUTE INTERFACE
import { PRIVATE_ROUTES, PUBLICK_ROUTES } from "./Routes";
import { ROUTE } from "../Redux/Types";
import { Preloader } from "../Modules/PremixesApp/Components/Preloader";
import ErrorBoundary from "../Components/ErrorBoundary";

// The router component iterates over the routes array and returns a route component
//  with the corresponding react component. if user is not authorized iterates over PUBLKICK_ROUTES array
// anotherwise over PRIVATE_ROUTES


const Router = React.memo(() => {
    // Get Auth state from redux
    const isAuth = useSelector((state: Global_state_type) => { return state.App.isAuth })

    if (isAuth) {
        // If authorized map only in PRIVATE_ROUTES
        return (
            <div className="content">
                <Suspense fallback={<Preloader />}>
                    <ErrorBoundary>
                        <Routes>
                            {PRIVATE_ROUTES.map((route: ROUTE) => {
                                return (

                                    <Route key={route.path} element={route.element} path={route.path} />

                                )
                            })}
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
            </div>
        )
    }

    else {
        return (
            <>
                <Routes>
                    {PUBLICK_ROUTES.map((route: ROUTE) => <Route key={route.path} path={route.path} element={route.element} />)}
                </Routes>
            </>
        )
    }

})

export default Router;