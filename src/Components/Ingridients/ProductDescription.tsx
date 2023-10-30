import { Dispatch, useState } from "react"
import "../../Assets/Styles/PeoduxtCard.css";


type propsType = {
    setState: Dispatch<{ type: string, payload: any }>,
    isEditMode: boolean,
    description: string
}

export const ProductDescription = (props: propsType) => {
    let [isOpened, setIsOpened] = useState<boolean>(false);

    function toggle() {
        setIsOpened(!isOpened);
    }

    if (!isOpened) {
        return (
            <section >
                <button onClick={toggle}>Описание</button>
                {!props.isEditMode ? <p >{props.description}</p> : <textarea className="description-textarea" value={props.description}></textarea>}
            </section>
        )
    }
    else 
    {
        return (
            <button onClick={toggle}>Описание</button>
        ) 
    }

}