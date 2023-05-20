import { InferActionType } from "./Store";
import { ProfileType, productType } from "./Types";
import avatar from "../Assets/1000.jpg"
import { Products } from "../Model/productsModel";
import { app_actions } from "./AppReducer";
import { Firestore_instance } from "../Firebase/PremixesAPI";
import { blanksActions } from "./BlankShiftReducer";


const SET_PREMIXES = "barApp/productReducer/setProducts"
const SET_ACTUAL_PRODUCT_CARD = 'barApp/productReducer/setActualProductCard'
const ADD_BLANK_TO_THE_SHIFT = "barApp/productReducer/addBlank"
const REMOVE_BLANK_FROM_SHIFT_KIST = "barApp/productReducer/removeBlank"
const SELECT_ALL_BLANKS = "barApp/productReducer/addALLBlank"
const REMKVE_ALL_BLANKS = "barApp/productReducer/removeALLBlank"
const REMOVE_PRODUCT = "barApp/ProductReducer/RemoveProduct"

const blanks = Products.map((el : productType) => {
    return {...el,checked : false}
})

type initial_state_type = {
    premixes : productType[] | [],
    newPremix : productType | null,
    actualProductCard : productType | null,
    blankShiftList : productType[],
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
    blankShiftList : blanks,
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
        case ADD_BLANK_TO_THE_SHIFT : {
            return {
                ...state,
                blankShiftList : state.blankShiftList.map((el : productType) => {
                    if(el.id === action.payload.id) {
                        return {...el,checked : true}
                    }else {
                        return el
                    }
                })
            }
        }
        case REMOVE_BLANK_FROM_SHIFT_KIST : {
            return {
                ...state,
                blankShiftList : state.blankShiftList.map((el : productType) => {
                    if(el.id === action.payload){
                        return {...el,checked : false}
                    }else {
                        return el
                    }
                })
            }
        }
        case REMKVE_ALL_BLANKS : {
            return {
                ...state,
                blankShiftList : state.blankShiftList.map((el : productType) => {
                    return {...el,checked : false}
                })
            }
        }
        case SELECT_ALL_BLANKS : {
            return {
                ...state,
                blankShiftList : state.blankShiftList.map((el : productType) => {
                    return {...el,checked : true}
                })
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
  addBlank : (blank : productType) => ({
    type : "barApp/productReducer/addBlank",
    payload : blank
  } as const),
  removeBlank : (blankID : string) => ({
    type : "barApp/productReducer/removeBlank",
    payload : blankID
  } as const ),
  selectAll : () => ({
    type : "barApp/productReducer/addALLBlank",
   
  } as const ),
  removeAll : () => ({
    type : "barApp/productReducer/removeALLBlank"
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

export const getProfileThunk = () => {
    return function (dispatch : any) {
    
    
    }

}

export const getProductsByCompanyID = (companyID : string) => {
    return async function (dispatch : any) {
        // dispatch(app_actions.setInit(false))
        dispatch(app_actions.setFetch(true))
        const products = await Firestore_instance.getProductsByCompanyID(companyID)
        console.log(products)
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