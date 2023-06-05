
import { CheckListsAPI } from "../Firebase/CkeckListsAPI";
import { InferActionType } from "./Store";

const SET_CHEK_LISTS = "barApp/CheckListReducer/setCheckLists"


export type checkListType = {
    name : string,
    tasks : string[],
    teamID : string,
    createdAt : typeof Date,
    tasksCounter : number,
    id : string
}
type initial_state_type = {
    checkLists : checkListType[]


}

const initial_state : initial_state_type = {
    checkLists : []
}

//Acrtion types
type Action_Type = InferActionType<typeof checkListActions>;

export const checkLisReducer = (state = initial_state, action: Action_Type) => {
  switch (action.type) {
    case SET_CHEK_LISTS : {
        return {
            ...state,
            checkLists : action.payload
        }
    }
    default:
      return state
  }
}

export const checkListActions = {
    setCheckLists : (checkLists : checkListType[]) => ({
        type : "barApp/CheckListReducer/setCheckLists",
        payload : checkLists
    } as const)
}

export const getCheckListsthunk = (teamID : string) => {
    return async function (dipsatch : any) {
        let checkLists = await CheckListsAPI.getChekLists(teamID as string)
        if(checkLists) {
            dipsatch(checkListActions.setCheckLists(checkLists))
        }else{
            dipsatch(checkListActions.setCheckLists([]))
        }
    }
}




