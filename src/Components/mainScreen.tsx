import { useNavigate } from "react-router-dom";
import styles from "../Assets/Styles/HomePage.module.css"
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { ThemeSwitcher } from "./ThemeSwitcher";
import docIcon from "../Assets/Icons/icons8-document-64.png"
import teamicon from "../Assets/Icons/icons8-team-96.png"
import chemistryIcon from "../Assets/Icons/icons8-chemistry-100(1).png"
import sheldue from "../Assets/Icons/icons8-edit-96.png"
import { useWindowInnerWidth } from "../Helpers/CustomHooks";

export const Header = () => {
    const navigate = useNavigate()
    const theme = useSelector((state: Global_state_type) => state.App.isDarktheme)

    return (
        <section className="header">
            <ul className={styles.main_page_navigation}>
                <li id="ckecklist" className={styles.blue} onClick={() => { navigate("/check-lists") }}>

                    <a>Check - lists</a>

                    <img className="icon" src={docIcon} alt="" />

                </li>
                <li id="blank-shift" className={styles.green} onClick={() => { navigate("/shiftManager") }}>


                    <a>Premixes</a>
                    <img className="icon" src={chemistryIcon} alt="" />

                </li>

                <li id="sheldue" className={styles.darkBlue} onClick={() => { navigate("/check_lists") }}>


                    <a>Sheldue</a>
                    <img className="icon" src={sheldue} alt="" />

                </li>
                <li id="team" className={styles.orange} onClick={() => { navigate("/clan-list") }}>


                    <a>Team</a>
                    <img className="icon" src={teamicon} alt="" />

                </li>

            </ul>
            <div className={styles.swithcer}>
                <ThemeSwitcher theme={theme} />
            </div>
        </section>


    )
}

const MainPageNavigation = () => {
    const navigate = useNavigate()
    const theme = useSelector((state: Global_state_type) => state.App.isDarktheme)
    return (
        <section className="main_page_navigation">
             <div className={styles.swithcer}>
                <ThemeSwitcher theme={theme} />
            </div>
            <ul className={styles.main_page_navigation}>
                <li id="ckecklist" className={styles.blue} onClick={() => { navigate("/check-lists") }}>

                    <a>Check - lists</a>

                    <img className="icon" src={docIcon} alt="" />

                </li>
                <li id="blank-shift" className={styles.green} onClick={() => { navigate("/shiftManager") }}>


                    <a>Premixes</a>
                    <img className="icon" src={chemistryIcon} alt="" />

                </li>

                <li id="sheldue" className={styles.darkBlue} onClick={() => { navigate("/check_lists") }}>


                    <a>Sheldue</a>
                    <img className="icon" src={sheldue} alt="" />

                </li>
                <li id="team" className={styles.orange} onClick={() => { navigate("/clan-list") }}>


                    <a>Team</a>
                    <img className="icon" src={teamicon} alt="" />

                </li>

            </ul>
        </section>
    )
}

export const HomePage = () => {
    const profile = useSelector((state: Global_state_type) => {
        return state.App.user
    })

    const windowWidth = useWindowInnerWidth()
    return (
        <section className={`${styles.home_page_container} ${styles.translate_animation}`}>
            <h2>Bartend</h2>
            <div className={styles.home_page_info}>
                <h1 id={styles.userName}>Hi,{profile.userName}!

                </h1>
                <span>{profile.team ? profile.team : null}</span>
                <br />



            </div>
            <MainPageNavigation /> 


        </section>
    )
}