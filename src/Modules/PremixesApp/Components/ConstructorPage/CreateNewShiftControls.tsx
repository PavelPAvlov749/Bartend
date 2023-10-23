// REDUX
import { setCurrentShiftByCompanyID } from "../../../../Redux/BlankShiftReducer";
// TYPES
import { productType, userPageType } from "../../../../Redux/Types";
// React imports
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// IMPORT ICONS AND STYLES
import "../../../../Assets/Styles/BlamkShift.css"
import selectAll from "../../../../Assets/Icons/icons8-checked-checkbox-100.png"
import clearAll from "../../../../Assets/Icons/icons8-clear-100.png";
import startIcon from "../../../../Assets/Icons/icons8-start-64.png"




type shiftConstructorTopPControls = {
    products: productType[],
    user: userPageType,
    dispatchProducts : any
}


export const CreateNewShiftControls = (props: shiftConstructorTopPControls) => {
    const navigate = useNavigate()
    const dispatch: any = useDispatch()


    const createShift = () => {

        dispatch(setCurrentShiftByCompanyID(
            props.user.team as string,
            props.user.teamID as string,
            props.products,
            props.user.userName as string));

        navigate("/begin-blank-shift");

    }
    return (
        <ul className={`controls`}>
            <li onClick={() => { props.dispatchProducts({type : 'select-all'})}}>
                Select All
                <img className="icon" id={`selectAll`} src={selectAll} alt="" />
            </li>
            <li onClick={() => props.dispatchProducts({type : 'deselect-all'})}>Clear All
                <img className="icon" id={`clear`} src={clearAll} alt="" />
            </li>
            <li onClick={createShift}>Start
                <img className="icon" src={startIcon} alt="" />
            </li>

        </ul>
    )
}