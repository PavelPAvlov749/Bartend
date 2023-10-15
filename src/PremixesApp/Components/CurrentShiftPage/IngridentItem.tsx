
type IngridientsListItem = {
    name: string,
    isDone: boolean,
    itemId: string,
    toggle : any
}

export let IngridentsItem = (props: IngridientsListItem,) => {

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
