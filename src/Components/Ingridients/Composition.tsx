// React,ReactHooks
import React, { ReactNode, useState } from "react"

// Redux,ThunkActions
import { productType } from "../../Redux/Types";
import { useDispatch } from "react-redux";
import { productActions } from "../../Redux/ProductReduxer";

// Helpers
import { parseComposition } from "../../Helpers/Helpers";


// DECLARE PROPS TYPE

// -----------------
type ProductCompositionType = {
    isEditMode: boolean,
    composition: {}[],
    card: productType
}
// -----------------


/**
 * A component displaying the composition of the current product. 
 * And also the product card editor depending on the isEditMode prop
 *
 * @param props {isEditMode : boolean,composition {}[] ,card}
 * 
 * @returns React.Element
 */
export const ProductComposition = (props: ProductCompositionType) => {
    // Hide or show component state
    let [isOpen, setIsOpen] = useState<boolean>(false);

    // Show|Hide toggler function
    function toggle() {
        setIsOpen(!isOpen);
    }

    // Delete component handler 
    const dispatch: any = useDispatch();
    function deleteHandler(event: React.SyntheticEvent<HTMLSpanElement>) {
        dispatch(productActions.deleteComponent(event.currentTarget.id));
    }

    // If isOpen === false render the Show button
    if (!isOpen) {
        return (
            <button onClick={toggle}>Composition</button>
        )
    }

    else {
        return (
            <section>
                <button onClick={toggle}>Composition</button>
                {/* Check isEditMode flag */}
                {!props.isEditMode ? <p className="composition">{parseComposition(props.composition)}</p> :
                // Editor component (Move to separate component later)

                    <ul className="card-editor">
                        {props.composition.map((el: {}, index: number, array: {}[]) => {
                            return (
                                <li className="editor__item">
                                    <span>{Object.keys(el)[0] + " : "}</span>
                                    <span >{Object.values(el)[0] as ReactNode}</span>
                                    <span id={Object.keys(el)[0]} className="editot__component__delete" onClick={deleteHandler}>Delete</span>
                                    <br />
                                </li>
                            )
                        })}

                    </ul>

                }

            </section>
        )
    }


}