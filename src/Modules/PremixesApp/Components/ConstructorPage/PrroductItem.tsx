
type ProdcustItemItemType = {
    name: string,
    isChecked: boolean,
    id: string,
    toggleFunction: (action: { type: string, payload: string }) => void
}


export const ProdcustItem = (props: ProdcustItemItemType) => {

    function toggle(id: string) {
        props.toggleFunction({
            type: 'toggle-item',
            payload: id
        })
    }
    return (
        <li key={props.id}
            // Is element checked flag
            className={props.isChecked ? `checked_element` : `unchecked_element`}
            onClick={() => { toggle(props.id) }} id={props.id}>

            <span>{props.name}</span>
        </li>
    )
};