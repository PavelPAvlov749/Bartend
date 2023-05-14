import React, { useEffect } from "react";


import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/mainScreen";
import { LoginPage } from "../Components/LoginPage";
import { RegistrationPage } from "../Components/Registration";
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { Premixes } from "../Components/Premixes";

const HOME = "/home"

const PREMIX_LIST = "/premixes"
const IN_PROGRESS_LIST = "/in_progress"
const ADD_PRODUCT = "/add"
const PRODUCT_CARD = "/card/:id"
const LOG_OUT = "/logOut"
const REGISTRATION = "/registration"
const NO_MATCH_ROUTE = "*"

export const Router = React.memo((props : any) => {
    const isAuth = useSelector((state : Global_state_type) => {return state.App.isAuth})
    
    if(isAuth){
        return (
            <>
                <Routes>
                    <Route path={HOME} element={<HomePage/>}></Route>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path={NO_MATCH_ROUTE} element={<Navigate to="/home"/>}/>
                    <Route path={PREMIX_LIST} element={<Premixes/>}/>
                </Routes>
            </>
        )
    }else{
        return (
            <>
                <Routes>
                {/* <Route path={HOME} element={<HomePage/>}></Route> */}
                <Route path={LOG_OUT} element={<LoginPage/>}></Route>
                <Route path={REGISTRATION} element={<RegistrationPage/>}/>
                </Routes>
            </>
        )
    }
    
})