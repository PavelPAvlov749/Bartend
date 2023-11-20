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
        <article className="cocktail_card_container translate_animation">
           
            <img id="cocktail_photo" src={currentCocktail?.strDrinkThumb} alt="" />
            <h2 className="coctail-card__tittle">{currentCocktail?.strDrink}</h2>
        
            <article className="coctail-card__info">
            <span className="info__glass">Glass : {currentCocktail?.strGlass }</span>
            <span className="info__category">Category IBA : {currentCocktail?.strIBA ? currentCocktail.strIBA : "не входит в IBA"}</span>
            <span className="info__category">Category : {currentCocktail?.strCategory}</span>
            <h3 className="info__subtittle">Techonlogy : </h3>
            <p className="info__technology">{currentCocktail?.strInstructions}</p>
            <h3 className="info__composition">Composition : </h3>
            {currentCocktail ? Object.keys(currentCocktail.composition).map((el : string,index : number) => {
                return (
                    <span>{el + " : " + Object.values(currentCocktail.composition)[index]}</span>
                )
            }) : null}
            </article>
           
        </article>
    )
}