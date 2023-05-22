import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/mainPage.css"
import { useDispatch, useSelector } from "react-redux";
import { getProfileThunk, profileActions } from "../Redux/ProfileReducer";
import { Global_state_type } from "../Redux/Store";
import knowledgeIcon from "../Assets/icons8-books-90.png"
import checkListsIcon from "../Assets/icons8-document-90.png"
import premixesIcon from "../Assets/icons8-wine-100.png" 
import shelduleIcon from "../Assets/icons8-list-96.png"
import teamIcon from "../Assets/icons8-team-96.png"
import blankIcon from "../Assets/icons8-chemistry-100.png";


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
                <li className="blue">
                    <NavLink to="/check_lists">
                      
                        <span>Check-lists</span>
                    </NavLink>
                </li>
                <li className="orangered">
                    <NavLink to="/premixes">
                  
                        <span>Premixes</span>
                    </NavLink>
                </li>
                <li className="green">
                    <NavLink to={"/blank-shift"}>
                     
                        <span>Blank shift</span>
                    </NavLink>
                </li>
                <li className="violet">
                    <NavLink to="/Knowledge">
                  
                        <span>Knowledge Base</span>
                    </NavLink>
                </li>
                <li className="darkBlue">
                    <NavLink to="/check_lists">
                   
                        <span>Sheldule</span>
                    </NavLink>
                </li>
                <li className="orange">
                    <NavLink to="/team">
                 
                        <span>Team</span>
                    </NavLink>
                </li>
            </ul>
        </section>
    )
}