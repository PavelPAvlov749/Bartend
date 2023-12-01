import { useState } from "react"
import { checkListType, deleteChekListThunk } from "../../../Redux/CheckListReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from '../../../Assets/Styles/DotsMenu.module.css'


// DEFINE A PROPS TYPE
type ChecklistDotsMenu = {
    checklist: checkListType
}

export const ChecklistDotsMenu: React.FC<ChecklistDotsMenu> = (props) => {
    const navigate = useNavigate();
    // Toggle isWindowOpen 
    let [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch : any = useDispatch();
    // Opening window togggler function 
    function toggle() {
        setIsOpen(!isOpen);
    }

    // Delete checklist 
    function deleteCheklist() {
        // Delete
        dispatch(deleteChekListThunk(props.checklist.id));
        navigate(-1);
    }

    if (!isOpen) {
        // Render menu icon 
        return (
            <section className={styles.dotsMenu} onClick={toggle}>
                <li className={styles.dotsMenu__dot}></li>
                <li className={styles.dotsMenu__dot}></li>
                <li className={styles.dotsMenu__dot}></li>

            </section>
        )

    }
    else {
        // Opened menu
        return (
            <section className={styles.menuOptions}>
              
                <span onClick={deleteCheklist}>Delete</span>
                <span onClick={toggle}>Close</span>

            </section>
        )
    }
}