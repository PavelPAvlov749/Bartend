import { authApi } from "../services/Firebase/AuthAPI";
import { InferActionType } from "./Store";


const SET_NICKNAME = "barApp/registartionReducer/setNickname"
const SET_COMPANY_NAME = "barApp/registartionReducer/setCompanyName"
const SET_EMAIL = "barApp/registartionReducer/setEmail"
const SET_PASSWORD = "barApp/registartionReducer/setPassword"
const SET_REPEAT_PASSWORD = "barApp/registartionReducer/setRepeatPassword"

type initial_state_type = {
    nickName : string,
    password : string,
    companyName : string,
    repeatPassword : string,
    email : string
}
const initial_state : initial_state_type = {
    nickName : "",
    password : "",
    repeatPassword : "",
    companyName : "",
    email : ""

}

//Acrtion types
type Action_Type = InferActionType<typeof RegistrationActions>;

export const newUserReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        
        case SET_NICKNAME : {
            return {
                ...state,
                nickName : action.payload
            }
        }
        case SET_COMPANY_NAME : {
            return {
                ...state,
                companyName : action.payload
            }
        }
        case SET_EMAIL : {
            return {
                ...state,
                email : action.payload
            }
        }
        case SET_REPEAT_PASSWORD : {
            return {
                ...state,
                repeatPassword : action.payload
            }
        }
        case SET_PASSWORD : {
            return {
                ...state,
                password : action.payload
            }
        }
        default:
            return state
    }
}

export const RegistrationActions = {
    setNickName : (nickName : string) => ({
        type : "barApp/registartionReducer/setNickname",
        payload : nickName
    } as const ),
    setPassword : (password :string) => ({
        type : "barApp/registartionReducer/setPassword",
        payload : password
    } as const ),
    setRepeatPassword : (password : string) => ({
        type : "barApp/registartionReducer/setRepeatPassword",
        payload : password
    } as const ),
    setCompanyName : (companyName : string) => ({
        type : "barApp/registartionReducer/setCompanyName",
        payload : companyName
    } as const ),
    setEmail : (email : string) => ({
        type : "barApp/registartionReducer/setEmail",
        payload : email
    } as const )
}

export const createNewAdminUser = (user : initial_state_type) => {
    return async function (dispatch : any) {

    }
}
export const createNewUserByEmailAndPassword = (nickName : string,email : string,password : string) => {
    return async function (dispatch : any) {
        await authApi.createUserWithEmailAndPassword(email,nickName,password);
    }
}