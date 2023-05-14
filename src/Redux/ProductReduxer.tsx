import { InferActionType } from "./Store";
import { ProfileType, productType } from "./Types";
import avatar from "../Assets/1000.jpg"


const SET_PREMIXES = "barApp/productReducer/setProducts"


type initial_state_type = {
    premixes : productType[] | [],
    newPremix : productType | null,
}

let initial_state : initial_state_type = {
    premixes : [],
    newPremix : null

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
        default:
            return state
    }
}

export const productActions = {
  setPremixes : (premixes : productType[]) => ({
    type : "barApp/productReducer/setProducts",
    payload : premixes
  } as const)

}

export const getProfileThunk = () => {
    return function (dispatch : any) {
    
    
    }

}