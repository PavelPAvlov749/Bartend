import { productType } from "../../../Redux/Types"


type ActionType = {
    type: string,
    payload: any
}

export const Reducer = (state: productType[], action: ActionType) => {
    switch (action.type) {
        case 'toggle-item': {
            console.log(action.payload)
            return [
                ...state.map((el: productType) => {
                    if (el.id === action.payload) {

                        return {...el,checked : !el.checked};
                    }
                    return el;
                })
            ]
        }
        case 'toggle-all': {
            return [
                ...state.map((el: productType) => {
                    return { ...el, checked: !el.checked }
                })
            ]
        }
        case 'set-products' : {
            console.log(action.payload)
            return [
                ...action.payload
            ]
        }
        default:
            return state;
    }
}