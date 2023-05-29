import { InferActionType } from "./Store";
import { ProfileType } from "./Types";
import avatar from "../Assets/1000.jpg"
import { Firestore_instance } from "../Firebase/PremixesAPI";
import { app_actions } from "./AppReducer";

const SET_CLAN_LIST = "barApp/clanReducer/setDlanList"
const SET_SEARCHED_CLAN_NAME = "barApp/clanReducer/setSearchedClanList"
const SET_NEW_CLAN_NAME = "barApp/clanReducer/setNewClanName"
const SET_JIONED_CLANS = "barApp/clanReducer/setJoinedClans"

export type ClanType = {
    clanName : string,
    clanID : string,
    clanAvatar : string,
    users  : string[]
}
type initial_state_type = {
    clanList : ClanType[],
    searchedClanName : string,
    newClanName : string,
    joinedClans : ClanType[]
}

let initial_state : initial_state_type = {
    clanList : [],
    searchedClanName : "",
    newClanName : "",
    joinedClans : []

}

//Acrtion types
type Action_Type = InferActionType<typeof clanActions>;

export const clanReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        case SET_CLAN_LIST : {
            return {
                ...state,
                clanList : action.payload
            }
        }
        case SET_JIONED_CLANS : {
            return {
                ...state,
                joinedClans : action.payload
            }
        }
        case SET_NEW_CLAN_NAME : {
            return {
                ...state,
                newClanName : action.payload
            }
        }
        case SET_SEARCHED_CLAN_NAME : {
            return {
                ...state,
                searchedClanName : action.payload
            }
        }
        default:
            return state
    }
}

export const clanActions = {
  setClanLit : (clanList : ClanType[]) => ({
    type : "barApp/clanReducer/setDlanList",
    payload : clanList
  } as const),
  setSearchedClanName : (name : string) => ({
    type : "barApp/clanReducer/setSearchedClanList",
    payload : name
  } as const),
  setNewClanName : (name : string) => ({
    type : "barApp/clanReducer/setNewClanName",
    payload : name
  } as const),
  setJoinedClans : (clans : ClanType[]) => ({
    type : "barApp/clanReducer/setJoinedClans",
    payload : clans
  } as const)

}

export const createClanThunk = (name : string,userID : string,userName : string) => {
    return async function (dispatch : any) {
        await Firestore_instance.createTheClan(name,userID,userName)
        
    }
}

export const getClanListByUserID = (userID : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let clans = await Firestore_instance.getClansByUserID(userID)
        if(clans) {
            dispatch(clanActions.setJoinedClans(clans))
            dispatch(app_actions.setFetch(false))
        }
    }
}

export const getAllClans = () => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let clans = await Firestore_instance.getClanList()
        dispatch(clanActions.setClanLit(clans as ClanType[]))
        dispatch(app_actions.setFetch(false))
    }
}

export const joinTheClan = (userID : string,userName : string,clanID : string,clanName:string) => {
    return async function (dispatch : any) {
        await Firestore_instance.joinTheClan(userID,userName,clanID,clanName)
        
    }
}