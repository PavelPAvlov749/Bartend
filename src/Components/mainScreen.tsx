import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/mainPage.css"
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk, profileActions } from "../Redux/ProfileReducer";
import { Global_state_type } from "../Redux/Store";



export const HomePage = () => {
    const dispatch : any = useDispatch()
    useEffect(() => {
        dispatch(getProfileThunk())
    },[])
    const profile = useSelector((state : Global_state_type) => {
        return state.profile
    })

    return (
        <section className="home_page_container">
            <div className="home_page_info">
            <img src={profile.avatar} className="company_logo" alt="" />
            <h1>{profile.companyName}</h1>
            </div>
         
            <ul className="main_page_navigation">
                <li id="ckecklist" className="blue">
                    <NavLink to="/check-lists">
                      
                        <span>Чек-листы</span>
                    </NavLink>
                </li>
                <li id="premixes" className="orangered">
                    <NavLink to="/premixes">
                  
                        <span>Тех.Карты</span>
                    </NavLink>
                </li>
                <li id="blank-shift" className="green">
                    <NavLink to={"/blank-shift"}>
                     
                        <span>Заготовки</span>
                    </NavLink>
                </li>
                <li id="knowledge" className="violet">
                    <NavLink to="/Knowledge">
                  
                        <span>База знаний</span>
                    </NavLink>
                </li>
                <li id="sheldue" className="darkBlue">
                    <NavLink to="/check_lists">
                   
                        <span>График</span>
                    </NavLink>
                </li>
                <li id="team" className="orange">
                    <NavLink to="/clan-list">
                 
                        <span>Команда</span>
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}