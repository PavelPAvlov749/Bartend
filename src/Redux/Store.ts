import {applyMiddleware,combineReducers} from "redux";
import { legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import { compose } from "redux";
import { appReducer } from "./AppReducer";
import { productReducer } from "./ProductReduxer";
import { newCardReducer } from "./NewCardReducer";
import { blankShiftReducer } from "./BlankShiftReducer";
import { newUserReducer } from "./RegistrationReducer";
import { clanReducer } from "./TeamReducer";
import { checkLisReducer } from "./CheckListReducer";
import { KnowledgeBaseReducer } from "./KnowledgeBaseReducer";




let reducers = combineReducers({
    App : appReducer,
    premixes : productReducer,
    newCard : newCardReducer,
    blankShift : blankShiftReducer,
    newUser : newUserReducer,
    clans : clanReducer,
    chcekLists : checkLisReducer,
    knowledgeBase : KnowledgeBaseReducer
})

type PropertieTypes<T> = T extends {[key:string]:infer U} ? U : never;
export type InferActionType<T extends {[key:string]: (...args:any)=> any}> = ReturnType<PropertieTypes<T>>;
//Type of global reducer
type Root_reducer_type = typeof reducers;
//Recieving a state type from ReturnType from Root_reducer
export type Global_state_type = ReturnType<Root_reducer_type>;

const composeEnhancers = compose;
export const store = createStore(reducers,applyMiddleware(thunk));



//@ts-ignore
window.store = store;
//@ts-ignore
window.newCard = store.getState().premixes.newCard
