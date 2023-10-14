import { useState } from "react"

type IngridientsListItem = {
    name: string,
    isDone: boolean,
    itemId: string,
    toggle : any
}

export let IngridentsItem = (props: IngridientsListItem,) => {
    const [state, setState] = useState(false);

    return (
        <li>
            <span>{props.name}</span>
            <span onClick={() => {
                // setState(!state);
                props.toggle({
                    type : "toggle",
                    payload : props.itemId
                })
            }}>{!props.isDone ? "В процессе" : "Готово"}</span>
        </li>
    )
}
