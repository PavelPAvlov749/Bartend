// React, custom hooks imports
import React, {  useReducer } from "react";
import { useDispatch } from "react-redux";
// Components 
import { ProgressBar } from "./ProgressBar";
import { IngridientList } from "./IngridientList";
import { EmptyShift } from "./EmtyShiftPage";

// Styles imports
import "../../../../Assets/Styles/BlamkShift.css";
import { blankShiftType, productType } from "../../../../Redux/Types";


// Redux imports
import { closeCurrentShiftByCompanyID } from "../../../../Redux/BlankShiftReducer";
import { Reducer } from "../../Reducers/constructorReducer";

type currentShiftPropType = {
    products : productType[],
    shift : blankShiftType
}


export const CurrentShift = React.memo((props : currentShiftPropType) => {
    const dispatch: any = useDispatch();
    // Get current shift ibject by TeamID
    console.log(props.products);
    const [state, setState] = useReducer(Reducer, props.products as unknown as productType[])

    // End shift handler
    const endShift = function () {
        dispatch(closeCurrentShiftByCompanyID(props.shift));
    }
    if (props.shift.shiftID?.length as number > 1) {
        return (
            <section className={`current_shift_container translate_animation`}>

                <ProgressBar products={state}/>
                <IngridientList ingridients={state} setState={setState} />
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