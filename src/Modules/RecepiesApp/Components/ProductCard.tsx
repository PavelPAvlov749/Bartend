// TYPES
import { useNavigate } from "react-router-dom"
import { useProductFilter } from "../../../Helpers/CustomHooks"
import { productType } from "../../../Redux/Types"
import { RecepiesList } from "../RecepiesList"
// Components
import { ProductComposition } from "./Composition"
import { DotsMenu } from "./Menu"
import { ProdicuCalculater } from "./ProductCalculator"
import { ProductDescription } from "./ProductDescription"

// DEFINE A PROP TYPE
// ------------------
type CardPropsType = {
    isEditMode : {isEditMode : boolean},
    setEditMode : any,
    card : productType,
}
// -----------------

/**
 * Render product card page if isEditMode equals to false in parent component
 * @param props CardPropdType
 * @returns React.Element
 */

export const ProductCard : React.FC<CardPropsType> = (props : CardPropsType) => {
    const [products,filterProducts] = useProductFilter('');
    const navigate = useNavigate();
    const windoWidth = window.innerWidth;
    console.log(windoWidth)
    return (
        <section className="product_card__page">
            <section className="card_section">
            <ProductDescription isEditMode={props.isEditMode.isEditMode} setState={props.setEditMode} description={props.card?.description as string} />
            <ProductComposition card={props.card as productType} isEditMode={props.isEditMode.isEditMode} composition={props.card?.composition as {}[]} />
            <ProdicuCalculater product={props.card} />
            </section>
            {windoWidth > 850 ?
            <section className="list">
            <RecepiesList navigate={navigate} recepies={products}/>
            </section> : null}
        </section>
    )

}