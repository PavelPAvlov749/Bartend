import { InferActionType } from "./Store";
import { app_actions } from "./AppReducer";
import { TeamModuleAPI } from "../services/Firebase/TeamAPI";

const SET_CLAN_LIST = "barApp/clanReducer/setDlanList"
const SET_SEARCHED_CLAN_NAME = "barApp/clanReducer/setSearchedClanList"
const SET_NEW_TEAM_NAME = "barApp/clanReducer/setNewClanName"
const SET_NEW_TEAM_DESCRIPTION = "barApp/clanReducer/setNewTeamDescription"

const SET_JIONED_CLANS = "barApp/clanReducer/setJoinedClans"
const LEAVE_THE_TEAM = "barApp/clanReducer/leaveTheTeam"
export type ClanType = {
    teamName : string,
    teamID : string,
    teamAvatar : string | null,
    users  : string[],
    description : string | null
    
}
type initial_state_type = {
    team : ClanType | null,
    searchedTeamName : string,
    newTeam : {
        newTeamName : string | null,
        newTeamDescription : string | null,
        
    },
    teamList : ClanType[]
}

let initial_state : initial_state_type = {
    team : null as unknown as ClanType,
    searchedTeamName : "",
    newTeam : {
        newTeamName : null,
        newTeamDescription : null,
        
    },
    teamList : []
    

}

//Acrtion types
type Action_Type = InferActionType<typeof clanActions>;

export const clanReducer = (state = initial_state, action: Action_Type) => {
    switch (action.type) {
        case SET_CLAN_LIST : {
            return {
                ...state,
                teamList : action.payload
            }
        }
        case SET_JIONED_CLANS : {
            return {
                ...state,
                team : action.payload
            }
        }
        case SET_NEW_TEAM_NAME : {
            return {
                ...state,
                newTeam : {...state.newTeam,newTeamName : action.payload}
            }
        }
     
        case SET_NEW_TEAM_DESCRIPTION : {
            return {
                ...state,
                newTeam : {...state.newTeam,newTeamDescription : action.payload}
            }
        }
        case SET_SEARCHED_CLAN_NAME : {
            return {
                ...state,
                searchedClanName : action.payload
            }
        }
        case LEAVE_THE_TEAM : {
            return {
                ...state,
                team  : null
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
  setTeam : (team : ClanType) => ({
    type : "barApp/clanReducer/setJoinedClans",
    payload : team
  } as const),

  setNewTeamDiescription : (description : string) => ({
    type : "barApp/clanReducer/setNewTeamDescription",
    payload : description
  } as const),
  leaveTheTeam : () => ({
    type : "barApp/clanReducer/leaveTheTeam"
  } as const)

}

export const createClanThunk = (team : {newTeamName : string,newTeamDescription : string,},userID : string,userName : string) => {
    return async function (dispatch : any) {
        await TeamModuleAPI.createTheClan(team,userID,userName)
        let newTeam = await TeamModuleAPI.getClansByUserID(userID)
        if(team) {
            dispatch(clanActions.setTeam(newTeam))
            dispatch(app_actions.setFetch(false))

        }
        
    }
}

export const getClanListByUserID = (userID : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let team = await TeamModuleAPI.getClansByUserID(userID)
        if(team) {
            dispatch(clanActions.setTeam(team))
            dispatch(app_actions.setFetch(false))

        }
    }
}

export const getAllClans = () => {
    return async function (dispatch : any) {
        dispatch(app_actions.setFetch(true))
        let clans = await TeamModuleAPI.getClanList()
        dispatch(clanActions.setClanLit(clans as ClanType[]))
        dispatch(app_actions.setFetch(false))
    }
}

export const joinTheClan = (userID : string,userName : string,clanID : string,clanName:string) => {
    return async function (dispatch : any) {
        await TeamModuleAPI.joinTheClan(userID,userName,clanID,clanName)
        
    }
}

export const leaveTheTeam = (teamID : string,userID : string,userName : string) => {
    return async function (dispatch : any) {
      
        await TeamModuleAPI.leavetheTeam(teamID,userID,userName)
        dispatch(clanActions.leaveTheTeam())
        
    }
}