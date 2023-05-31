import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Styles/HomePage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { ThemeSwitcher } from "./ThemeSwitcher";



export const HomePage = () => {
    const profile = useSelector((state: Global_state_type) => {
        return state.App.user
    })
    const theme = useSelector((state: Global_state_type) => state.App.isDarktheme)
    const navigate = useNavigate()
    return (
        <section className={styles.home_page_container}>
            <div className={styles.home_page_info}>
                <h1 id={styles.userName}>Hi,{profile.userName}!
                    <br />
                    <span>{profile.team ? profile.team : null}</span>
                </h1>
                <br />

                <div className={styles.swithcer}>
                    <ThemeSwitcher theme={theme} />
                </div>

            </div>

            <ul className={styles.main_page_navigation}>
                <li id="ckecklist" className={styles.blue} onClick={() => { navigate("/check-lists") }}>

                    <span>Чек-листы</span>

                </li>
                <li id="blank-shift" className={styles.green} onClick={() => { navigate("/blank-shift") }}>


                    <span>Заготовки</span>

                </li>

                <li id="sheldue" className={styles.darkBlue} onClick={() => { navigate("/check_lists") }}>


                    <span>График</span>

                </li>
                <li id="team" className={styles.orange} onClick={() => { navigate("/clan-list") }}>


                    <span>Команда</span>

                </li>
            </ul>
        </section>
    )
}