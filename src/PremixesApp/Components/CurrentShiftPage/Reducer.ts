

type ActionType = {
    type: string,
    payload: string
}

// FIX ANY[] LATER
export const Reducer  = (state: any[], action: ActionType) => {
    switch (action.type) {
        case "toggle" : {
            return [
                ...state.map((el: any) => {
                    if(el.id === action.payload) {
                        return {...el,isDone : !el.isDone};
                    }
                    return el
                })
            ]
        }
        default:
            return state
    }
}