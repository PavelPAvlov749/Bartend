import { InferActionType } from "./Store";
import {  productType } from "./Types";
import { app_actions } from "./AppReducer";
import { Firestore_instance } from "../services/Firebase/PremixesAPI";
import { blanksActions } from "./BlankShiftReducer";
import { DocumentData} from "firebase/firestore";



const SET_PREMIXES = "barApp/productReducer/setProducts";
const SET_ACTUAL_PRODUCT_CARD = 'barApp/productReducer/setActualProductCard';
const REMOVE_PRODUCT = "barApp/ProductReducer/RemoveProduct";
const SET_PRDOCUCT_CARD = "barApp/ProductReducer/setProductCard";
// const UPDATE_COMPOSITION = "barApp/ProductReducer/updateComposition";
const DELETE_COMPONENT = "barApp/ProductReducer/deleteComponent";
const ADD_COMPONENT = "barApp/ProductReducer/addComponent";
const UPDATE_DESCRIPTION = "barApp/ProductReducer/updateDescription";

type initial_state_type = {
    premixes : productType[] | [],
    newPremix : productType | null,
    actualProductCard : productType,
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
    actualProductCard : null as unknown as productType,
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
        case SET_PRDOCUCT_CARD : {
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
        case UPDATE_DESCRIPTION : {
            return {
                ...state,
                actualProductCard : {...state.actualProductCard,description : action.payload}
            }
        }
        case DELETE_COMPONENT : {
            return {
                ...state,
                actualProductCard : {...state.actualProductCard,composition : state.actualProductCard.composition.filter((el) => {
                    // Compare object keys with key passed by action.payload
                    if (Object.keys(el)[0] != action.payload)
                    {
                        // Return all Objects not equals to action.payload
                        return {el}
                    }
                })}
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

export const setProductCardThunk = (productID : string) => {
    return async function (dispatch : any) {
        let card : DocumentData | undefined = await Firestore_instance.getProductByID(productID);
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