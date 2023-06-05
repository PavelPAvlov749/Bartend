import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import styles from "../../Styles/BlamkShift.module.css";
import { blankShiftType, productType } from "../../Redux/Types";
import { blanksActions, closeCurrentShiftByCompanyID, getCurrentShiftByCompanyID } from "../../Redux/BlankShiftReducer";
import loader from "../../Assets/icons8-jigger-64.png";
import { NavLink } from "react-router-dom";


export const CurrentShift = () => {
    const dispatch: any = useDispatch()
    let products = useSelector((state: Global_state_type) => state.blankShift.currentShift?.products)
    let curentShift = useSelector((state: Global_state_type) => state.blankShift.currentShift)
    const readyProducts = products?.filter((el: productType) => el.done === true)
    const teamID = useSelector((state: Global_state_type) => state.App.user.teamID)
    useEffect(() => {
        dispatch(getCurrentShiftByCompanyID(teamID as string))
    }, [])
    console.log("remder")
    const toggleItem = (el: productType) => {
        products?.map((product: productType) => {
            if (product.done === true) {
                return { ...product, done: false }
            } else {
                return product
            }
        })
        if (el.done === true) {
            dispatch(blanksActions.setItemUndone(el.id as string))
        } else {
            dispatch(blanksActions.setItemDone(el.id as string))
        }
    }
    let percent = products ? 100 / products.length * Number(products.filter((el: productType) => el.done === true).length.toFixed(2)) : 0
    const closeShiftHandler = () => {
        dispatch(closeCurrentShiftByCompanyID(curentShift))
    }
    return (
        <>
            {curentShift.shiftID?.length as number > 1 ?
                <section className={styles.current_shift_container}>
                    {/* @ts-ignore */}
                    <div className={styles.progress_bar}>
                        <span>{readyProducts?.length + "/" + products?.length}</span>
                        <span>{percent.toFixed(1) + "%"}</span>
                    </div>


                    {products?.map((el: productType) => {
                        return (
                            <div key={el.id} className={el.done ? styles.single_product : styles.ready_product}>
                                <span>{el.name}</span>
                                <span id={styles.setDoneBtn} onClick={() => {
                                    toggleItem(el)
                                }}>{el.done ? "В процессе" : "Готово"}</span>
                            </div>

                        )
                    })}
                    {percent !== 100 ? null :
                        <button id={styles.EndShift} onClick={closeShiftHandler}>Закончить смену</button>}
                </section> :
                <section className={styles.empty_shift_container}>
                    <span>Нет открытых смен</span>
                    <NavLink className={styles.nav_link} to={"create-new"}>
                        Начать
                    </NavLink>
                </section>


            }
        </>

    )

}