
import { CollapseClassKey } from "@mui/material";
import { coctailDbAPI } from "../Axios/CocktailDbAPI";
import { CheckListsAPI } from "../Firebase/CkeckListsAPI";
import { app_actions } from "./AppReducer";
import { InferActionType } from "./Store";
import { Firestore_instance } from "../Firebase/PremixesAPI";

const GET_COCKTAILS = "barApp/KnowledgeBaseReducer/get_cocktails"
const SET_CURRENT_COCKTAIL = "barApp/KnowledgeBaseReducer/setCurrentCocktail"
const GET_SPIRITS = "barApp/KnowledgeBaseReducer/getSpirits"
const SET_CURRENT_SPIRIT = "barApp/KnowledgeBaseReducer/setCurrentSpirit"

export type cocltalCardType = {
    idDrink : string,
    strDrink: string,
    strInstructions: string,
    strDrinkThumb: string,
    strCategory: string,
    strIBA: string,
    strAlcoholic: string,
    strGlass: string,
    composition : {}
}
export type spiritType = {
    ABV : string,
    ID : string,
    definition : string,
    displayName : string,
    image : string,
    production : string
}
type initial_state_type = {
    cocktails: cocltalCardType[] | null,
    currentCocktail : cocltalCardType | null,
    spirits : spiritType[] | null,
    currentSpirit : spiritType | null



}

const initial_state: initial_state_type = {
    cocktails: null,
    currentCocktail : null,
    spirits : null,
    currentSpirit : null
}

//Acrtion types
type Action_Type = InferActionType<typeof KnowledgeBaseActions>;

export const KnowledgeBaseReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        case GET_COCKTAILS: {
            return {
                ...state,
                cocktails: action.payload
            }
        }
        case SET_CURRENT_COCKTAIL : {
            return  {
                ...state,
                currentCocktail : action.payload
            }
        }
        case GET_SPIRITS : {
            return {
                ...state,
                spirits : action.payload
            }
        }
        case SET_CURRENT_SPIRIT : {
            return {
                ...state,
                currentSpirit : action.payload
            }
        }
        default:
            return state
    }
}

export const KnowledgeBaseActions = {
    getCocktails: (cocktails: cocltalCardType[]) => ({
        type: "barApp/KnowledgeBaseReducer/get_cocktails",
        payload: cocktails
    } as const),
    setCurrentCocktail : (cocktail : cocltalCardType) => ({
        type : "barApp/KnowledgeBaseReducer/setCurrentCocktail",
        payload : cocktail
    } as const),
    getSpitis : (spirits : spiritType[]) => ({
        type : "barApp/KnowledgeBaseReducer/getSpirits",
        payload : spirits
    } as const),
    setCurrentSpirit : (spirit : spiritType) => ({
        type : "barApp/KnowledgeBaseReducer/setCurrentSpirit",
        payload : spirit
    } as const)
}

export const getCocktailsThunk = () => {
    return async function (dispatch: any) {
        let cocktails = await coctailDbAPI.getAllCoctails()
        if (cocktails) {
            dispatch(KnowledgeBaseActions.getCocktails(cocktails))
        }
    }
}

export const getCocktailsByName = (name: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.setFetch(true))
        let cocktails = await coctailDbAPI.searchCocktailByName(name)
        dispatch(KnowledgeBaseActions.getCocktails(cocktails))
        dispatch(app_actions.setFetch(false))
    }
}

export const getCocktailByID = (id : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let cocktail = await coctailDbAPI.getCocktailByID(id)
       
        if(cocktail) {
            dispatch(KnowledgeBaseActions.setCurrentCocktail(cocktail))
        }
    }
}
export const getSpiritsThunk = () => {
    return async function (dispatch : any) {
        let spirits = await Firestore_instance.getAllSpirits()
        dispatch(KnowledgeBaseActions.getSpitis(spirits as spiritType[]))
    }
}

export const getCurrentIngridient = (id : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let ingridient = await Firestore_instance.getIngridientByID(id)
        dispatch(KnowledgeBaseActions.setCurrentSpirit(ingridient))
        dispatch(app_actions.setFetch(false))
    }
}