import React from "react";
import styles from "../Styles/StartBlanks.module.css"
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { productType } from "../../Redux/Types";


export const StartBlankShift = () => {
    const dispatch : any = useDispatch()
    const blanks = useSelector((state : Global_state_type) => state.blankShift.selectedProducts)
    let progress = 100 / blanks.length * Number(blanks.filter((el : productType) => el.done === true).length.toFixed(2))
    return (
        <section className={styles.BlanksContainer}>
            <div className={styles.progressBar}>
                <div style={{"height" : "2px","backgroundColor" : "orangered","width" : `${progress}%`}}></div>
            </div>
            {blanks.map((el : productType) => {
                return (
                    <div className={styles.single_product_container}>
                        <span>{el.name}</span>
                        <input type="checkbox"/>
                    </div>
                )
            })}
        </section>
    )
}
