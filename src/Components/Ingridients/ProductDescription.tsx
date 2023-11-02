// React,ReactHooks
import { Dispatch, useState } from "react"
// Styles and Assets
import "../../Assets/Styles/PeoduxtCard.css";
// Redux,Reducers
import { useDispatch } from "react-redux";
import { productActions } from "../../Redux/ProductReduxer";


// Define a `props` type to component
type propsType = {
    setState: Dispatch<{ type: string, payload: any }>,
    isEditMode: boolean,
    description: string
}

/**
 * 
 * @param props propsType
 * ProductCard Description component
 * Render actual card description and set them if 'EditMode' is enabled
 * 
 * @returns React.Ellement
 */

export const ProductDescription = (props: propsType) : React.ReactElement => {
    // Is Description Opened
    // Shoow <p></p> ellement if true anoterwose just render the Button
    let [isOpened, setIsOpened] = useState<boolean>(false);

    const dispatch: any = useDispatch();
    // Description open Toggler function
    function toggle() {
        setIsOpened(!isOpened);
    }
    // OnChange event handler that we use in textarea if props.isEditMode === true
    function onChangeHandler(event: React.SyntheticEvent<HTMLTextAreaElement>) {
        dispatch(productActions.updateDescription(event.currentTarget.value));
    }
 
    if (!isOpened) {
        // Render Description or textarea to Edit descritpion
        return (
            <section >
                <button onClick={toggle}>Dscription</button>
                {!props.isEditMode ? <p className="composition">{props.description}</p> :
                    <textarea
                        onChange={onChangeHandler}
                        className="description-textarea"
                        value={props.description}></textarea>}
            </section>
        )
    }
    else {
        return (
            <button onClick={toggle}>Description</button>
        )
    }

}