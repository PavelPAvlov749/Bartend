import React, { useEffect } from "react";


import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/mainScreen";
import { LoginPage } from "../Components/LoginPage";
import { RegistrationPage } from "../Components/Registration/Registration";
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { Premixes } from "../Components/Premixes";
import { NewProduct } from "../Components/NewProduct/NewProduct";
import { ProductCard } from "../Components/ProductCard";
import { BlankShift, ShiftsHistory } from "../Components/BlankShift";
import { SecondStep } from "../Components/NewProduct/SecondStep";
import loader from "../Assets/icons8-jigger-64.png";
import { StartPage } from "../Components/Registration/StartPage";
import { JoinTheTeam, JoinTheTeamFinish } from "../Components/Registration/JoinTheTeam";
import { CreateTheTeam } from "../Components/Registration/CreateTheTeam";

const HOME = "/home"

const PREMIX_LIST = "/premixes"
const IN_PROGRESS_LIST = "/in_progress"
const ADD_PRODUCT = "/add"
const PRODUCT_CARD = "/card/:id"
const LOG_OUT = "/logOut"
const REGISTRATION = "/registration"
const NO_MATCH_ROUTE = "*"
const BLANK_SHIFT = "/blank-shift"
const START_BLANK_SHIFT = "/begin-blank-shift"
const STEP_2 = "add-step-two"
const JOIN_TEAM = "/registration/join-team"
const CREATE_TEASM = "/create-team"
const FINISH_TEAM_JOIN = "registration/join-team/finish"
const NEW_BLANK_SHOFT = "/blank-shift/create-new"

export const Router = React.memo((props : any) => {
    const isAuth = useSelector((state : Global_state_type) => {return state.App.isAuth})
    const isFetch = useSelector((state : Global_state_type) => state.App.isFetch)
    if(isAuth){
        if(isFetch){
            return (
                <>
                    <div className="Loader">
                        <img src={loader} alt="" />
                    </div>
                </>
            )
        } else{
            return (
                <>
                    <Routes>
                       
                        <Route path={ADD_PRODUCT} element={<NewProduct/>}/>
                        <Route path={STEP_2} element={<SecondStep/>}/>
                        <Route path={PRODUCT_CARD} element={<ProductCard/>}></Route>
                        <Route path={HOME} element={<HomePage/>}></Route>
                        <Route path="/" element={<HomePage/>}></Route>
                        {/* <Route path={NO_MATCH_ROUTE} element={<Navigate to="/home"/>}/> */}
                        <Route path={PREMIX_LIST} element={<Premixes/>}/>
                        <Route path={BLANK_SHIFT} element={<ShiftsHistory/>}/>
                        <Route path={NEW_BLANK_SHOFT} element={<BlankShift/>}/>
                    </Routes>
                </>
            )
        }
       
    }else{
        return (
            <>
                <Routes>
                {/* <Route path={HOME} element={<HomePage/>}></Route> */}
                <Route path={LOG_OUT} element={<LoginPage/>}></Route>
                <Route path={REGISTRATION} element={<StartPage/>}/>
                <Route path={JOIN_TEAM} element={<JoinTheTeam/>}/>
                <Route path={FINISH_TEAM_JOIN} element={<JoinTheTeamFinish/>}/>
                <Route path={CREATE_TEASM} element={<CreateTheTeam/>} />
                </Routes>
            </>
        )
    }
    
})