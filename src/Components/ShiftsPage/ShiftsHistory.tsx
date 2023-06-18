import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
import { blankShiftType } from "../../Redux/Types";
import  "../../Styles/BlamkShift.css"
import { getCurrentShiftByCompanyID,
         getShiftsHistoryByCompanyID } from "../../Redux/BlankShiftReducer";
import { NoOpenShiff } from "./NoOpenedShifts";



export const ShiftsHistory = () => {
    const dispatch: any = useDispatch()
    const companyID = useSelector((state: Global_state_type) => state.App.user.teamID)

    useEffect(() => {
        dispatch(getShiftsHistoryByCompanyID(companyID as string))
        dispatch(getCurrentShiftByCompanyID(companyID as string))
        }, [])
    
    const navigate = useNavigate()
    const onClickHandler = (id : string) => {
        navigate(`id=${id}`)
    }
    const blanks = useSelector((state: Global_state_type) => {
        return state.blankShift.closedShifts
    })
    const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    if (blanks  && blanks.length > 0) {
        return (
            <section className={`history_container translate_animation`}>
             
                {blanks.map((el: blankShiftType) => {

                    return (
                        <div key={el.shiftID} className={` container  ${isDarkTheme ? `passed_shift_containerDark` : `passed_shift_containerLight`}`}>
                            <span>Дата : {el.date}</span>
                            <span>Сотрудник : {el.employe}</span>
                            <span>Кол-во позиций : {el.count}</span>
                            <span id={`showMore`} onClick={() => {
                                onClickHandler(el.shiftID as string)
                            }}>Подробнее</span>
                        </div>
                    )
                })}
                </section>
        )
    } else {
        return (
          <NoOpenShiff/>
        )
    }

}
