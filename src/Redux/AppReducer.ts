import { GoogleAuthProvider, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { authAPI } from "../services/Firebase/AuthAPI";
import { InferActionType } from "./Store";
import { userPageType } from "./Types";
import { usersAPI } from "../services/Firebase/UsersAPI";
import { authApi } from "../services/Firebase/AuthAPI";


const SET_INIT = "barApp/appReducer/setInit";
const SET_AUTH = "barApp/appReducer/setAuth";
const SET_USER_PAGE = "barApp/AppReducer/setUserPage";
const TOGGLE_THEME = "barApp/AppReducer/toggleTheme";
const SET_IS_FETCH = "barApp/AppReducer/setIsFetch";
const SET_ERROR_STATE = "barApp/AppReducer/setErrorState";

type initial_state_type = {
  user: userPageType,
  isAuth: boolean,
  isInit: boolean,
  isFetch: boolean,
  isDarktheme: boolean,
  isError: boolean


}

let initial_state: initial_state_type = {
  user: {
    userID: null,
    userName: null,
    team: "",
    teamID: ""
  },
  isInit: false,
  isAuth: false,
  isFetch: false,
  isDarktheme: true,
  isError: false
}

//Acrtion types
type Action_Type = InferActionType<typeof app_actions>;

export const appReducer = (state = initial_state, action: Action_Type) => {
  switch (action.type) {
    case TOGGLE_THEME: {
      return {
        ...state,
        isDarktheme: !state.isDarktheme
      }
    }
    case SET_INIT: {
      return {
        ...state,
        isInit: action.payload
      }
    }
    case SET_IS_FETCH: {
      return { ...state, isFetch: action.payload }
    }
    case SET_AUTH: {
      return {
        ...state, isAuth: action.payload
      }
    }

    case SET_USER_PAGE: {
      return {
        ...state,
        user: action.payload
      }
    }
    case SET_ERROR_STATE: {
      return {
        ...state,
        isError: action.payload
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
    type: 'barApp/AppReducer/setIsFetch',
    payload: isFetch
  } as const),
  setUserPage: (userPage: userPageType) => ({
    type: "barApp/AppReducer/setUserPage",
    payload: userPage
  } as const),
  toggleTheme: () => ({
    type: "barApp/AppReducer/toggleTheme"
  } as const),
  setErrorState: (isError: boolean) => ({
    type: "barApp/AppReducer/setErrorState",
    payload: isError
  } as const)

}

export const initializeThunk = () => {
  return async function (dispatch: any) {

    const auth = getAuth()
    await onAuthStateChanged(auth, async (user) => {


      let userPage = await authApi.getUserByID(user?.uid as string);

      if (userPage) {
        dispatch(app_actions.setUserPage(userPage as userPageType))
        dispatch(app_actions.setInit(true))
        dispatch(app_actions.setAuth(true))

      } else {
        dispatch(app_actions.setInit(true))

      }
    });
  }
}

export const loginByEmailAndPassword = (email: string, password: string) => {
  return async function (dispatch: any) {
    const userID = await authApi.loginWithEmailAndPassword(email, password);

  }
}

export const logOutThunk = () => {
  return async function (dispatch: any) {
    const auth = getAuth()
    await signOut(auth)
    dispatch(app_actions.setAuth(false))
  }
}


// Google signin POPUP thunk action
export const signInWithGooglePopUp = () => {
  return async function (dispatch: any) {
    // Signing in With Google PopUp Freibase functions
    // If function doint trow an error it returns user object
    const user = await authApi.loginInWithPopUp();
    // Check if user fetch success
    if (user) {
      // Set auth state true and set user page into the store
      dispatch(app_actions.setAuth(true));
      dispatch(app_actions.setUserPage(user as userPageType));
    }
    else {
      dispatch(app_actions.setAuth(false));
    }

  }
}