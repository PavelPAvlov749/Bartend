// React,React hooks
import { Suspense, useReducer } from "react";
// Components
import { ProductCard } from "./ProductCard";
import { Editor } from "./Editor";
import { Preloader } from "../../Modules/PremixesApp/Components/Preloader";
import { DotsMenu } from "./Menu";
// Styles and Assets
import "../../Assets/Styles/PeoduxtCard.css";
// Redux 
import { Reducer } from "./Reducer";
import { productType } from "../../Redux/Types";
// Custom hooks
import { useProductCard } from "./UseProductCard";




/**
 * productCard Container Compoennt
 * @returns React.Ellement
 */

export const ProductCardContainer = () => {
    // Get data from hook
    let card = useProductCard();
    // General reducer for all chil compoennt
    // Toogle card Editing mode
    let [isEditMode, setEditMode] = useReducer(Reducer, { isEditMode: false });
    // Check if card not equals to null
    if (card) {
        return (

            <section className={`product_card container translate_animation`}>

                <h1>{card?.name}</h1>
                {/* Pass Edit mode toggler into Menu component props */}
                <DotsMenu isEditMode={isEditMode.isEditMode} setEditMode={setEditMode} card={card as productType} />
                {isEditMode.isEditMode ?
                // Render Editor compomnent if Editing
                    <Editor card={card as productType} />
                    :
                // Or render prdocut card information
                    <ProductCard isEditMode={isEditMode} setEditMode={setEditMode} card={card} />
                }

            </section>

        )
    }
    // Anotherwise reutn Preloader
    else {
        return <Preloader />
    }

}