import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { authAPI } from "../Firebase/AuthAPI";
import { InferActionType } from "./Store";
import { Firestore_instance } from "../Firebase/PremixesAPI";
import { userPageType } from "./Types";


const SET_INIT = "barApp/appReducer/setInit"
const SET_AUTH = "barApp/appReducer/setAuth"
const SET_USER_PAGE = "barApp/AppReducer/setUserPage"
const TOGGLE_THEME = "barApp/AppReducer/toggleTheme"



type initial_state_type = {
  user:userPageType,
  isAuth: boolean,
  isInit: boolean,
  isFetch: boolean,
  isDarktheme : boolean


}

let initial_state: initial_state_type = {
  user: {
    userID: null,
    userName: null,
    team: "",
    teamID: ""
  },
  isInit: false,
  isAuth: true,
  isFetch: false, 
  isDarktheme : true

}

//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const appReducer = (state = initial_state, action: Action_Type) => {
  switch (action.type) {
    case TOGGLE_THEME : {
      console.log(!state.isDarktheme)
      return {
        ...state,
        isDarktheme : !state.isDarktheme
      }
    }
    case SET_INIT: {
      return {
        ...state,
        isInit: action.payload
      }
    }

    case SET_AUTH: {
      return {
        ...state, isAuth: action.payload
      }
    }

    case SET_USER_PAGE : {
      return {
        ...state,
        user : action.payload
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
  setAuth: (isAuth: boolean) => ({
    type: "barApp/appReducer/setAuth",
    payload: isAuth
  } as const),
  setFetch: (isFetch: boolean) => ({
    type: 'barApp/appReducer/setFetch',
    payload: isFetch
  } as const),
  setUserPage: (userPage: userPageType) => ({
    type: "barApp/AppReducer/setUserPage",
    payload: userPage
  } as const),
  toggleTheme : () => ({
    type : "barApp/AppReducer/toggleTheme"
  } as const)

}

export const initializeThunk = () => {
  return async function (dispatch: any) {
    const auth = getAuth()
    await onAuthStateChanged(auth, async (user) => {
      dispatch(app_actions.setInit(false))
      dispatch(app_actions.setAuth(false))
      let userPage = await Firestore_instance.getUserById(user?.uid as string)
      if (userPage) {
        dispatch(app_actions.setUserPage(userPage))
        dispatch(app_actions.setInit(true))
        dispatch(app_actions.setAuth(true))
        // dispatch(productActions.setPremixes(Products))
      
      } else {
        dispatch(app_actions.setAuth(false))
        dispatch(app_actions.setInit(true))
      }


    })
  }
}

export const loginByEmailAndPassword = (email: string, password: string) => {
  return async function (dispatch: any) {
    const userID = authAPI.signInByEmailAndPassword(email, password)
    if (userID !== null) {
      dispatch(app_actions.setInit(true))
    }
  }
}

export const logOutThunk = () => {
  return async function (dispatch: any) {
    const auth = getAuth()
    await signOut(auth)
    dispatch(app_actions.setAuth(false))
  }
}

