import { productType } from "../../../Redux/Types";


type ActionType = {
    type: string,
    payload: string
}

export const Reducer  = (state: productType[], action: ActionType) => {
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