


type ProdcustItemItemType = {
    name: string,
    isChecked: boolean,
    id: string,
    toggleFunction: (action : {type : string,payload : string}) => void
}


export const ProdcustItem = (props: ProdcustItemItemType) => {
    function toggle() {
        props.toggleFunction({
            type: 'toggle-item',
            payload: props.id
        });
    }
    return (
        <li key={props.id}
            className={props.isChecked ? `checked_element` : `unchecked_element`}
            onClick={toggle} id={props.id}>

            <span>{props.name}</span>
        </li>
    )
}