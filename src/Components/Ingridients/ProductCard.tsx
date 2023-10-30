// React,React hooks
import { useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Components
// Styles and Assets
import "../../Assets/Styles/PeoduxtCard.css";
import "../../Assets/Styles/PeoduxtCard.css";
// Redux 
import { useDispatch } from "react-redux";
// Custom hooks
import { useProductCard } from "./UseProductCard";
// Helpers 
import { ProductDescription } from "./ProductDescription";
import { DotsMenu } from "./Menu";
import { Reducer } from "./Reducer";
import { ProductComposition } from "./Composition";
import { ProdicuCalculater } from "./ProductCalculator";






export const ProductCard = () => {
    const dispatch: any = useDispatch()
    // Get data from hook
    let card = useProductCard();

    let [isEditMode,setEditMode] = useReducer(Reducer,{isEditMode : false});

    // Update card function 
    function updateCard () {
        
    }
    console.log(isEditMode)
    return (

        <section className={`product_card container translate_animation`}>
            <h1>{card?.name}</h1>
            <DotsMenu isEditMode={isEditMode.isEditMode} setEditMode={setEditMode}/>
            {card && <ProductDescription isEditMode={isEditMode.isEditMode} setState={setEditMode} description={card?.description}/>}
            {card && <ProductComposition isEditMode={isEditMode.isEditMode} composition={card?.composition} />}
            {card && <ProdicuCalculater product={card}/>}
        </section>

    )
}