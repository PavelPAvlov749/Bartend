// Iport Rweact and Components
import { useNavigate } from "react-router-dom";
import { ShiftPreview } from "./ShiftPreview";
// Redux imports and types
import { blankShiftType } from "../../../Redux/Types";

// Styles imports 
import "../../../Styles/BlamkShift.css"



export const ShiftsHistory = (props : { shifts : blankShiftType[]}) => {
    const navigate = useNavigate()
    // Navigate to specified shift in history by id
    const onClickHandler = (id: string) => {
        navigate(`id=${id}`)
    }

    if (props.shifts.length > 0) {
        return (
            <section className={`history_container translate_animation`}>

                {props.shifts.map((el: blankShiftType) => {
                    return (
                        <ShiftPreview 
                        date={el.date} 
                        employee={el.employe} 
                        count={el.count} 
                        onClickHandler={onClickHandler} 
                        shiftID={el.shiftID} />
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
