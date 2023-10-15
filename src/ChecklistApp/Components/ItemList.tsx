// React,hooks
import { NavLink, useNavigate } from "react-router-dom"
// Types
import { checkListType } from "../../Redux/CheckListReducer"


export const ItemList = (props: { checkLists: checkListType[] }) => {
    const navigate = useNavigate();

    const onClickHandler = function () {
        // navigate by click
        navigate("/new-check-list");
    }
    return (
        <div className="single_check_list container">
            <ul>
            {props.checkLists.map((el: checkListType) => {
                return (
                    <li>
                        <NavLink key={el.id} to={`/check-lists/id=${el.id}`}>
                            {el.name}
                        </NavLink>
                    </li>
                )
            })}
            </ul>
            {/* If there is no existing cheklists propose to create */}
            <button className="confirm_button" 
            onClick={onClickHandler}>Добавить</button>
        </div >
    )
}