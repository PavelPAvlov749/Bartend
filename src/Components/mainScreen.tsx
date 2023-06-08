import { NavLink, useNavigate } from "react-router-dom";
import styles from "../Styles/HomePage.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { ThemeSwitcher } from "./ThemeSwitcher";
import docIcon from "../Assets/icons8-document-64.png"
import { doc } from "firebase/firestore";
import teamicon from "../Assets/icons8-team-96.png"
import chemistryIcon from "../Assets/icons8-chemistry-100(1).png"
import sheldue from "../Assets/icons8-edit-96.png"
export const HomePage = () => {
    const profile = useSelector((state: Global_state_type) => {
        return state.App.user
    })
    const theme = useSelector((state: Global_state_type) => state.App.isDarktheme)
    const navigate = useNavigate()
    return (
        <section className={`${styles.home_page_container} ${styles.translate_animation}`}>
            <h2>Bartend</h2>
            <div className={styles.home_page_info}>
                <h1 id={styles.userName}>Hi,{profile.userName}!
                    <br />
                    <span>{profile.team ? profile.team : null}</span>
                </h1>
                <br />

           

            </div>
            <div className={styles.swithcer}>
                    <ThemeSwitcher theme={theme} />
                </div>
            <ul className={styles.main_page_navigation}>
                <li id="ckecklist" className={styles.blue} onClick={() => { navigate("/check-lists") }}>

                    <span>Чек-листы</span>
                    
                    <img className="icon" src={docIcon} alt="" />

                </li>
                <li id="blank-shift" className={styles.green} onClick={() => { navigate("/blank-shift") }}>


                    <span>Заготовки</span>
                    <img className="icon" src={chemistryIcon} alt="" />

                </li>

                <li id="sheldue" className={styles.darkBlue} onClick={() => { navigate("/check_lists") }}>


                    <span>График</span>
                    <img className="icon" src={sheldue} alt="" />

                </li>
                <li id="team" className={styles.orange} onClick={() => { navigate("/clan-list") }}>


                    <span>Команда</span>
                    <img className="icon" src={teamicon} alt="" />

                </li>
            </ul>
        </section>
    )
}