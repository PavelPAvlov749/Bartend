import React, { useEffect } from "react";
import styles from "../../Styles/PassedShift.module.css"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { getPassedShiftByID } from "../../Redux/BlankShiftReducer";
import { productType } from "../../Redux/Types";

export const PassedShift = () => {
    const shiftID = useLocation().pathname.split("=")[1]
    const dispatch : any = useDispatch()
    useEffect(() => {
        dispatch(getPassedShiftByID(shiftID))
    },[])
    const PassedShift = useSelector((state : Global_state_type) => state.blankShift.passedShift)

    return (
        <section className={styles.passed_shift_container}>
            <span>{"Смена от : " + PassedShift?.date}</span>
            <span>{"Заготовщик : " + PassedShift?.employe}</span>
            <span>{"Сделано позиций : " + PassedShift?.count}</span>
            <span>Список позиций : </span>
            <ul>
            {PassedShift?.products.map((el : productType) => {
                return (
                    <li id={el.id}>
                        <span>{el.name}</span>
                    </li>
                )
            })}
            </ul>
          
        </section>
    )
}