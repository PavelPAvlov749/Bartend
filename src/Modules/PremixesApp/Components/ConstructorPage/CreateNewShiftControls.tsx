// REDUX
import { setCurrentShiftByCompanyID } from "../../../../Redux/BlankShiftReducer";
// TYPES
import { productType, userPageType } from "../../../../Redux/Types";
// React imports
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// IMPORT ICONS AND STYLES
import "../../../../Assets/Styles/BlamkShift.css"
import startIcon from "../../../../Assets/Icons/icons8-start-64.png"




type shiftConstructorTopPControls = {
    products: productType[],
    user: userPageType,
    dispatchProducts : any
}

/**
 *  Check is all items was selected 
 * @param products ArrayProductType
 * @returns boolean
 */

function checkSelection (products : productType[]) {
    let result = products.filter((el : productType) => el.checked == true);
    if (result.length > 0) {
        return true;
    }
    else 
    {
        return false;
    }
};


export const CreateNewShiftControls = (props: shiftConstructorTopPControls) => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    // Check if all items was selectrd or not
    let isAllSelected = checkSelection(props.products);
    // Create shift hanler ,get all data and creates new shift object and pass them into 
    // setCurrentShift thunk
    const createShift = () => {
        dispatch(setCurrentShiftByCompanyID(
            props.user.team as string,
            props.user.teamID as string,
            props.products,
            props.user.userName as string));

        navigate("/begin-blank-shift");

    }
    // Toggler fuction (comes from props)
    function toggleAll () {
        props.dispatchProducts({type : 'toggle-all'});
    }
    return (
        <ul className={`controls`}>
            <li 
                onClick={toggleAll}>
                {isAllSelected ? "Clear" : "Select all"}
            </li>
            <li onClick={createShift}>Start
                <img className="icon" src={startIcon} alt="" />
            </li>

        </ul>
    )
}