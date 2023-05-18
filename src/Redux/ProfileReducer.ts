import { InferActionType } from "./Store";
import { ProfileType } from "./Types";
import avatar from "../Assets/1000.jpg"

const SET_PROFILE = "barApp/profileReducer/setProfile"



let initial_state : ProfileType = {
    avatar : null,
    companyName : "GrandRoyal",
    premixes : null,
    coctails : null

}

//Acrtion types
type Action_Type = InferActionType<typeof profileActions>;

export const profileReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
      case SET_PROFILE : {

        return {
            ...state,...action.payload
        }
      }
        default:
            return state
    }
}

export const profileActions = {
  setProfile : (profile : ProfileType) => ({
    type : "barApp/profileReducer/setProfile",
    payload : profile
  } as const)

}

export const getProfileThunk = () => {
    return function (dispatch : any) {
        let profile = {
            avatar : avatar,
            companyName : "GrandRoyal",
            premixes :  [{}],
            coctails : [{}]
        }
        dispatch(profileActions.setProfile(profile))
    }
}