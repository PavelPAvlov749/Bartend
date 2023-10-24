

type IngridientsListItem = {
    name: string,
    isDone: boolean,
    itemId: string,
    toggle: any
}

export let IngridentsItem = (props: IngridientsListItem,) => {
    return (
        <li key={props.itemId}>
            <a href={"#/card/id=" + props.itemId}>
                <span>{props.name}</span>
            </a>
            <span onClick={() => {
                    console.log("Click");
                    props.toggle(props.itemId);
                }}>{!props.isDone ? "В процессе" : "Готово"}</span>
        </li>
    )
}
