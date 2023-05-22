import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { NavLink } from "react-router-dom";
import { blankShiftType, productType } from "../../Redux/Types";
import styles from "../../Styles/BlamkShift.module.css";
import { getCurrentShiftByCompanyID, getShiftsHistoryByCompanyID } from "../../Redux/BlankShiftReducer";



export const ShiftsHistory = () => {
    const dispatch: any = useDispatch()
    const companyID = useSelector((state: Global_state_type) => state.App.userID)
    const companyName = useSelector((state: Global_state_type) => state.App.userID)
    useEffect(() => {
        dispatch(getShiftsHistoryByCompanyID(companyID as string))
        dispatch(getCurrentShiftByCompanyID(companyName as string))
    }, [])
    
    const blanks = useSelector((state: Global_state_type) => {
        return state.blankShift.closedShifts
    })
    const [shiftType, setShiftType] = useState("current")
    if (blanks !== null && blanks.length > 0) {
        return (
            <section className={styles.history_container}>
             
                {blanks.map((el: blankShiftType) => {

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
                })}
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
