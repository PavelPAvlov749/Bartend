import { Dispatch, useState } from "react"
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProductCrad } from "../../Redux/ProductReduxer";
import { UseToggle } from "../../Helpers/CustomHooks";

type DotsMenuPropsType = {
    setEditMode : Dispatch<{type : string,payload : any}>,
    isEditMode : boolean    
}

export const DotsMenu = (props : DotsMenuPropsType) => {
    // Get boolean state and toggler function from hook
    let [isOpen,toggle] = UseToggle(false);
    // Ge id of prdocut card
    const productID = useLocation().pathname.split("=")[1]
    // Navigate function
    const navigate = useNavigate();
    const dispatch : any = useDispatch();

    function deleteProduct () {
        dispatch(deleteProductCrad(productID));
        navigate(-1);
    }
    function setEditMode () {
        props.setEditMode({type : "toggleEditMode",payload : undefined})
    }
    if (!isOpen) {
        return (
            <section className="dots-menu" onClick={toggle}>
                <li className="dots-menu__dot"></li>
                <li className="dots-menu__dot"></li>
                <li className="dots-menu__dot"></li>

            </section>
        )

    }
    else
    {
        return (
            <section className="menu-options">
                <span onClick={setEditMode}>{props.isEditMode ? "Cancel Editing" : "Edit"}</span>
                <span onClick={deleteProduct}>Delete</span>
                <span onClick={toggle}>Close</span>
            </section>  
        )
    }

}
