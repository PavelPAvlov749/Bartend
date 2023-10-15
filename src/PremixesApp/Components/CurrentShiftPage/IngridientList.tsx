// Styles
import "../../../Styles/BlamkShift.css"
// Components
import { IngridentsItem } from "./IngridentItem";




export const IngridientList = (props: { ingridients: any[], setState: any }) => {

    return (
        <section className="product_list_container ">
            {props.ingridients.map((el: any) => {
                return (
                    <>
                        <IngridentsItem itemId={el.id as string} name={el.name} toggle={props.setState} isDone={el.isDone as boolean} />
                    </>
                )
            })}

        </section>
    )
}