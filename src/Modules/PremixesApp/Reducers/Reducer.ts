import { productType } from "../../../Redux/Types";


type ActionType = {
    type: string,
    payload: string | productType[]
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
            case 'set-state' : {
                return [...action.payload as productType[]]
            }
            default:
                return state
        }
    }