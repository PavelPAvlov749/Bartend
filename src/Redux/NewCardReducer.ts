import { premixAPI } from "../services/Firebase/PremixAPI"
import { InferActionType } from "./Store"
import { productType } from "./Types"



const SET_NEW_CARD_NAME = "barApp/productReducer/setNewName"
const SET_NEW_CARD_DESCRIPTION = "barApp/productReducer/setNewDescription"
const SET_NEW_CARD_ID = "barApp/productReducer/setNewID"
const ADD_NEW_INGRIDEINT = "barApp/productReducer/addNewIngridient"
const TOGGLE_VISIBILITY = "barApp/productReducer/toggleVisibility"

interface IState  {
    name : string,
    companyID : string | null,
    description : string,
    keys : string[],
    values : string [],
    id : string | null,
    composition : {} | null,
    isVisibleForAll : boolean
}

const initialState : IState = {
    name : "",
    id : null,
    companyID : null,
    description : "",
    keys : [],
    values : [],
    composition : {},
    isVisibleForAll : false
}

type Action_Type = InferActionType<typeof newCardActions>;
export const newCardReducer = (state = initialState,action : Action_Type) => {
    switch(action.type) {
        case SET_NEW_CARD_NAME : {
            return {
                ...state,
                name : action.payload
            }
        }
        case SET_NEW_CARD_ID : {
            return {
                ...state,
                id : action.payload
            }
        }
        case SET_NEW_CARD_DESCRIPTION : {
            return {
                ...state,
                description : action.payload
            }
        }
        case ADD_NEW_INGRIDEINT : {
            return {
                ...state,
                composition : {...state.composition,...action.payload}
            }
        }
        case TOGGLE_VISIBILITY : {
            return {
                ...state,
                isVisibleForAll : !state.isVisibleForAll
            }
        }
        default :
            return state
    }
}


export const newCardActions = {
        addComponent : ( compoent : string) => ({
        type : "barApp/productReducer/addComponent",
        payload : compoent
      } as const),

      setNewName : (name : string) => ({
        type : "barApp/productReducer/setNewName",
        payload : name
      } as const),
      setNewDescription : (description : string) => ({
        type : "barApp/productReducer/setNewDescription",
        payload : description
      } as const ),
      setNewCardID : (id : string) => ({
        type : "barApp/productReducer/setNewID",
        payload : id
      } as const ),
      addNewIngridient : (ingrident : {}) => ({
        type : "barApp/productReducer/addNewIngridient",
        payload : ingrident
      } as const),
      toggleVisibility : () => ({
        type : "barApp/productReducer/toggleVisibility"
      } as const)
    
}


export const createNewIngridientCard = (card : productType) => {
    return async function (dispatch : any) {
        let newCard : productType = {
            name : card.name,
            description : card.description,
            composition : card.composition,
            teamID : card.teamID,
            isVisibleForAll : card.isVisibleForAll
        }
        await premixAPI.addProduct(newCard);
        console.log(newCard)
    }
}