import { Dispatch, useState } from "react"
import { checkListType, deleteChekListThunk } from "../../../Redux/CheckListReducer";
import { CheckListsAPI } from "../../../services/Firebase/CkeckListsAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



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
            <section className="dots-menu" onClick={toggle}>
                <li className="dots-menu__dot"></li>
                <li className="dots-menu__dot"></li>
                <li className="dots-menu__dot"></li>

            </section>
        )

    }
    else {
        // Opened menu
        return (
            <section className="menu-options">
              
                <span onClick={deleteCheklist}>Delete</span>
                <span onClick={toggle}>Close</span>

            </section>
        )
    }
}