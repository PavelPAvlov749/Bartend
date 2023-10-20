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
        case 'select-all': {
            return [
                ...state.map((el: productType) => {
                    return { ...el, checked: true }
                })
            ]
        }
        case 'deselect-all': {
            return [
                ...state.map((el: productType) => {
                    return { ...el, checked: false }
                })
            ]
        }
        case 'set-products' : {
            console.log("SET")
            return [
                ...state,...action.payload
            ]
        }
        default:
            return state;
    }
}