// React,React hooks
import { useReducer} from "react";
// Components
// Styles and Assets
import "../../Assets/Styles/PeoduxtCard.css";
// Redux 
// ....
// Custom hooks
import { useProductCard } from "./UseProductCard";
// Helpers 
import { ProductDescription } from "./ProductDescription";
import { DotsMenu } from "./Menu";
import { Reducer } from "./Reducer";
import { ProductComposition } from "./Composition";
import { ProdicuCalculater } from "./ProductCalculator";
import { productType } from "../../Redux/Types";


/**
 * productCard Container Compoennt
 * @returns React.Ellement
 */

export const ProductCard = () => {
    // Get data from hook
    let card = useProductCard();
    // General reducer for all chil compoennt
    // Toogle card Editing mode
    let [isEditMode,setEditMode] = useReducer(Reducer,{isEditMode : false});

    return (

        <section className={`product_card container translate_animation`}>
            <h1>{card?.name}</h1>
            {/* Pass Edit mode toggler into Menu component props */}
            <DotsMenu isEditMode={isEditMode.isEditMode} setEditMode={setEditMode} card={card as productType}/>
            {card && <ProductDescription isEditMode={isEditMode.isEditMode} setState={setEditMode} description={card?.description}/>}
            {card && <ProductComposition card={card} isEditMode={isEditMode.isEditMode} composition={card?.composition as {}[]} />}
            {card && <ProdicuCalculater product={card}/>}
        </section>

    )
}