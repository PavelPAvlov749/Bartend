// Components
import { CurrentShift } from "../CurrentShiftPage/CurrentShift";
import { ShiftsHistory } from "../HistoryPage/ShiftsHistory";

// React hooks 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux state and thunks
import {
    getShiftsHistoryByCompanyID
} from "../../../Redux/BlankShiftReducer";

// Custom Hooks
import { useProducts } from "../CurrentShiftPage/useProducts";
import { useNavbar } from "./UseNabar";

// Types
import { Global_state_type } from "../../../Redux/Store";






// Main BlankShiftManager component
// Container component that receives data for 
// the components current Shift (Object of the current shift) 
// and shiftHistory (Object displaying the history of closed shifts)

export const MainPage = () => {
    const dispatch: any = useDispatch();
    // Get TeamID from global state to fetch current blank shift data
    let companyID = useSelector((state: Global_state_type) => state.App.user.teamID);
    // Get an array of closed shits for <ShiftHistoy> component
    let shifts = useSelector((state : Global_state_type) => state.blankShift.closedShifts);
    // -------  
    // Get shift object fro global state to pass him into <CyrrentShift> Component
    //  
    // This function need to bi fixed (Deed to add fucntion thah will clodse current shift only by ID)
    // -------
    let shift = useSelector((state: Global_state_type) => state.blankShift.currentShift);

    useEffect(() => {
        dispatch(getShiftsHistoryByCompanyID(companyID as string))
    }, []);
    // Get an aray of premixes objects from hook
    let products = useProducts(companyID as string);

    //Get a tuple from the navbar component and the current state of the currentShift variable
    const [Navbar, shiftType] = useNavbar();

    return (
        <section className={`blank_shift_container translate_animation`}>
            {Navbar}
            {/* Depending on the shift type, we display the corresponding component */}
            {shiftType === 0 ? <CurrentShift products={products} shift={shift} /> : <ShiftsHistory shifts={shifts}/>}
        </section>
    );
}

