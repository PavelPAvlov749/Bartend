// React,ReactHooks
import { Dispatch } from "react"
import { useLocation, useNavigate } from "react-router-dom";
// Redux,Reducers
import { deleteProductCrad } from "../../Redux/ProductReduxer";
import { UseToggle } from "../../Helpers/CustomHooks";
import { useDispatch } from "react-redux";
// Types
import { productType } from "../../Redux/Types";
import { premixAPI } from "../../services/Firebase/PremixAPI";


// PROPS TYPE
// --------------
type DotsMenuPropsType = {
    setEditMode: Dispatch<{ type: string, payload: any }>,              //EditMode toggler
    isEditMode: boolean,
    card: productType                                                  //Prdouct data
}
// --------------



/**
 * DOTS   MENU COMPONENT : 
 * 
 * Contains isEditMode toggling function and delete product card
 * 
 * @param props DotsMenuPropsType {Dispatch,isEditMode,card}
 * @returns React.Ellement
 */
export const DotsMenu = (props: DotsMenuPropsType) => {

    // Get boolean state and toggler function from hook
    // If isOpen === true render menu with containig items anotherwise
    // Render three dots menu icon
    let [isOpen, toggle] = UseToggle(false);

    // Ge id of prdocut card
    const productID = useLocation().pathname.split("=")[1]

    // Navigate function
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

    // Delete button handller
    function deleteProduct() {
        dispatch(deleteProductCrad(productID));
        navigate("/premixes");
    }

    // Eidt mode toggler
    function setEditMode() {
        props.setEditMode({ type: "toggleEditMode", payload: undefined }); //FIX THIS `UNDEFINED` LATER
        toggle();
    }
    // SaveChanges handler 
    function saveChanges () {
        premixAPI.updatePrdocurCard(props.card);
        props.setEditMode({type : 'toggleEditMode',payload : undefined});
        toggle();
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
    else {
        return (
            <section className="menu-options">
                {props.isEditMode && <span className="save-changes" onClick={saveChanges}>{"Save changes"}</span>}
                <span onClick={setEditMode}>{props.isEditMode ? "Cancel Editing" : "Edit"}</span>
                <span onClick={deleteProduct}>Delete</span>
                <span onClick={toggle}>Close</span>

            </section>
        )
    }

}
