const TOGGLE_EDIT_MODE = "toggleEditMode";


type ActionType = {
    type : string,
    payload : any
}
type initialStateType = {
    isEditMode : boolean
}

export const Reducer = (state : initialStateType,action : ActionType) => {
    switch(action.type) {
        case TOGGLE_EDIT_MODE : {
            return {
                ...state,
                isEditMode : !state.isEditMode
            }
        }
        default : 
            return state
    }
}