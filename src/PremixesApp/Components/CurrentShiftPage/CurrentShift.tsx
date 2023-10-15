// React, custom hooks imports
import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components 
import { ProgressBar } from "./ProgressBar";
import { IngridientList } from "./IngridientList";
import { NoOpenShiff } from "./EmtyShiftPage";
import { Reducer } from "./Reducer";
import { useProducts } from "./useProducts";
// Styles imports
import "../../../Styles/BlamkShift.css";
// Redux imports
import { closeCurrentShiftByCompanyID, getCurrentShiftByCompanyID } from "../../../Redux/BlankShiftReducer";
// Type imports
import { Global_state_type } from "../../../Redux/Store";


export const CurrentShift = React.memo(() => {
    const dispatch: any = useDispatch();
    // Get current shift ibject by TeamID
    const teamID = useSelector((state: Global_state_type) => state.App.user.teamID)

    // Get current shift data if there is no opened shifts we get empty shift object as a result
    useEffect(() => {
        dispatch(getCurrentShiftByCompanyID(teamID as string))
    }, []);
    // Get data from redux
    let curentShift = useSelector((state: Global_state_type) => state.blankShift.currentShift)

    // Get products by useProductsHook 
    let products = useProducts();

    // UseReducer to ProgressBar and IngridintsItems states
    const [state, setState] = useReducer(Reducer, products)

    // End shift handler
    const endShift = function () {
        dispatch(closeCurrentShiftByCompanyID(curentShift));
    }

    if (curentShift.shiftID?.length as number > 1) {
        return (
            <section className={`current_shift_container translate_animation`}>

                <ProgressBar products={state} />
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
            <NoOpenShiff />
        )
    }

})