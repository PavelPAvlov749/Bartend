// TYPES
import { productType } from "../../Redux/Types"
// Components
import { ProductComposition } from "./Composition"
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
    return (
        <>
            <ProductDescription isEditMode={props.isEditMode.isEditMode} setState={props.setEditMode} description={props.card?.description as string} />
            <ProductComposition card={props.card as productType} isEditMode={props.isEditMode.isEditMode} composition={props.card?.composition as {}[]} />
            <ProdicuCalculater product={props.card} />
        </>
    )

}