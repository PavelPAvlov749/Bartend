import React, { useEffect } from "react";
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
    let curentShift = useSelector((state : Global_state_type) => state.blankShift.currentShift)
    const readyProducts = products?.filter((el: productType) => el.done === true)
    const companyName = useSelector((state: Global_state_type) => state.App.userID)
    useEffect(() => {
        dispatch(getCurrentShiftByCompanyID(companyName as string))
    })
    const toggleItem = (el: productType) => {
        products?.map((product: productType) => {
            if (product.done === true) {
                return { ...product, done: false }
            } else {
                return product
            }
        })
        if (el.done === true) {
            dispatch(blanksActions.setItemUndone(el.id))
        } else {
            dispatch(blanksActions.setItemDone(el.id))
        }
    }
    let percent = products ? 100 / products.length * Number(products.filter((el: productType) => el.done === true).length.toFixed(2)) : 0

        return (
            <>
            {curentShift ? 
               <section className={styles.current_shift_container}>
                {/* @ts-ignore */}
                <div className={styles.progress_bar}>
                    <span>{readyProducts?.length + "/" + products?.length}</span>
                    <span>{percent + "%"}</span>
                </div>


                {products?.map((el: productType) => {
                    return (
                        <div className={el.done ? styles.single_product : styles.ready_product}>
                            <span>{el.name}</span>
                            <span id={styles.setDoneBtn} onClick={() => {
                                toggleItem(el)
                            }}>{el.done ? "Undone" : "Done"}</span>
                        </div>

                    )
                })}
                {percent == 100 ? null :
                    <button id={styles.EndShift} onClick={() => {
                        dispatch(closeCurrentShiftByCompanyID(curentShift as blankShiftType))
                    }}>End Shift</button>}
            </section> :
                <section className={styles.empty_shift_container}>
                <h1>No open shifts</h1>
                <NavLink className={styles.nav_link} to={"create-new"}>
                    New
                </NavLink>
            </section>
        
    
    }
            </>
         
        )
    
}