import React, { ReducerAction } from "react";
import { productType } from "../../Redux/Types";

type ActionType = {
    type: string,
    payload: string
}
type State = {
    products: any[]
}
export const Reducer  = (state: any[], action: ActionType) => {
    switch (action.type) {
        case "toggle" : {
            return [
                ...state.map((el: any) => {
                    if(el.id === action.payload) {
                        return {...el,isDone : !el.isDone};
                    }
                    return el
                })
            ]
        }
        default:
            return state
    }
}