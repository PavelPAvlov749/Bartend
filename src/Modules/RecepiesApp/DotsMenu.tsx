import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/RecepiesContainer.module.css";

export const DotsMenu: React.FC = () => {
    const navigate = useNavigate();
    // Toggle isWindowOpen 
    let [isOpen, setIsOpen] = useState<boolean>(false);
    // Opening window togggler function 
    function toggle() {
        setIsOpen(!isOpen);
    }

    if (!isOpen) {
        // Render menu icon 
        return (
            <section className={styles.dotsMenu} onClick={toggle}>
                <div className={styles.dotsMenu__dot}></div>
                <div className={styles.dotsMenu__dot}></div>
                <div className={styles.dotsMenu__dot}></div>
            </section>
        )

    }
    else {
        // Opened menu
        return (
            <section className={styles.menuOptions}>
                <span onClick={() => navigate('/add')}>Create new</span>
                <span onClick={() => navigate('/home')}>Go back</span>
                <span onClick={toggle}>Close</span>

            </section>
        )
    }
}