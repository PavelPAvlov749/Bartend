import { InferActionType } from "./Store";
import {  productType } from "./Types";
import { app_actions } from "./AppReducer";
import { Firestore_instance } from "../Firebase/PremixesAPI";
import { blanksActions } from "./BlankShiftReducer";


const SET_PREMIXES = "barApp/productReducer/setProducts"
const SET_ACTUAL_PRODUCT_CARD = 'barApp/productReducer/setActualProductCard'
const REMOVE_PRODUCT = "barApp/ProductReducer/RemoveProduct"


type initial_state_type = {
    premixes : productType[] | [],
    newPremix : productType | null,
    actualProductCard : productType | null,
    newCard : {
        name : string | null,
        composition : any [],
        id : string | null,
        companyID : string | null,
        description : string | null
    }
}

let initial_state : initial_state_type = {
    premixes : [],
    newPremix : null,
    actualProductCard : null,
    newCard : {
        name : null,
        composition : [],
        id : null,
        companyID : null,
        description : null
    }

}

//Acrtion types
type Action_Type = InferActionType<typeof productActions>;

export const productReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        case SET_PREMIXES : {
            return {
                ...state,
                premixes : action.payload
            }
        }
        case SET_ACTUAL_PRODUCT_CARD : {
            return {
                ...state,
                actualProductCard : action.payload
            }
        }
    

        case REMOVE_PRODUCT : {
            return {
                ...state,
                premixes :  [...state.premixes.filter((el : productType) => el.id !== action.payload)]
            }
        }

        default:
            return state
    }
}

export const productActions = {
  setPremixes : (premixes : productType[]) => ({
    type : "barApp/productReducer/setProducts",
    payload : premixes
  } as const),
  setAcualProductCard : (productCard : productType) => ({
    type : "barApp/productReducer/setActualProductCard",
    payload : productCard
  } as const),
  setNewID : (ID : string) => ({
    type : "barApp/productReducer/setNewID",
    payload : ID
  } as const),
  removeProduct : (productID : string) => ({
    type : "barApp/ProductReducer/RemoveProduct",
    payload : productID
  } as const)


}


export const getProductsByCompanyID = (companyID : string) => {
    return async function (dispatch : any) {
        // dispatch(app_actions.setInit(false))
        dispatch(app_actions.setFetch(true))
        const products = await Firestore_instance.getProductsByCompanyID(companyID)
        dispatch(productActions.setPremixes(products))
        dispatch(blanksActions.setProductList(products))
        setTimeout(() => {
            dispatch(app_actions.setFetch(false))
        },0)
        dispatch(app_actions.setFetch(false))
        // dispatch(app_actions.setInit(true))
    }
}

export const deleteProductCrad = (productID : string) => {
    return async function (dispatch : any) {
      
        await Firestore_instance.deleteProduct(productID)
        dispatch(productActions.removeProduct(productID))
    
       
    }
}