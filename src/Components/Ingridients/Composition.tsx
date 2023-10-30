
import { useState } from "react"
import { parseComposition } from "../../Helpers/Helpers";


type ProductCompositionType = {
    isEditMode : boolean,
    composition : {},

}


export const ProductComposition = (props : ProductCompositionType) => {
    let [state,setState] = useState<boolean>(false);
    function toggle () {
        setState(!state);
    }
    console.log(parseComposition(props.composition));
    if(!state)
    {
        return (
            <button onClick={toggle}>Composition</button>
        )
    }
    else 
    {
        return (
            <section>
                 <button onClick={toggle}>Composition</button>
                {!props.isEditMode ? <p>{parseComposition(props.composition)}</p> : 
                <section className="card-editor">
                    {Object.keys(props.composition).map((el : {},index : number) => {
                        console.log(Object.values(props.composition)[index])
                        return (
                            <>
                                <div className="editor-component">
                                    <span>{Object.keys(props.composition)[index]}</span> :
                                     <span>{Object.values(props.composition)[index] as string}</span>
                                     <span className="editot__component__delete">Delete</span>
                                </div>
                            </>
                        )
                    })}
                </section>}
            </section>
        )
    }


}