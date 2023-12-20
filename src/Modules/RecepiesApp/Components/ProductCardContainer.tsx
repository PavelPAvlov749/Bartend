// React,React hooks
import { Suspense, useReducer } from "react";
// Components
import { ProductCard } from "./ProductCard";
import { Editor } from "./Editor";
import { Preloader } from "../../PremixesApp/Components/Preloader";
import { DotsMenu } from "./Menu";
// Styles and Assets
import "../../../Assets/Styles/PeoduxtCard.css";
// Redux 
import { Reducer } from "./Reducer";
import { productType } from "../../../Redux/Types";
// Custom hooks
import { useProductCard } from "./UseProductCard";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../../Redux/Store";




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
    // get uer team ID to compare with prdocut teamID
    let userTeamID: string | null = useSelector((state: Global_state_type) => state.App.user.teamID);
    // Get product team ID
    let productTeamID: string | undefined = useSelector((state: Global_state_type) => state.premixes.actualProductCard?.teamID);
    // Check if card not equals to null
    if (card) {
        return (

            <section className={`product_card container translate_animation`}>

                <h1 className="card__tittle">{card?.name}</h1>
                {/* Render dots menu depending on result of comparison teamID and userTeamID */}
                {/* If user currrent user not belong to team that create this product he cannot edit or delete prdocut card */}
                {/* Pass Edit mode toggler into Menu component props */}
                {userTeamID === productTeamID ? <DotsMenu isEditMode={isEditMode.isEditMode} setEditMode={setEditMode} card={card as productType} />
                    : null}

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