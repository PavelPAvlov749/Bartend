import { InferActionType } from "./Store";
import {  productType } from "./Types";
import { app_actions } from "./AppReducer";
import { blanksActions } from "./BlankShiftReducer";
import { DocumentData} from "firebase/firestore";
import { premixAPI } from "../services/Firebase/PremixAPI";


// ACTIONS 

const SET_PREMIXES = "barApp/productReducer/setProducts";
const SET_ACTUAL_PRODUCT_CARD = 'barApp/productReducer/setActualProductCard';
const REMOVE_PRODUCT = "barApp/ProductReducer/RemoveProduct";
const SET_PRDOCUCT_CARD = "barApp/ProductReducer/setProductCard";
const DELETE_COMPONENT = "barApp/ProductReducer/deleteComponent";
const ADD_COMPONENT = "barApp/ProductReducer/addComponent";
const UPDATE_DESCRIPTION = "barApp/ProductReducer/updateDescription";

// Types and initial state
// -------------------------------------------------------

type initial_state_type = {
    premixes : productType[] | [],
    newPremix : productType | null,
    actualProductCard : productType,

}

let initial_state : initial_state_type = {
    premixes : [],
    newPremix : null,
    actualProductCard : null as unknown as productType,


}

//Acrtion types
type Action_Type = InferActionType<typeof productActions>;


// ----------------------------------------------------------
export const productReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        // Fetch all premixes
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
        case SET_PRDOCUCT_CARD : {
            return {
                ...state,
                actualProductCard : action.payload
            }
        }
        // Delete specified premix from store
        case REMOVE_PRODUCT : {
            return {
                ...state,
                premixes :  [...state.premixes.filter((el : productType) => el.id !== action.payload)]
            }
        }
        case DELETE_COMPONENT : {
            return {
                ...state,
                // Copy actual state into new state
                actualProductCard : {...state.actualProductCard,
                    // Filter composition array by string key of each array ellement
                    composition : state.actualProductCard.composition.filter(
                        (el) => Object.keys(el)[0] !== action.payload)
                    }
            }
        }
        case ADD_COMPONENT : {
            return {
                ...state,
                actualProductCard : {...state.actualProductCard,
                    // Copy all actual values and add value from action payload
                    // WARINING! Array.push methid will return an typescript error
                    // As a result reducer will return rtype 'never'
                    composition : [...state.actualProductCard.composition,action.payload]}
            }
        }
        case UPDATE_DESCRIPTION : {
            return {
                ...state,
                actualProductCard : {...state.actualProductCard,description : action.payload}
            }
        }
        default:
            return state
    }
}


// Action creator object
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
  } as const),
  setProductCard : (card : productType) => ({
    type : "barApp/ProductReducer/setProductCard",
    payload : card
  } as const ),
  updateDescription : (description : string) => ({
    type : "barApp/ProductReducer/updateDescription",
    payload : description
  } as const),
  deleteComponent : (key : string) => ({
    type : "barApp/ProductReducer/deleteComponent",
    payload : key
  } as const),
  addComonent : (compoennt : {[x : string] : string}) => ({
    type : "barApp/ProductReducer/addComponent",
    payload : compoennt
  } as const)

}

//Thunks (async actions)
// Contains firebase database interaction by the PremixAPI class

export const getProductsByCompanyID = (companyID : string) => {
    return async function (dispatch : any) {
       
        dispatch(app_actions.setFetch(true))
        const products = await premixAPI.getProductsByCompanyID(companyID)
        dispatch(productActions.setPremixes(products as productType[]))
        dispatch(blanksActions.setProductList(products as productType[]))
        setTimeout(() => {
            dispatch(app_actions.setFetch(false))
        },0)
        dispatch(app_actions.setFetch(false))
        
    }
}

export const deleteProductCrad = (productID : string) => {
    return async function (dispatch : any) {

        await premixAPI.deleteProduct(productID)
        dispatch(productActions.removeProduct(productID))
    
       
    }
}

export const setProductCardThunk = (productID : string) => {
    return async function (dispatch : any) {
        let card : DocumentData | undefined = await premixAPI.getProductByID(productID);
        if(card)
        {
            dispatch(productActions.setProductCard(card.data()));
        }
        else
        {
            dispatch(productActions.setProductCard(null as unknown as productType));
        }
    }
}

export const getPublicPremixes = () => {
    return async function (dispatch : any) {
        let products = await premixAPI.getAllPublicProducts();
        if(products) {
            dispatch(productActions.setPremixes(products as productType[]));
        }
    }
}