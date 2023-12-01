import React from "react";

// Define a props type
type ButtonPropsType = {
    text : string,
    id? : string,
    className? : string,
    callback? : (event : React.SyntheticEvent) => void,
    type? : "button" | "submit"
    
}

/**
 * Unique Button component as
 * @param text text to render as child
 * @param id id for DOM node
 * @param clasName dom node classname
 * @param callback onclick callback function
 * 
 * @returns React.Ellement 
 */
export const UIButton : React.FC<ButtonPropsType> = (props : ButtonPropsType,params?) => {
    return (
        <button
            id={props.id}
            type={props.type}
            className={props.className}
            onClick={props.callback}
        >
            {props.text}
        </button>
    )
}