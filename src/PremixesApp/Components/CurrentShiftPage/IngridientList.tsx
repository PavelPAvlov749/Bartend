// Styles
import { productType } from "../../../Redux/Types";
import "../../../Styles/BlamkShift.css"
// Components
import { IngridentsItem } from "./IngridentItem";




export const IngridientList = (props: { ingridients: productType[], setState: React.Dispatch<any> }) => {

    return (
        <section className="product_list_container ">
            <ul className="products__list">
                {props.ingridients.map((el: any) => {
                    return (
                        <>
                            <IngridentsItem key={el.itemId} itemId={el.id as string} name={el.name} toggle={props.setState} isDone={el.isDone as boolean} />
                        </>
                    )
                })}
            </ul>
        </section>
    )
}