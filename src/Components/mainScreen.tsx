import { useNavigate } from "react-router-dom";
import styles from "../Assets/Styles/HomePage.module.css"
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";

import docIcon from "../Assets/Icons/icons8-document-64.png"
import teamicon from "../Assets/Icons/icons8-team-96.png"
import chemistryIcon from "../Assets/Icons/icons8-chemistry-100(1).png"

import documentIcon from "../Assets/Icons/icons8-document-90.png";





const MainPageNavigation = () => {
    const navigate = useNavigate()

    return (
        <section className="main_page_navigation">
            
            <ul className={styles.main_page_navigation}>
                <li id="ckecklist" className={styles.blue} onClick={() => { navigate("/check-lists") }}>

                    <a>Check - lists</a>

                    <img className="icon" src={docIcon} alt="" />

                </li>
                <li id="blank-shift" className={styles.green} onClick={() => { navigate("/shiftManager") }}>


                    <a>Prep Shift</a>
                    <img className="icon" src={chemistryIcon} alt="" />

                </li>

                <li id="sheldue" className={styles.darkBlue} onClick={() => { navigate("/premixes") }}>


                    <a>Recepie Cards</a>
                    <img className="icon" src={documentIcon} alt="" />

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

    return (
        <section className={`${styles.home_page_container} ${styles.translate_animation}`}>
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