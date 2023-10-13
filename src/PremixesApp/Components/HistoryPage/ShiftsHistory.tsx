// Iport Rweact and Components
import react from "react";
import { useNavigate } from "react-router-dom";
import { ShiftPreview } from "./ShiftPreview";
// Redux imports and types
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../../Redux/Store";
import { blankShiftType } from "../../../Redux/Types";
import {
    getCurrentShiftByCompanyID,
    getShiftsHistoryByCompanyID
} from "../../../Redux/BlankShiftReducer";


// Styles imports 
import "../../../Styles/BlamkShift.css"



export const ShiftsHistory = () => {
    const dispatch: any = useDispatch()
    const companyID = useSelector((state: Global_state_type) => state.App.user.teamID)

    react.useEffect(() => {
        dispatch(getShiftsHistoryByCompanyID(companyID as string))
        dispatch(getCurrentShiftByCompanyID(companyID as string))
    }, [])

    const navigate = useNavigate()
    const onClickHandler = (id: string) => {
        navigate(`id=${id}`)
    }
    const blanks = useSelector((state: Global_state_type) => {
        return state.blankShift.closedShifts
    })

    if (blanks && blanks.length > 0) {
        return (
            <section className={`history_container translate_animation`}>

                {blanks.map((el: blankShiftType) => {
                    return (
                        <ShiftPreview date={el.date} employee={el.employe} count={el.count} onClickHandler={onClickHandler} shiftID={el.shiftID} />

                    )
                })}
            </section>
        )
    } else {
        return (
            <div id="empty_history">История смен пуста</div>
        )
    }

}
