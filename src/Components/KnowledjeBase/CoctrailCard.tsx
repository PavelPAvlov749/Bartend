import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { cocltalCardType, getCocktailByID } from "../../Redux/KnowledgeBaseReducer";
import { Global_state_type } from "../../Redux/Store";
import "../../Assets/Styles/CoctailCard.css"

export const CocktailCard = () => {
    const dispatch : any = useDispatch()
    const location = useLocation().pathname.split("=")[1]
    useEffect(() => {
        dispatch(getCocktailByID(location))
    },[])
    let currentCocktail = useSelector((state : Global_state_type) => state.knowledgeBase.currentCocktail) as cocltalCardType

 
    return (
        <article className="cocktail_card_container contaoiner translate_animation">
            <figure>
            <h2>{currentCocktail?.strDrink}</h2>
            <img id="cocktail_photo" src={currentCocktail?.strDrinkThumb} alt="" />
           
            </figure>
            <article>
            <span>Бокал : {currentCocktail?.strGlass }</span>
            <span>Категория IBA : {currentCocktail?.strIBA ? currentCocktail.strIBA : "не входит в IBA"}</span>
            <span>Категория : {currentCocktail?.strCategory}</span>
            <h3>Технология приготовления : </h3>
            <p>{currentCocktail?.strInstructions}</p>
            <h3>Состав : </h3>
            {currentCocktail ? Object.keys(currentCocktail.composition).map((el : string,index : number) => {
                return (
                    <span>{el + " : " + Object.values(currentCocktail.composition)[index]}</span>
                )
            }) : null}
            </article>
           
        </article>
    )
}