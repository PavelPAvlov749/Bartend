// React
import { NavLink } from "react-router-dom";

// Assets
import home from "../Assets/Icons/icons8-homepage-96.png";
import logout from "../Assets/Icons/icons8-logout-64.png";
import doc from "../Assets/Icons/icons8-document-90.png"
import books from "../Assets/Icons/icons8-books-52(1).png"
import homeDark from "../Assets/Icons/icons8-home-page-96.png"
import logoutDark from "../Assets/Icons/icons8-logout-64 (1).png"
import docDark from "../Assets/Icons/icons8-document-96.png"
import booksDark from "../Assets/Icons/icons8-books-52.png"
import search from "../Assets/Icons/icons8-search-100.png"
// Styles
import "../Assets/Styles/Navbar.css"

// Redux,ThunkActions
import { useDispatch } from "react-redux";
import { logOutThunk } from "../Redux/AppReducer";



// --------------------------------
// 
// Navbar Component : Render links with Routes Defined at Router Module
// 
// --------------------------------
const Navbar = (props: { theme: boolean }) => {
    const dispatch: any = useDispatch()
    
    // Logout button
    const logOut = () => {
        dispatch(logOutThunk())
    }
    return (
        <section className={props.theme ? "navbar_container Dark" : "navbar_container Light"}>
            <ul>
                <li key={"home"} className="navbar-container__item">
                    <NavLink className="nav" to="home">
                        <img src={props.theme ? home : homeDark} className="icon" alt="" />

                    </NavLink>
                    <span>Home</span>
                </li>
                <li key="premixes" className="navbar-container__item">
                    <NavLink className="nav" to="/knowledge-base">
                        <img src={search} className="icon" alt="" />
                    </NavLink>
                    <span>Search</span>
                </li>
                <li key="knowledge_base" className="navbar-container__item">
                    <NavLink className="nav" to="/textbook">
                        <img src={props.theme ? books : booksDark} className="icon" alt="" />
                    </NavLink>
                    <span>Textbook</span>
                </li>
                <li key="logOut" className="navbar-container__item">
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