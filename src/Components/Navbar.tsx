import { NavLink } from "react-router-dom";
import home from "../Assets/Icons/icons8-homepage-96.png";
import logout from "../Assets/Icons/icons8-logout-64.png";
import doc from "../Assets/Icons/icons8-document-90.png"
import books from "../Assets/Icons/icons8-books-52(1).png"
import homeDark from "../Assets/Icons/icons8-home-page-96.png"
import logoutDark from "../Assets/Icons/icons8-logout-64 (1).png"
import docDark from "../Assets/Icons/icons8-document-96.png"
import booksDark from "../Assets/Icons/icons8-books-52.png"


import "../Assets/Styles/Navbar.css"
import { useDispatch } from "react-redux";
import { logOutThunk } from "../Redux/AppReducer";

const Navbar = (props: { theme: boolean }) => {
    const dispatch: any = useDispatch()

    const logOut = () => {
        dispatch(logOutThunk())
    }
    return (
        <section className={props.theme ? "navbar_container Dark" : "navbar_container Light"}>
            <ul>

                <li className="navbar-container__item">
                    <NavLink className="nav" to="home">
                        <img src={props.theme ? home : homeDark} className="icon" alt="" />

                    </NavLink>
                    <span>Home</span>
                </li>
                <li className="navbar-container__item">
                    <NavLink className="nav" to="/premixes">
                        <img src={props.theme ? doc : docDark} className="icon" alt="" />
                    </NavLink>
                    <span>Premixes</span>
                </li>
                <li className="navbar-container__item">
                    <NavLink className="nav" to="/knowledge-base">
                        <img src={props.theme ? books : booksDark} className="icon" alt="" />
                    </NavLink>
                    <span>Knowledge</span>
                </li>
                <li className="navbar-container__item">
                    <NavLink onClick={logOut} className="nav" to="logOut">
                        <img src={props.theme ? logout : logoutDark} className="icon" alt="" />
                    </NavLink>
                    <span>LogOut</span>
                </li>
            </ul>
        </section>
    )
}

export default Navbar;