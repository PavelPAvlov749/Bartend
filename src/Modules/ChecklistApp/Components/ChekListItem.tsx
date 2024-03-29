// React,hooks
import { NavLink, useNavigate } from "react-router-dom"
// Types
import { checkListType } from "../../../Redux/CheckListReducer"
import { CheckListPreview } from "../CheckListPreview";
// Styles
import styles from "../Styles/CheckLists.module.css";

export const ItemList = (props: { checkLists: checkListType[] }) => {
    const navigate = useNavigate();

    const onClickHandler = function () {
        // navigate by click
        navigate("/new-check-list");
    }
    return (
        <div className={styles.single_check_list}>
            <ul className={styles.checklis_list}>
            {props.checkLists.map((el: checkListType) => {
                return (
                    <CheckListPreview name={el.name} tasks={el.tasks} id={el.id}/>
                )
            })}
            </ul>
            {/* If there is no existing cheklists propose to create */}
            <button className="confirm_button" 
            onClick={onClickHandler}>Add new</button>
        </div >
    )
}