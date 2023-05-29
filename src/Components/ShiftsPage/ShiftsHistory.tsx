import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { NavLink, useNavigate } from "react-router-dom";
import { blankShiftType, productType } from "../../Redux/Types";
import styles from "../../Styles/BlamkShift.module.css";
import { getCurrentShiftByCompanyID, getShiftsHistoryByCompanyID } from "../../Redux/BlankShiftReducer";



export const ShiftsHistory = () => {
    const dispatch: any = useDispatch()
    const companyID = useSelector((state: Global_state_type) => state.App.user.teamID)
    const companyName = useSelector((state: Global_state_type) => state.App.user.userID)
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
    const [shiftType, setShiftType] = useState("current")
    if (blanks !== null && blanks.length > 0) {
        return (
            <section className={styles.history_container}>
             
                {blanks.map((el: blankShiftType) => {

                    return (
                        <div className={styles.single_blank_container}>
                            <span>Дата : {el.date}</span>
                            <span>Сотрудник : {el.employe}</span>
                            <span>Кол-во позиций : {el.count}</span>
                            <span id={styles.showMore} onClick={() => {
                                onClickHandler(el.shiftID as string)
                            }}>Подробнее</span>
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
                <h1>Нет открытых смен</h1>
                <NavLink className={styles.nav_link} to={"create-new"}>
                    Начать
                </NavLink>
            </section>
        )
    }

}
