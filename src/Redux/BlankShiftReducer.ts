import { Firestore_instance } from "../Firebase/PremixesAPI"
import { InferActionType } from "./Store"
import { productType } from "./Types"


const SELECT_ITEM = "barApp/blankShiftReducer/add-item"
const DESELECT_ITEM = "barApp/blankShiftReducer/deselect-item"
const SELECT_ALL_ITEMS = "barApp/blankShiftReducer/selectAll"
const DESELECT_ALL_ITEMS = "barApp/blankShiftReducer/deselectAllItems"
const START_BLANK_SHIFT = "barApp/blankShiftReducer/start"
const END_BLANK_SHIFT = "barApp/blankShiftReducer/endShift"
const SET_ITEM_DONE = "barApp/blankShiftReducer/set_item_done"
const SET_ITEM_UNDONE = "barApp/blankShiftReducer/set_item_undeone"
const SET_PRODUCT_LIST = "barApp/blankShiftReducer/set_product_list"



type initialStateType = {
    productList: productType[],
    selectedProducts: productType[],

}

const initialState: initialStateType = {
    productList: [],
    selectedProducts: [],

}
type Action_Type = InferActionType<typeof blanksActions>;
export const blankShiftReducer = (state = initialState, action: Action_Type) => {
    switch (action.type) {
        case SET_PRODUCT_LIST: {
            return {
                ...state,
                productList: action.payload
            }
        }
        case SELECT_ITEM: {
            return {
                ...state,
                productList: [...state.productList.map((el: productType) => {
                    if (el.id === action.payload) {
                        return { ...el, cheecked: true }
                    } else {
                        return el
                    }
                })]
            }
        }
        case DESELECT_ITEM: {
            return {
                ...state,
                productList: [...state.productList.map((el: productType) => {
                    if (el.id === action.payload) {
                        return { ...el, checked: false }
                    } else {
                        return el
                    }
                })]
            }
        }
        case SELECT_ALL_ITEMS: {
            return {
                ...state,
                productList: [...state.productList.map((el: productType) => {
                    return { ...el, checked: true }
                })]
            }
        }
        case DESELECT_ALL_ITEMS: {
            return {
                ...state,
                productList: [...state.productList.map((el: productType) => {
                    return { ...el, checked: false }
                })]
            }
        }
        case START_BLANK_SHIFT: {
            return {
                ...state,
                selectedProducts: [...state.productList.filter((el: productType) => el.checked as boolean === true)]
            }
        }
        case SET_ITEM_DONE: {
            return {
                ...state,
                selectedProducts: [...state.selectedProducts.map((el: productType) => {
                    if (el.id === action.payload) {
                        return { ...el, done: true }
                    } else {
                        return el
                    }
                })]
            }
        }
        case SET_ITEM_UNDONE: {
            return {
                ...state,
                selectedProducts: [...state.selectedProducts.map((el: productType) => {
                    if (el.id === action.payload) {
                        return {
                            ...el, done: false
                        }
                    } else {
                        return el
                    }
                })]
            }
        }
        case END_BLANK_SHIFT: {
            return {
                ...state,
                selectedProducts: []
            }
        }
        default:
            return state
    }
}


export const blanksActions = {
    selectItem: (itemID: string) => ({
        type: "barApp/blankShiftReducer/add-item",
        payload: itemID
    } as const),
    deselectItem: (itemID: string) => ({
        type: "barApp/blankShiftReducer/deselect-item",
        payload: itemID
    } as const),
    selectAllItems: () => ({
        type: "barApp/blankShiftReducer/selectAll"
    } as const),
    deselectAll: () => ({
        type: "barApp/blankShiftReducer/deselectAllItems"
    } as const),
    startShift : () => ({
        type :  "barApp/blankShiftReducer/start",

    } as const),
    endShift : () => ({
        type : "barApp/blankShiftReducer/endShift",

    } as const),
    setItemDone : (itemID : string) => ({
        type : "barApp/blankShiftReducer/set_item_done",
        payload : itemID
    } as const),
    setItemUndone : (itemID : string) => ({
        type : "barApp/blankShiftReducer/set_item_undeone",
        payload : itemID
    } as const ),
    setProductList : (products : productType[]) => ({
        type : "barApp/blankShiftReducer/set_product_list",
        payload : products
    } as const),

}




