import React from "react";
import { NavLink } from "react-router-dom";
import home from "../Assets/icons8-homepage-96.png";
import list from "../Assets/icons8-list-96.png";
import add from "../Assets/icons8-add-90.png";
import logout from "../Assets/icons8-logout-64.png";
import doc from "../Assets/icons8-document-90.png"
import books from "../Assets/icons8-books-52(1).png"
import homeDark from "../Assets/icons8-home-page-96.png"
import logoutDark from "../Assets/icons8-logout-64 (1).png"
import docDark from "../Assets/icons8-document-96.png"
import booksDark from "../Assets/icons8-books-52.png"


import "../Styles/Navbar.css"
import { useDispatch } from "react-redux";
import { logOutThunk } from "../Redux/AppReducer";

export const Navbar = (props : {theme : boolean}) => {
    const dispatch : any = useDispatch()
    
    const logOut = () => {
        dispatch(logOutThunk())
    }
    return (
        <section className={props.theme ? "navbar_container Dark" : "navbar_container Light"}>
        <ul>
            
            <li>
                <NavLink className="nav" to="home">
                    <img src={props.theme ? home : homeDark} className="icon" alt=""/>
                    
                </NavLink>
            </li>
            <li>
                <NavLink className="nav" to="/premixes">
                    <img src={props.theme ? doc : docDark} className="icon" alt="" />
                    
           
                </NavLink>
            </li>
            <li>
                <NavLink className="nav" to="/premixes">
                    <img src={props.theme ? books : booksDark} className="icon" alt="" />
                    
               
                </NavLink>
            </li>
            <li>
            <NavLink onClick={logOut} className="nav" to="logOut">
                <img src={props.theme ? logout : logoutDark} className="icon" alt="" />
                
            
            </NavLink>
        </li>
        </ul>
    </section>
    )
}