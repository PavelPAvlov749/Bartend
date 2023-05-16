import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { useNavigate } from "react-router-dom";
import { BlankList } from "./BlankList";
import selectAll from "../Assets/icons8-checked-checkbox-100.png"
import clearAll from "../Assets/icons8-clear-100.png";
import { productType } from "../Redux/Types";
import { productActions } from "../Redux/ProductReduxer";
import "../Styles/BlamkShift.css"
import startIcon from "../Assets/icons8-start-64.png"

export type blankType = {
    name: string,
    id: string,
    calculate?: (value: number) => {},
    description: string,
    composition: {},
    checked: boolean,
    companyID? : string | undefined
}
export const BlankShift = () => {
    const blanks = useSelector((state : Global_state_type) => {
        return state.premixes.blankShiftList
    })
const dispatch = useDispatch()
const navigate = useNavigate()

const toggleSelecrted = (blank : blankType) => {
    console.log(blank)
    if(!blank.checked){
        dispatch(productActions.addBlank(blank))
    }else{
        dispatch(productActions.removeBlank(blank.id))
    }
}

return (
    <section className="blank_shift_container">
        <div className="controls">
          
            <img id="selectAll" src={selectAll} alt="" onClick={() => {
                dispatch(productActions.selectAll())
            }}/>
              <img id="clear" src={clearAll} alt="" onClick={() => {
                dispatch(productActions.removeAll())
            }}/>
            <img src={startIcon} alt="" onClick={() => {
                navigate("/begin-blank-shift")
            }}/>
        </div>
        {blanks.map((el: blankType) => {
            return (
                <div key={el.id} className={el.checked ? "checked_element" : "unchecked_element"} onClick={() => {toggleSelecrted(el)}}>
                    <span>{el.name}</span>
                </div>
            )
        })}
    </section>
)
}