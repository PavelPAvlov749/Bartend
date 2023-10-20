// Comoponents,Hooks
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Redux
import { getPassedShiftByID } from "../../../Redux/BlankShiftReducer";
// Styles
import "../../../Styles/PassedShift.css";
// Types
import { productType } from "../../../Redux/Types";
import { Global_state_type } from "../../../Redux/Store";


export const PassedShift = () => {
    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    // Get shiftID from URL
    const shiftID = useLocation().pathname.split("=")[1];
    
    // Fetch passed shift data by ID
    useEffect(() => {
        dispatch(getPassedShiftByID(shiftID));
    }, []); // Empty array of dependencies to run the effect only once

    // Get passedShift data from Redux store
    const PassedShift = useSelector(
        (state: Global_state_type) => state.blankShift.passedShift
    );


    return (
        <section className="container passed_shift_container translate_animation">
            {/* Go back link */}
            <h3 onClick={() => { navigate(-1) }}>Назад</h3>

            <table>
                {/* Display shift details */}
                <tr>Смена от : <td>{PassedShift?.date}</td></tr>
                <tr>Заготовщик :<td>{PassedShift?.employe}</td></tr>
                <tr>Сделано позиций : <td>{PassedShift?.products.length}</td></tr>
                {/* Display list of products */}
                {PassedShift?.products.map((el: productType) => {
                    return (
                        <tr>
                            <td>{el.name}</td>
                        </tr>
                    );
                })}
            </table>
        </section>
    );
};

