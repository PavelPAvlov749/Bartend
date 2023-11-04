// React,ReactHooks
import {useState } from "react"
// Redux,ThunkActions
import { productType } from "../../Redux/Types";
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
                <p className="composition">{parseComposition(props.composition)}</p>
            </section>
        )
    }


}