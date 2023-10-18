import { productType } from "../../../Redux/Types"


type ActionType = {
    type: string,
    payload: string
}

export const Reducer = (state: productType[], action: ActionType) => {
    switch (action.type) {
        case 'toggle-item': {
            return [
                ...state.map((el: productType) => {
                    if (el.id === action.payload) {
                        el.checked = !el.checked;
                        return el;
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
        default:
            return state;
    }
}