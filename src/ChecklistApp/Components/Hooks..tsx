// React,Hooks
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react"

// Redux,Redux-thunks

type inputEventType = React.SyntheticEvent<HTMLInputElement>;
type setStateType = Dispatch<SetStateAction<string>>;

/**
//  * INPUTS HOOK
 * 
 * @param value default value <string>
 * @param placeholder input placeholder text <string>
 * @returns InputElement : input element : <ReactNode>
 *          state : actual state value : <string>
 *          setState : Dispatch<SetStateAction<string>>
 */

export const useInput = (value: string = "", placeholder: string): [ReactNode, string,setStateType] => {
    // Input state set default from params
    const [state, setState] = useState("");

    // On changeHandler tah will be passed into input 
    function onChangeHandler(event: inputEventType) {
        setState(event.currentTarget.value);
    };

    let InputElement = <input placeholder={placeholder} value={state} onChange={onChangeHandler} maxLength={100}/>;

    // Return typple with 3 elements [input,state,setState]
    return [InputElement, state, setState];


}

/**
 * VALIDATOR HOOK
 * 
 * @param regExp pattern to validate
 * @returns tupple [isError,ErrorText,vslidate function]
 * 
 */
export const useValidator = (regExp : RegExp) : [boolean,string,(val : string) => void] => {
    // Boolean error flag
    let [isError,setError] = useState<boolean>(false);
    // error message text
    let [errorText,setErrorText] = useState<string>("");
    
    // Define a pattern to validate frpm params
    let pattern = regExp;

    function validate (value : string) {
        if(!pattern.test(value))
        {
            setError(true);
            setErrorText("Error : invalid input");
        }
    }

    return [isError,errorText,validate]
}