// React, custom hooks imports
import React, {  useReducer } from "react";
import { useDispatch } from "react-redux";
// Components 
import { ProgressBar } from "./ProgressBar";
import { IngridientList } from "./IngridientList";
import { EmptyShift } from "./EmtyShiftPage";
import { Reducer } from "./Reducer";
// Styles imports
import "../../../Styles/BlamkShift.css";
// Redux imports
import { closeCurrentShiftByCompanyID} from "../../../Redux/BlankShiftReducer";
// Type imports
import { blankShiftType, productType } from "../../../Redux/Types";

type currentShiftPropType = {
    products : productType[],
    shift : blankShiftType
}


export const CurrentShift = React.memo((props : currentShiftPropType) => {
    const dispatch: any = useDispatch();
    // Get current shift ibject by TeamID

    const [state, setState] = useReducer(Reducer, props.products)

    // End shift handler
    const endShift = function () {
        dispatch(closeCurrentShiftByCompanyID(props.shift));
    }

    if (props.shift.shiftID?.length as number > 1) {
        return (
            <section className={`current_shift_container translate_animation`}>

                <ProgressBar products={props.products}/>
                <IngridientList ingridients={props.products} setState={setState} />
                <button
                    className={'confirm_button'}
                    onClick={endShift}>Закончить смену
                </button>
            </section>
        )
    } else {
        // Render empty shift Component
        return (
            <EmptyShift />
        )
    }

})