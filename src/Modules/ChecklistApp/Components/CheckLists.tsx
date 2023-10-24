// React,Components,ReactHooks
import { NavLink, useNavigate } from "react-router-dom";
import { ItemList } from "./ChekListItem"
// CustomHooks
import { useChecklistList } from "./Hooks";
// Styles
import "../../../Assets/Styles/CheckLists.css"


export const CheckLists = () => {

    let checklists = useChecklistList();

    return (
        <section className="check_lists_container container page_apperas_animation">
            <div className="ckeck-lists-content">
                {checklists.length > 0 ?
                    <ItemList checkLists={checklists} />
                    :
                    <section className="check_lists_container__empty-check-list-container">
                        <h3>
                            Чек листов нет
                        </h3>
                        <NavLink to={"/new-check-list"}>Добавить</NavLink>
                    </section>
                }
            </div>

        </section>
    )
}