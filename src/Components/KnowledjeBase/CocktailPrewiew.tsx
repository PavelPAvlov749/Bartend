import React from "react";
import { cocltalCardType } from "../../Redux/KnowledgeBaseReducer";
import { useNavigate } from "react-router-dom";

export const CoctailPreview = (props : {cocktail : cocltalCardType}) => {
    const navigate = useNavigate()
    
    return (
        <section className="cocktail_card" onClick={() => {navigate(`/cocktail/id=${props.cocktail.idDrink}`)}}>
            <img className="cocktail_preview" src={props.cocktail.strDrinkThumb} alt="" />
            <div className="coctail_info">
            <span>{props.cocktail.strDrink}</span>
            <br />
            <span>{props.cocktail.strIBA}</span>
            </div>
         
        </section>
    )
}
