const TOGGLE_MODAL_WINDOW = "barApp/teamPage/toggleModalWindow";


type ActionType = {
    type : string,
    payload : any
}
type initialStateType = {
    isModalOpened : boolean
}

export const Reducer = (state : initialStateType,action : ActionType) => {
    switch(action.type) {
        case TOGGLE_MODAL_WINDOW : {
            return {
                ...state,
                isModalOpened : !state.isModalOpened
            }
        }
        default : 
            return state
    }
}