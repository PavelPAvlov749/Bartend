
import { Firestore_instance } from "../Firebase/PremixesAPI"
import { getFullDateString } from "../Helpers/Helpers"
import { app_actions } from "./AppReducer"
import { InferActionType } from "./Store"
import { blankShiftType, productType } from "./Types"


const SELECT_ITEM = "barApp/blankShiftReducer/add-item"
const DESELECT_ITEM = "barApp/blankShiftReducer/deselect-item"
const SELECT_ALL_ITEMS = "barApp/blankShiftReducer/selectAll"
const DESELECT_ALL_ITEMS = "barApp/blankShiftReducer/deselectAllItems"
const SET_PRODUCT_LIST = "barApp/blankShiftReducer/set_product_list"
const SET_CURENT_SHIFT = "barApp/blanhShiftReducer/set_current_shift"
const CLOSE_CURRENT_SHIFT = "barApp/blanhShiftReducer/close_current_shift"
const SET_SHIFTS_HISTORY = "barApp/blanhShiftReducer/set_shifts_history"
const SET_PASSED_SHIFT = "barApp/blankShiftReducer/setPassedShift"

type initialStateType = {
    productList: productType[],
    selectedProducts: productType[],
    closedShifts: blankShiftType[],
    currentShift: blankShiftType,
    passedShift: blankShiftType | null

}

const initialState: initialStateType = {
    productList: [],
    selectedProducts: [],
    passedShift: null,
    closedShifts: [],
    currentShift: {
        products: [],
        shiftID: "",
        done: false,
        teamID: "",
        teamName: "",
        date: "",
        employe: "",
        count: 0

    },


}
type Action_Type = InferActionType<typeof blanksActions>;
export const blankShiftReducer = (state = initialState, action: Action_Type) => {
    switch (action.type) {

        case SET_PRODUCT_LIST: {

            return {
                ...state,
                productList: action.payload.map((el: productType) => {
                    return { ...el, checked: false }
                })
            }
        }
        case SELECT_ITEM: {
            return {
                ...state,
                productList: state.productList.map((el: productType) => {
                    if (el.id === action.payload) {
                        return { ...el, checked: true }
                    } else {
                        return el
                    }
                })
            }
        }
        case DESELECT_ITEM: {
            return {
                ...state,
                productList: state.productList.map((el: productType) => {
                    if (el.id === action.payload) {
                        return { ...el, checked: false }
                    } else {
                        return el
                    }
                })
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


        case SET_CURENT_SHIFT: {
            return {
                ...state,
                currentShift: { ...action.payload }
            }
        }
        case CLOSE_CURRENT_SHIFT: {
            return {
                ...state,
                currentShift: {
                    products: [],
                    shiftID: "",
                    done: false,
                    teamID: "",
                    teamName: "",
                    date: "",
                    employe: "",
                    count: 0
                }
            }
        }
        case SET_SHIFTS_HISTORY: {
            return {
                ...state,
                closedShifts: action.payload
            }
        }
        case SET_PASSED_SHIFT: {
            return {
                ...state,
                passedShift: action.payload
            }
        }

        
        default:
            return state
    }
}


export const blanksActions = {
    setPassedShift: (shift: blankShiftType) => ({
        type: "barApp/blankShiftReducer/setPassedShift",
        payload: shift
    } as const),
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
    setProductList: (products: productType[]) => ({
        type: "barApp/blankShiftReducer/set_product_list",
        payload: products
    } as const),
    setCurrentShift: (shift: blankShiftType) => ({
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
    } as const),

}




export const getCurrentShiftByCompanyID = (companyID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        let shift = await Firestore_instance.getCurrentShift(companyID)
        if (shift) {
            dispatch(blanksActions.setCurrentShift(shift as unknown as blankShiftType))
            dispatch(app_actions.setFetch(false))
        } else {
            dispatch(blanksActions.setCurrentShift({
                products: [],
                shiftID: "",
                done: false,
                teamID: "",
                teamName: "",
                date: "",
                employe: "",
                count: 0
            }))
        }

    }
}


export const closeCurrentShiftByCompanyID = (shift: blankShiftType) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        await Firestore_instance.addShiftInHistory(shift)
        await Firestore_instance.clearCurrentShift(shift.shiftID as string)

        dispatch(blanksActions.closeCurentShift(shift.shiftID as string))
        dispatch(app_actions.setFetch(false))
    }
}

export const getShiftsHistoryByCompanyID = (companyID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        let shifts = await Firestore_instance.getBlankShifts(companyID)
        dispatch(blanksActions.setShiftHistory(shifts as blankShiftType[]))
        dispatch(app_actions.setFetch(false))
    }
}



export const setCurrentShiftByCompanyID = (companyName : string,companyID : string,products : productType[],employe : string) => {
    let newShift = {
        date: getFullDateString(),
        employe: employe,
        products: products.filter((el: productType) => el.checked === true).map((el: productType) => {
            return { ...el, done: false }
        }),
        done: false,
        count: products.filter((el: productType) => el.checked === true).length,
        teamID: companyID as string,
        teamName: companyName
    }
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        await Firestore_instance.setCurrentShift(newShift);
        dispatch(blanksActions.setCurrentShift(newShift))
        dispatch(app_actions.setFetch(false))
    }
}

export const getPassedShiftByID = (shiftID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        const shift = await Firestore_instance.getPassedShiftById(shiftID)
        dispatch(blanksActions.setPassedShift(shift))
        dispatch(app_actions.setFetch(false))
    }
}