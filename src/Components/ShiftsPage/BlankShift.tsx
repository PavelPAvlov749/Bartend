import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { NavLink, useNavigate } from "react-router-dom";
import selectAll from "../../Assets/icons8-checked-checkbox-100.png"
import clearAll from "../../Assets/icons8-clear-100.png";
import { blankShiftType, productType } from "../../Redux/Types";
import startIcon from "../../Assets/icons8-start-64.png"
import styles from "../../Styles/BlamkShift.module.css"
import { blanksActions, getCurrentShiftByCompanyID, getPremixes, getShiftsHistoryByCompanyID, setCurrentShiftByCompanyID } from "../../Redux/BlankShiftReducer";
import { CurrentShift } from "./CurrentShift";
import { ShiftsHistory } from "./ShiftsHistory";
import { getFullDateString } from "../../Helpers/Helpers";




export const ShiftPageContainer = () => {
    const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    const [shiftType, setShiftType] = useState("current")
    return (
        <section className={styles.blank_shift_container}>
            <div className={styles.shift_controls}>

                <span onClick={() => { setShiftType("current") }} className={shiftType === "current" ? styles.active : styles.shiftBTN}>Текущая смена</span>
                <span onClick={() => { setShiftType("history") }} className={shiftType === "history" ? styles.active : styles.shiftBTN}>История</span>
                </div>
                {shiftType === "current" ? <CurrentShift/> : <ShiftsHistory/>}
        </section>
    )

}



export const CreateNewShift = () => {
    const user = useSelector((state: Global_state_type) => state.App.user)
    
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getPremixes(user.teamID as string))
    }, [])

    const navigate = useNavigate()
    // @ts-ignore
    const blanks = useSelector((state: Global_state_type) => state.blankShift.productList)
    let userName = useSelector((state : Global_state_type) => state.App.user.userName)
    const toggleSelecrted = (blank: productType) => {
        if (blank.checked) {
            dispatch(blanksActions.deselectItem(blank.id as string))
        } else {
            dispatch(blanksActions.selectItem(blank.id as string))
        }
    }
    const createShift = () =>{
        if(user.team){
            let shift = {
                date: getFullDateString(),
                employe: userName as string,
                products: blanks.filter((el: productType) => el.checked === true).map((el : productType) => {
                    return {...el,done : false}
                }),
                done: false,
                count: blanks.filter((el: productType) => el.checked === true).length,
                teamID: user.teamID as string,
                teamName : user.team
            }
            dispatch(setCurrentShiftByCompanyID(shift))
            navigate("/begin-blank-shift")
        }else{
            navigate("/clan-list")
        }
      
    }

    return (
        <section className={styles.blank_shift_blanks_container}>
            <div className={styles.controls}>

                <img id={styles.selectAll} src={selectAll} alt="" onClick={() => {
                    dispatch(blanksActions.selectAllItems())
                }} />
                <img id={styles.clear} src={clearAll} alt="" onClick={() => {
                    dispatch(blanksActions.deselectAll())
                }} />
                <img src={startIcon} alt="" onClick={createShift} />
            </div>
            {blanks.map((el: productType) => {
                return (
                    <div key={el.id} className={el.checked ? styles.checked_element : styles.unchecked_element} onClick={() => { toggleSelecrted(el) }}>
                        <span key={el.id}>{el.name}</span>
                    </div>
                )
            })}
        </section>
    )
}


