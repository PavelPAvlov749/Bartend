// React
import { NavLink } from "react-router-dom";

// Assets
import home from "../../Assets/Icons/icons8-homepage-96.png";
import logout from "../../Assets/Icons/icons8-logout-64.png";
import books from "../../Assets/Icons/icons8-books-52(1).png"
import search from "../../Assets/Icons/icons8-search-100.png"
// Styles
import styles from "./navbar.module.css";

// Redux,ThunkActions
import { useDispatch } from "react-redux";
import { logOutThunk } from "../../Redux/AppReducer";



// --------------------------------
// 
// Navbar Component : Render links with Routes Defined at Router Module
// 
// --------------------------------
const Navbar = () => {
    const dispatch: any = useDispatch()
    
    // Logout button
    const logOut = () => {
        dispatch(logOutThunk())
    }
    return (
        <section className={styles.navbar_container}>
            <ul>
                <li key={"home"} className={styles.navbar_container__item}>
                    <NavLink className={styles.nav} to="home">
                        <img src={home} className={styles.icon} alt="" />
                        <span>Home</span>
                    </NavLink>
              
                </li>
                <li key="premixes" className={styles.navbar_container__item}>
                    <NavLink className={styles.nav} to="/knowledge-base">
                        <img src={search} className={styles.icon} alt="" />
                        <span>Search</span>
                    </NavLink>
               
                </li>
                <li key="knowledge_base" className={styles.navbar_container__item}>
                    <NavLink className={styles.nav} to="/textbook">
                        <img src={books} className={styles.icon} alt="" />
                        <span>Textbook</span>
                    </NavLink>
      
                </li>
                <li key="logOut" className={styles.navbar_container__item}>
                    <NavLink onClick={logOut} className={styles.nav} to="logOut">
                        <img src={logout} className={styles.icon} alt="" />
                        <span>LogOut</span>
                    </NavLink>

                </li>
            </ul>
        </section>
    )
}

export default Navbar;