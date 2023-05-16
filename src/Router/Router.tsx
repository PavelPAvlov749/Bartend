import React, { useEffect } from "react";


import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/mainScreen";
import { LoginPage } from "../Components/LoginPage";
import { RegistrationPage } from "../Components/Registration";
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { Premixes } from "../Components/Premixes";
import { NewProduct } from "../Components/NewProduct";
import { ProductCard } from "../Components/ProductCard";
import { BlankShift } from "../Components/BlankShift";

const HOME = "/home"

const PREMIX_LIST = "/premixes"
const IN_PROGRESS_LIST = "/in_progress"
const ADD_PRODUCT = "/add"
const PRODUCT_CARD = "/card/:id"
const LOG_OUT = "/logOut"
const REGISTRATION = "/registration"
const NO_MATCH_ROUTE = "*"
const BLANK_SHIFT = "/blank-shift"

export const Router = React.memo((props : any) => {
    const isAuth = useSelector((state : Global_state_type) => {return state.App.isAuth})
    
    if(isAuth){
        return (
            <>
                <Routes>
                    <Route path={ADD_PRODUCT} element={<NewProduct/>}/>
                    <Route path={PRODUCT_CARD} element={<ProductCard/>}></Route>
                    <Route path={HOME} element={<HomePage/>}></Route>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path={NO_MATCH_ROUTE} element={<Navigate to="/home"/>}/>
                    <Route path={PREMIX_LIST} element={<Premixes/>}/>
                    <Route path={BLANK_SHIFT} element={<BlankShift/>}/>
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