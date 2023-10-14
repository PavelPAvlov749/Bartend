
import { productType } from "../../Redux/Types";
import "../../Styles/BlamkShift.css"

import { IngridentsItem } from "./IngridentItem";




export const IngridientList = (props: { ingridients: any[],setState : any }) => {

    console.log(props.ingridients)
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