import React from "react";
import { NavLink } from "react-router-dom";
import home from "../Assets/icons8-home-96(1).png";
import list from "../Assets/icons8-list-96.png";
import add from "../Assets/icons8-add-90.png";
import logout from "../Assets/logout.png";
import "../Styles/Navbar.css"
import { useDispatch } from "react-redux";
import { logOutThunk } from "../Redux/AppReducer";

export const Navbar = () => {
    const dispatch : any = useDispatch()

    const logOut = () => {
        dispatch(logOutThunk())
    }
    return (
        <section className="navbar_container">
        <ul>
            
            <li>
                <NavLink className="nav" to="home">
                    <img src={home} alt=""/>
                    
               
                </NavLink>
            </li>
            <li>
                <NavLink className="nav" to="selectedList">
                    <img src={list} alt="" />
                    
           
                </NavLink>
            </li>
            <li>
                <NavLink className="nav" to="newProduct">
                    <img src={add} alt="" />
                    
               
                </NavLink>
            </li>
            <li>
            <NavLink onClick={logOut} className="nav" to="logOut">
                <img src={logout} alt="" />
                
            
            </NavLink>
        </li>
        </ul>
    </section>
    )
}