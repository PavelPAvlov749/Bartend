import { useState } from "react"
import { productType } from "../../Redux/Types"
import { useDispatch } from "react-redux"
import { blanksActions } from "../../Redux/BlankShiftReducer"

type IngridientsListItem = {
    name: string,
    toggleItem?: (el : productType) => void,
    isDone: boolean,
    itemId: string,
}

export let IngridentsItem = (props: IngridientsListItem) => {

    return (
        <li>
            <span>{props.name}</span>
            <span id={`setDoneBtn`} onClick={() => {
                // props.toggleItem()
            }}>{props.isDone ? "В процессе" : "Готово"}</span>
        </li>
    )
        }
// export const UseIngrideintsItem = (ingridients: productType[]) => {




// }



// return <IngridentsItem />
// }