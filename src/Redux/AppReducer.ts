import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { InferActionType } from "./Store";
import { userPageType } from "./Types";
import { authApi } from "../services/Firebase/AuthAPI";
import { TeamModuleAPI } from "../services/Firebase/TeamAPI";


// ACTION TYPES 
// -----------------------
// 
const SET_INIT = "barApp/appReducer/setInit"; //Initialize
const SET_AUTH = "barApp/appReducer/setAuth"; //Auth state
const SET_USER_PAGE = "barApp/AppReducer/setUserPage"; //Authorized user page
const SET_IS_FETCH = "barApp/AppReducer/setIsFetch"; //Data fetching boolean flag
const SET_ERROR_STATE = "barApp/AppReducer/setErrorState"; //Error boolean flag
const SET_ERROR_MESSAGE = "barApp/AppReducer/setErrorMessage"; //Error message
// 
// -----------------------



// DEFINE AN INITIAL STATE TYPE

interface IState  {
  user: userPageType,
  isAuth: boolean,
  isInit: boolean,
  isFetch: boolean,
  isError: boolean,
  errorMessage : string | null
}

let initial_state: IState = {
  user: {
    userID: null,
    userName: null,
    team: "",
    teamID: ""
  },
  isInit: false,
  isAuth: false,
  isFetch: false,

  isError: false,
  errorMessage : null
}

//Get action types
type Action_Type = InferActionType<typeof app_actions>;

export const appReducer = (state = initial_state, action: Action_Type) => {
  switch (action.type) {

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
    case SET_ERROR_MESSAGE : {
      return {
        ...state,
        errorMessage : action.payload
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
  } as const),
  setErrorMessage : (errorMessage : string) => ({
    type : "barApp/AppReducer/setErrorMessage",
    payload : errorMessage
  } as const)

}


// Initialize Application ThunkAcrion
// Check Auth state and get user data
export const initializeThunk = () => {
  return async function (dispatch: any) {
    dispatch(app_actions.setInit(false))
    const auth = getAuth();
    // Check Fireabse Auth State
    await onAuthStateChanged(auth, async (user) => {
      // If user authorized get userOage from firestore
      if (user) {
        let isUserExist = await authApi.isUserExist(user.uid);
        if (isUserExist) {
          let userPage = await authApi.getUserByID(user?.uid as string);
          let team : any = await TeamModuleAPI.getTeamNameByUserID(user.uid);

          dispatch(app_actions.setUserPage({...userPage,...team}));
          // Set auth state in redux state
          dispatch(app_actions.setInit(true));
          dispatch(app_actions.setAuth(true));
        }
        else {
          await authApi.createUserFromGoogleCredentials(user.uid, user.displayName as string)
            .then( async (res) => {
              let userPage = await authApi.getUserByID(user?.uid as string);
              dispatch(app_actions.setUserPage(userPage as userPageType));
              // Set auth state in redux state
              dispatch(app_actions.setInit(true));
              dispatch(app_actions.setAuth(true));
            })

        }
      }
      else {
        dispatch(app_actions.setInit(true));
      }
    });
  }

}
/**
 * 
 * LOGIN BY EMAIL AND PASSWORD.
 *  
 * Passes the email and password parameters
 * to the logoinWithEmailAndPassword function, which inside calls the 
 * Firebase.LoginWidthEmailAndPassword function. If the login is successful, the CheckAuthState 
 * function in the App component will receive an authorized user, otherwise 
 * it will set an error flag about an error message in the AppReducer
 * 
 * @param email string
 * @param password string
 * @returns void
 */
export const loginByEmailAndPassword = (email: string, password: string) => {
  return async function (dispatch: any) {
    // Try to signIn
    const userID = await authApi.loginWithEmailAndPassword(email, password);
    // If loginWithEmailAndPassword returns Error
    // Set error in state
    if(typeof userID !== "string")
    {
      // Get error message
      let errorMEssage = "Error : " + userID.message.split("/")[1].split(")")[0];
      // Set boolean error flag in state
      dispatch(app_actions.setErrorState(true));
      // Set Error Message
      dispatch(app_actions.setErrorMessage(errorMEssage));
    }

  }
}

// LOGOUT THUNK
/**
 * Call signOut function from Firebase forestore library
 * And set auth flab in store
 * 
 * @returns void
 */
export const logOutThunk = () => {
  return async function (dispatch: any) {
    // Get firebase auth instance
    const auth = getAuth();
    // Signing out
    await signOut(auth);
    // Dispatch state
    dispatch(app_actions.setAuth(false));
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