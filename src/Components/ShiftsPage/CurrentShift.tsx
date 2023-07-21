import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import "../../Styles/BlamkShift.css";
import { productType } from "../../Redux/Types";
import { closeCurrentShiftByCompanyID, getCurrentShiftByCompanyID } from "../../Redux/BlankShiftReducer";
import { NoOpenShiff } from "./EmtyShiftPage";
import { IngridientList } from "./IngridientList";
import { ProgressBar } from "./ProgressBar";


export const CurrentShift = () => {
    const dispatch: any = useDispatch()
    // Get current shift ibject by TeamID
    const teamID = useSelector((state: Global_state_type) => state.App.user.teamID)
    useEffect(() => {
        dispatch(getCurrentShiftByCompanyID(teamID as string))
    }, [])

    let products = useSelector((state: Global_state_type) => state.blankShift.currentShift?.products)
    let curentShift = useSelector((state: Global_state_type) => state.blankShift.currentShift)

    // Here we get the percentage and number of finished ingredients for the progress bar
    const readyProducts = products?.filter((el: productType) => el.done === true)
    let percent = products ? 100 / products.length * Number(products.filter((el: productType) => el.done === true).length.toFixed(1)) : 0


    if(curentShift.shiftID?.length as number > 1) {
        return (
            <section className={`current_shift_container translate_animation`}>
            {/* FIX THIS TS IGNORE LATER !!!!!!!!!!!!!!!!!!!!!! */}
            {/* @ts-ignore */}
            <ProgressBar percent={percent} absoluteFullCount={products.length} absolureReadyCount={readyProducts.length} />

            <IngridientList ingridients={products} />
            {percent !== 100 && products.length > 0? null :
                <button className={'confirm_button'} onClick={() => { dispatch(closeCurrentShiftByCompanyID(curentShift)) }}>Закончить смену</button>}
        </section> 
        )
    }else{
        return (
            <NoOpenShiff/>
        )
    }
   
}