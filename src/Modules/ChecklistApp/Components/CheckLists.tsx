// React,Components,ReactHooks
import { NavLink } from "react-router-dom";
import { ItemList } from "./ChekListItem"
// CustomHooks
import { useChecklistList } from "./Hooks";
// Styles and Assets
import styles from "../Styles/CheckLists.module.css";
import notFound from "../../../Assets/Icons/nothing.png";

const CheckLists = () => {

    let checklists = useChecklistList();

    return (
        <section className={styles.check_lists_container}>
            <div className={styles.ckeck_lists_content}>
                {checklists.length > 0 ?
                    <ItemList checkLists={checklists} />
                    :
                    <section className={styles.check_lists_container__empty_check_list_container}>
                        <img className={styles.bigIcon} src={notFound} alt="" />
                        <h3>

                            There is no cheklists found
                        </h3>
                        <NavLink to={"/new-check-list"} className={styles.check_lists__create_btn}>Create</NavLink>
                    </section>
                }
            </div>

        </section>
    )
}

export default CheckLists