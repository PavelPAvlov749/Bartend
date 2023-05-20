import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { NavLink, useNavigate } from "react-router-dom";
import selectAll from "../Assets/icons8-checked-checkbox-100.png"
import clearAll from "../Assets/icons8-clear-100.png";
import { blankShiftType, productType } from "../Redux/Types";
import startIcon from "../Assets/icons8-start-64.png"
import styles from "../Styles/BlamkShift.module.css"
import { blanksActions, getCurrentShiftByCompanyID, getPremixes, getShiftsHistoryByCompanyID, setCurrentShiftByCompanyID } from "../Redux/BlankShiftReducer";


export const ShiftsHistory = () => {
    const dispatch: any = useDispatch()
    const companyID = useSelector((state: Global_state_type) => state.App.userID)
    const companyName = useSelector((state: Global_state_type) => state.profile.companyName)
    useEffect(() => {
        dispatch(getShiftsHistoryByCompanyID(companyID as string))
        dispatch(getCurrentShiftByCompanyID(companyName as string))
    }, [])
    const blanks = useSelector((state: Global_state_type) => {
        return state.blankShift.closedShifts
    })
    const [shiftType, setShiftType] = useState("current")
    const currentShift = useSelector((state: Global_state_type) => state.blankShift.currentShift)
    if (blanks !== null && blanks.length > 0) {
        return (
            <section className={styles.blank_shift_container}>
                <div className={styles.shift_controls}>

                    <span onClick={() => { setShiftType("current") }} className={shiftType === "current" ? styles.active : styles.shiftBTN}>Current</span>
                    <span onClick={() => { setShiftType("history") }} className={shiftType === "history" ? styles.active : styles.shiftBTN}>History</span>
                </div>
                {shiftType === "history" ? blanks.map((el: blankShiftType) => {

                    return (
                        <div className={styles.single_blank_container}>
                            <span>Date : {el.date}</span>
                            <span>Employe : {el.employe}</span>
                            <span>Done : {el.count}</span>
                            <span>Was done : </span>
                            <br />
                            {el.products?.map((el: productType) => {
                                return (
                                    <div className={styles.single_product_from_done_shift}>
                                        <span>{el.name}</span>
                                    </div>
                                )
                            })}
                            <NavLink className={styles.nav_link} to={"create-new"}>
                                New
                            </NavLink>
                        </div>
                    )
                }) :
                    <section className={styles.current_shift_container}>
                        <div className={styles.progress_bar}>
                            <span>{currentShift?.products.length}</span>
                        </div>
                        {currentShift?.products.map((el: productType) => {
                            return (
                                <div className={styles.single_product}>
                                    <span>{el.name}</span>
                                </div>

                            )
                        })}
                    </section>}

            </section>
        )
    } else {
        return (
            <section className={styles.empty_shift_container}>
                <h1>No open shifts</h1>
                <NavLink className={styles.nav_link} to={"create-new"}>
                    New
                </NavLink>
            </section>
        )
    }

}

export const BlankShift = () => {
    const companyID = useSelector((state: Global_state_type) => state.profile.companyName)
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getPremixes(companyID as string))
    }, [])
    const navigate = useNavigate()
    const blanks = useSelector((state: Global_state_type) => state.blankShift.productList)
    const toggleSelecrted = (blank: productType) => {
        console.log(blank)
        if (!blank.checked) {
            dispatch(blanksActions.selectItem(blank.id))
        } else {
            dispatch(blanksActions.selectItem(blank.id))
        }
    }
    console.log(blanks)
    return (
        <section className={styles.blank_shift_container}>
            <div className={styles.controls}>

                <img id={styles.selectAll} src={selectAll} alt="" onClick={() => {
                    dispatch(blanksActions.selectAllItems())
                }} />
                <img id={styles.clear} src={clearAll} alt="" onClick={() => {
                    dispatch(blanksActions.deselectAll())
                }} />
                <img src={startIcon} alt="" onClick={() => {
                    let date = new Date()
                    let mm = date.getMonth()
                    let yy = date.getUTCFullYear()
                    let dd = date.getDay()

                    let shift = {
                        date: mm + "/" + dd + "/" + yy,
                        employe: "Pavlov",
                        products: blanks.filter((el: productType) => el.checked === true),
                        done: false,
                        count: blanks.filter((el: productType) => el.checked === true).length,
                        companyID: companyID as string
                    }
                    dispatch(setCurrentShiftByCompanyID(shift))
                    navigate("/begin-blank-shift")
                }} />
            </div>
            {blanks.map((el: productType) => {
                return (
                    <div key={el.id} className={el.checked ? styles.checked_element : styles.unchecked_element} onClick={() => { toggleSelecrted(el) }}>
                        <span>{el.name}</span>
                    </div>
                )
            })}
        </section>
    )
}


