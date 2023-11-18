import { checkListType } from "../../../Redux/CheckListReducer";
import { productType } from "../../../Redux/Types";


type ActionType = {
    type: string,
    payload: string
}

export const Reducer  = (state: checkListType, action: ActionType) => {
    switch (action.type) {
            case "remove-task" : {
                return {
                    ...state,
                    tasks : state.tasks.filter((el : string) => el !== action.payload)
                }
            }
            case 'add-task' : {
                return {
                    ...state,
                    tasks : state.tasks.push(action.payload)
                }
            }
            default:
                return state
        }
    }