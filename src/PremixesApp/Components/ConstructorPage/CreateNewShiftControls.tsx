import { useDispatch } from "react-redux";
import { productType, userPageType } from "../../../Redux/Types";
import { useNavigate } from "react-router-dom";
import { setCurrentShiftByCompanyID, blanksActions } from "../../../Redux/BlankShiftReducer";
// IMPORT ICONS AND STYLES
import "../../../Styles/BlamkShift.css"
import selectAll from "../../../Assets/icons8-checked-checkbox-100.png"
import clearAll from "../../../Assets/icons8-clear-100.png";
import startIcon from "../../../Assets/icons8-start-64.png"
import { useEffect, useReducer } from "react";
import { Reducer } from "../../Reducers/Reducer";

type shiftConstructorTopPControls = {
    products: productType[],
    user: userPageType
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
            <li onClick={() => { dispatch(blanksActions.selectAllItems()) }}>
                Select All
                <img className="icon" id={`selectAll`} src={selectAll} alt="" />
            </li>
            <li onClick={() => { dispatch(blanksActions.deselectAll()) }}>Clear All
                <img className="icon" id={`clear`} src={clearAll} alt="" />
            </li>
            <li onClick={createShift}>Start
                <img className="icon" src={startIcon} alt="" />
            </li>



        </ul>
    )
}