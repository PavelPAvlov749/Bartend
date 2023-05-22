import { Firestore_instance } from "../Firebase/PremixesAPI"
import { app_actions } from "./AppReducer"
import { InferActionType } from "./Store"
import { blankShiftType, productType } from "./Types"


const SELECT_ITEM = "barApp/blankShiftReducer/add-item"
const DESELECT_ITEM = "barApp/blankShiftReducer/deselect-item"
const SELECT_ALL_ITEMS = "barApp/blankShiftReducer/selectAll"
const DESELECT_ALL_ITEMS = "barApp/blankShiftReducer/deselectAllItems"
const START_BLANK_SHIFT = "barApp/blankShiftReducer/start"
const END_BLANK_SHIFT = "barApp/blankShiftReducer/endShift"
const SET_ITEM_DONE = "barApp/blankShiftReducer/set_item_done"
const SET_ITEM_UNDONE = "barApp/blankShiftReducer/set_item_undeone"
const SET_PRODUCT_LIST = "barApp/blankShiftReducer/set_product_list"
const SET_CURENT_SHIFT = "barApp/blanhShiftReducer/set_current_shift"
const CLOSE_CURRENT_SHIFT = "barApp/blanhShiftReducer/close_current_shift"
const SET_SHIFTS_HISTORY = "barApp/blanhShiftReducer/set_shifts_history"



type initialStateType = {
    productList: productType[],
    selectedProducts: productType[],
    closedShifts: blankShiftType[],
    currentShift: blankShiftType | null

}

const initialState: initialStateType = {
    productList: [],
    selectedProducts: [],
    closedShifts: [],
    currentShift: null

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
                        return { ...el, checked: true }
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
            console.log(action.payload)
            return {
                ...state,...state.currentShift,
                products: state.currentShift?.products.map((el: productType) => {
                    if (el.id === action.payload) {
                        return { ...el, done: true }
                    } else {
                        return el
                    }
                })
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
        case SET_CURENT_SHIFT: {
            return {
                ...state,
                currentShift: action.payload
            }
        }
        case CLOSE_CURRENT_SHIFT: {
            return {
                ...state,
                currentShift: null
            }
        }
        case SET_SHIFTS_HISTORY: {
            return {
                ...state,
                closedShifts: action.payload
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
    startShift: () => ({
        type: "barApp/blankShiftReducer/start",

    } as const),
    endShift: () => ({
        type: "barApp/blankShiftReducer/endShift",

    } as const),
    setItemDone: (itemID: string) => ({
        type: "barApp/blankShiftReducer/set_item_done",
        payload: itemID
    } as const),
    setItemUndone: (itemID: string) => ({
        type: "barApp/blankShiftReducer/set_item_undeone",
        payload: itemID
    } as const),
    setProductList: (products: productType[]) => ({
        type: "barApp/blankShiftReducer/set_product_list",
        payload: products
    } as const),
    setCurrentShift: (shift: blankShiftType | null) => ({
        type: "barApp/blanhShiftReducer/set_current_shift",
        payload: shift
    } as const),
    closeCurentShift: (shiftID: string) => ({
        type: "barApp/blanhShiftReducer/close_current_shift",
        payload: shiftID,
    } as const),
    setShiftHistory: (shifts: blankShiftType[]) => ({
        type: "barApp/blanhShiftReducer/set_shifts_history",
        payload: shifts
    } as const)

}


export const getPremixes = (companyID : string) => {
    return async function (dispatch : any) {
      
        dispatch(app_actions.setFetch(true))
        const products = await Firestore_instance.getProductsByCompanyID(companyID)
        console.log(products)
        dispatch(blanksActions.setProductList(products))
        console.log(products)
        dispatch(app_actions.setFetch(false))
     
    }
}


export const getCurrentShiftByCompanyID = (companyID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        let shift = await Firestore_instance.getCurrentShift(companyID)
        if(shift) {
            dispatch(blanksActions.setCurrentShift(shift as unknown as blankShiftType))
        dispatch(app_actions.setFetch(false))
        }else{
            dispatch(blanksActions.setCurrentShift(null))
        }
        
    }
}


export const closeCurrentShiftByCompanyID = (shift : blankShiftType) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        await Firestore_instance.addShiftInHistory(shift)
        await Firestore_instance.clearCurrentShift(shift.shiftID as string)
        dispatch(blanksActions.closeCurentShift(shift.shiftID as string))
        dispatch(app_actions.setFetch(false))
    }
}

export const getShiftsHistoryByCompanyID = (companyID : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let shifts = await Firestore_instance.getBlankShifts(companyID)
        dispatch(blanksActions.setShiftHistory(shifts as blankShiftType[]))
        dispatch(app_actions.setFetch(false))
    }
}

export const removeShiftToHoistiry = (shiftID : string) => {
    return async function (dispatch : any) {

    }
}

export const setCurrentShiftByCompanyID = (currentShift : blankShiftType) => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        await Firestore_instance.setCurrentShift(currentShift)
        dispatch(blanksActions.setCurrentShift(currentShift))
        dispatch(app_actions.setFetch(false))
    }
}