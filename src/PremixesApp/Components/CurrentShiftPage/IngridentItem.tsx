
type IngridientsListItem = {
    name: string,
    isDone: boolean,
    itemId: string,
    toggle: any
}

export let IngridentsItem = (props: IngridientsListItem,) => {

    return (
        <li key={props.itemId}>
            <span>{props.name}</span>
            <span onClick={() => {
                console.log("Click");
                props.toggle({
                    type: "toggle",
                    payload: props.itemId
                })
            }}>{!props.isDone ? "В процессе" : "Готово"}</span>
        </li>
    )
}
