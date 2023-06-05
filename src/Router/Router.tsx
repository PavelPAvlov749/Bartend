import React, { ReactElement, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../Components/mainScreen";
import { LoginPage } from "../Components/LoginPage";
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { Premixes } from "../Components/Premixes";
import { NewProduct } from "../Components/NewProduct/NewProduct";
import { ProductCard } from "../Components/ProductCard";
import { CreateNewShift, ShiftPageContainer } from "../Components/ShiftsPage/BlankShift";
import { SecondStep } from "../Components/NewProduct/SecondStep";
import loader from "../Assets/icons8-jigger-64.png";
import { CheckLists } from "../Components/CheckLists/CheckLists";

import { TeamPageContainer } from "../Components/Teams/ClanList";
import { CreateTeam } from "../Components/Teams/CreateTeam";
import { JoinTeam } from "../Components/Teams/JoinTeam";
import { Registration } from "../Components/Registration/Registration";
import { NewCheckList } from "../Components/CheckLists/NewCheckList";
import { CheckListPage } from "../Components/CheckLists/CheclListPage";

const HOME = "/home"

const PREMIX_LIST = "/premixes"
const ADD_PRODUCT = "/add"
const PRODUCT_CARD = "/card/:id"
const LOG_OUT = "/logOut"
const REGISTRATION = "/registration"
const NO_MATCH_ROUTE = "*"
const BLANK_SHIFT = "/blank-shift"
const STEP_2 = "add-step-two"
const NEW_BLANK_SHIFT = "/blank-shift/create-new"
const CHECK_LISTS = "/check-lists"
const PASSED_SHIFT = "blank-shift/:id"
const CLAN_LISTS = "/clan-list" 
const CREATE_TEAM = "/create-team"
const JOIN_TEAM = "/join-team"
const TEAM_CHAT = "/chat/:id"
const NEW_CHECK_LIST = "/new-check-list"
const CHECK_LIST = "/check-lists/:id"

export const Router  = React.memo((props : {isAuth : boolean,isFetch : boolean,isDarkTheme : boolean}) => {
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
                <div className="content">
                    <Routes>
                        <Route path={JOIN_TEAM} element={<JoinTeam isDarkTheme/>}/>
                        <Route path={CREATE_TEAM} element={<CreateTeam/>}/>
                        <Route path={CHECK_LISTS} element={<CheckLists/>}/>
                        <Route path={HOME} element={<HomePage/>}></Route>
                        <Route path={BLANK_SHIFT} element={<ShiftPageContainer/>}/>
                        <Route path={PREMIX_LIST} element={<Premixes/>}/>
                        <Route path={PRODUCT_CARD} element={<ProductCard/>}></Route>
                        <Route path={NEW_BLANK_SHIFT} element={<CreateNewShift/>}/>
                        <Route path={CHECK_LIST} element={<CheckListPage/>}/>
                        {/* <Route path={NO_MATCH_ROUTE} element={<Navigate to="/home"/>}/> */}
                        <Route path={ADD_PRODUCT} element={<NewProduct isDarkTheme={props.isDarkTheme}/>}/>
                        <Route path={STEP_2} element={<SecondStep isDarkTheme={props.isDarkTheme}/>}/>        
                        <Route path={CLAN_LISTS} element={<TeamPageContainer isDarkTheme={props.isDarkTheme}/>}/>
                        <Route path={NEW_CHECK_LIST} element={<NewCheckList/>}/>
                    </Routes>
                </div>
            )
        }
       
    }else{
        return (
            <>
                <Routes>
                {/* <Route path={HOME} element={<HomePage/>}></Route> */}
                <Route path={LOG_OUT} element={<LoginPage/>}></Route>
                <Route path={NO_MATCH_ROUTE} element={<Navigate to="/logOut"/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>
                </Routes>
            </>
        )
    }
    
})