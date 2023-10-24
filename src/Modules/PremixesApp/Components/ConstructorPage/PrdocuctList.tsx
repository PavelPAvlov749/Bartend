// Coponents
import { ProdcustItem } from "./PrroductItem"
// Types
import { productType } from "../../../../Redux/Types"


type prdocuctListType = {
    products: productType[],
    dispatch : (action : {type : string,payload : string}) => void
}


export const ProductList = (props: prdocuctListType) => {
    return (
        <ul>
            {props.products.map((el: productType) => {
                 return (
                    <ProdcustItem name={el.name} isChecked={el.checked as boolean} toggleFunction={props.dispatch} id={el.id as string} />
                )
            })}
        </ul>
    )
}