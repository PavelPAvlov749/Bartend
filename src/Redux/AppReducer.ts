import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { authAPI } from "../Firebase/AuthAPI";
import { InferActionType } from "./Store";
import { productActions } from "./ProductReduxer";
import { Products } from "../Model/productsModel";


const SET_INIT = "barApp/appReducer/setInit"
const SET_USER_ID = "barApp/appReducer/setUserID"
const SET_AUTH = "barApp/appReducer/setAuth"
const SET_FETCH = "barApp/appReducer/setFetch"
const SET_USER_NAME = ""

type initial_state_type = {
  userID: string | null,
  isAuth: boolean,
  isInit: boolean,
  isFetch : boolean,
  userName : string | null
}

let initial_state: initial_state_type = {
  userID: null,
  userName : null,
  isInit: false,
  isAuth: true,
  isFetch : false

}

//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const appReducer = (state = initial_state, action: Action_Type) => {
  switch (action.type) {
    case SET_INIT: {
      return {
        ...state,
        isInit: action.payload
      }
    }
    case SET_USER_ID: {
      return {
        ...state,
        userID : action.payload
      }
    }
    case SET_AUTH : {
      return {
        ...state,isAuth : action.payload
      }
    }
    default:
      return state
  }
}

export const app_actions = {
  setInit: (isInit: boolean) => ({
    type: "barApp/appReducer/setInit",
    payload: isInit
  } as const),
  setUserID: (userID: string) => ({
    type: "barApp/appReducer/setUserID",
    payload: userID
  } as const),
  setAuth : (isAuth : boolean) => ({
    type : "barApp/appReducer/setAuth",
    payload : isAuth
  } as const),
  setFetch : (isFetch : boolean) => ({
    type : 'barApp/appReducer/setFetch',
    payload : isFetch
  } as const)

}

export const initializeThunk = () => {
  return async function (dispatch: any) {
    const auth = getAuth()
    await onAuthStateChanged(auth,(user) => {
      dispatch(app_actions.setInit(false))
      dispatch(app_actions.setAuth(false))
      
      setTimeout(() => {
        if(user !== null) {
          dispatch(app_actions.setUserID(user.uid))
          dispatch(app_actions.setInit(true))
          dispatch(app_actions.setAuth(true))
          // dispatch(productActions.setPremixes(Products))
        }else{
          dispatch(app_actions.setAuth(false))
          dispatch(app_actions.setInit(true))
        }
      },2000)
    
    })
  }
}

export const loginByEmailAndPassword = (email: string, password: string) => {
  return async function (dispatch: any) {
    const userID = authAPI.signInByEmailAndPassword(email, password)
    if(userID !== null) {
      dispatch(app_actions.setInit(true))
    }
  }
}

export const logOutThunk = () => {
  return async function (dispatch : any){
    const auth = getAuth()
    await signOut(auth)
    dispatch(app_actions.setAuth(false))
  }
}

