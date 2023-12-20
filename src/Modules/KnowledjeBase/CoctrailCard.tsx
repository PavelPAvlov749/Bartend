import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { cocltalCardType, getCocktailByID } from "../../Redux/KnowledgeBaseReducer";
import { Global_state_type } from "../../Redux/Store";
import "../../Assets/Styles/CoctailCard.css"
// Assets
import glass from "../../Assets/Icons/icons8-martini-100.png";
import bottle from "../../Assets/Icons/icons8-wine-100.png";


const CocktailCard = () => {
    const dispatch: any = useDispatch()
    const location = useLocation().pathname.split("=")[1]
    useEffect(() => {
        dispatch(getCocktailByID(location))
    }, [])
    let currentCocktail = useSelector((state: Global_state_type) => state.knowledgeBase.currentCocktail) as cocltalCardType


    return (
        <article className="cocktail_card_container translate_animation">
            <div className="coctail-card__content">
                <section className="left_section">
                <img id="cocktail_photo" src={currentCocktail?.strDrinkThumb} alt="" />
                <button className="save_drink">Save cocktail</button>
                </section>
       


                <article className="coctail-card__info">
                    <h2 className="coctail-card__tittle">{currentCocktail?.strDrink}</h2>
                    <span className="info__glass"><img src={glass}></img>Glass : {currentCocktail?.strGlass}</span>
                    <span className="info__category">Category IBA : {currentCocktail?.strIBA ? currentCocktail.strIBA : "не входит в IBA"}</span>
                    <span className="info__category">Category : {currentCocktail?.strCategory}</span>
                    <h3 className="info__subtittle">Techonlogy : </h3>
                    <p className="info__technology">{currentCocktail?.strInstructions}</p>
                    <h3 className="info__composition">Composition : </h3>
                    {currentCocktail ? Object.keys(currentCocktail.composition).map((el: string, index: number) => {
                        return (
                            <span className="composition__item"><img src={bottle} alt="" />{el + " : " + Object.values(currentCocktail.composition)[index]}</span>
                        )
                    }) : null}
                </article>
            </div>


        </article>
    )
};


export default CocktailCard;