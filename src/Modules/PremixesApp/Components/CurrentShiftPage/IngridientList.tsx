// Styles
import { productType } from "../../../../Redux/Types";
import "../../../../Assets/Styles/BlamkShift.css"
// Components
import { IngridentsItem } from "./IngridentItem";




export const IngridientList = (props: { ingridients: productType[], setState: React.Dispatch<any> }) => {
    console.log(props);
    function toogleItem (id : string ) {
        // Define an action object
        let action = {
            type : 'toggle',
            payload : id
        }
        // Pass action into the set state
        props.setState(action);
    }
    return (
        <section className="product_list_container ">
            <ul className="products__list">
                {props.ingridients.map((el: any) => {
                    return (
                        <>
                            <IngridentsItem key={el.itemId} itemId={el.id as string} name={el.name} toggle={toogleItem} isDone={el.isDone as boolean} />
                        </>
                    )
                })}
            </ul>
        </section>
    )
}