import React, { Dispatch, useReducer } from "react"
import { productType } from "../../../Redux/Types"
import { ProdcustItem } from "./PrroductItem"
import { Reducer } from "./Reducer"


type ActionType = {
    type: string,
    payload: string
}

type prdocuctListType = {
    products: productType[],
}


export const ProductList = (props: prdocuctListType) => {
    let [state,setState] = useReducer(Reducer,props.products);
    function toggle (id : string) {
        setState({
            type : 'toggle-item',
            payload : id
        })
    }
    console.log(state)
    return (
        <ul>
            {state.map((el: productType) => {
                return (
                    <ProdcustItem name={el.name} isChecked={el.checked as boolean} toggleFunction={() => {toggle(el.id as string)}} id={el.id as string} />
                )
            })}
        </ul>
    )
}