// React,Components,ReactHooks
import { NavLink, useNavigate } from "react-router-dom";
import { ItemList } from "./ChekListItem"
// CustomHooks
import { useChecklistList } from "./Hooks";
// Styles and Assets
import "../../../Assets/Styles/CheckLists.css"
import notFound from "../../../Assets/Icons/nothing.png";

export const CheckLists = () => {

    let checklists = useChecklistList();

    return (
        <section className="check_lists_container container page_apperas_animation">
            <div className="ckeck-lists-content">
                {checklists.length > 0 ?
                    <ItemList checkLists={checklists} />
                    :
                    <section className="check_lists_container__empty-check-list-container">
                         <img className="bigIcon" src={notFound} alt="" />
                        <h3>
                           
                            There is no cheklists found
                        </h3>
                        <NavLink to={"/new-check-list"}className={"check_lists__create-btn"}>Create</NavLink>
                    </section>
                }
            </div>

        </section>
    )
}