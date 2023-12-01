// React,ReactHooks
import { useDispatch } from "react-redux"
// Redux,Actions
import { AnyAction, Dispatch } from "redux";
import { productActions } from "../../../Redux/ProductReduxer";
// Types
import { ReactNode, useState } from "react";
import { productType } from "../../../Redux/Types"
// Custom hooks
import { useInput } from "../../ChecklistApp/Components/Hooks.";


// DECLARE PROP TYPE

// -----------------
type EditorPropType = {
    card: productType,
}

/** 
 * Product card editor component
 * 
 * Render only when the isEdit flag is true
 * 
 * @param props card : prdocuctType
 * @returns ReactEllement
 */

export const Editor: React.FC<EditorPropType> = (props: EditorPropType) => {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    // Textarea onChange handler
    function onChange(event: React.SyntheticEvent<HTMLTextAreaElement>) {
        dispatch(productActions.updateDescription(event.currentTarget.value));
    };
    // Delete handler function 
    function deleteHandler(event: React.SyntheticEvent<HTMLSpanElement>) {
        dispatch(productActions.deleteComponent(event.currentTarget.id));
    };
    // Compoennts to be added state from useInput custom Hook
    let [input, setInput] = useInput("Name", "Type name");
    // New ingridient state
    let [key, setKey] = useState("");
    let [value, setValue] = useState("");
    // Add component Handler
    function addComponent() {
        dispatch(productActions.addComonent({ [key]: value }));
        setValue("");
        setKey("");
    }
    
    return (
        <section className="editor">
            <h3 className="editor__tittle">Description : </h3>
            <textarea
                onChange={onChange}
                className="editor__desctiption-textarea"
                // Get actual value from store -> prpops
                value={props.card.description}>
            </textarea>
            <h3 className="editor__tittle">Composition : </h3>

            <ul className="editor__composition">
                {props.card.composition.map((el: {}, index: number, array: {}[]) => {
                    return (
                        <li className="editor__item">
                            <span>{Object.keys(el)[0] + " : "}</span>
                            <span >{Object.values(el)[0] as ReactNode}</span>
                            {/* DELETE BUTTON */}
                            <span
                                id={Object.keys(el)[0]}
                                className="editot__component__delete"
                                onClick={deleteHandler}>Delete</span>
                            <br />
                        </li>)
                })}
            </ul>
            {/* Render inputs */}
            <div className="editor__newcomponent-input">
                {/* KEY INPUT */}
                <input type="text"
                 value={key} placeholder="Name" 
                 onChange={(e : React.SyntheticEvent<HTMLInputElement>) => {setKey(e.currentTarget.value)}}/>
                 {/* VAKUE INPUT */}
                <input type="text"
                 value={value} 
                 placeholder="Value"
                 onChange={(e : React.SyntheticEvent<HTMLInputElement>) => {setValue(e.currentTarget.value)}} />
            </div>
            <button onClick={addComponent}>Add</button>
        </section>
    )
}