import React from "react";
import premixIcon from "../../Assets/Icons/icons8-cocktail-96.png";
import { useNavigate } from "react-router-dom";

// Impor styles 
import "../../Assets/Styles/PremixPreview.css";


interface IPremixCard {
    id : string,
    name : string
}

export const Premixcard : React.FC<IPremixCard> = (props) => {
    // Get navigate
    const navigate = useNavigate();
    
    // Navigation handler
    function goToPremixCard () {
        navigate("/card/id:" + props.id);
    }
    
    return (
        <section className="premix-card" onClick={goToPremixCard}>
            <img className="premix-card__icon" src={premixIcon} alt="" />
            <span className="premix_card__tittle">{props.name}</span>
        </section>
    )
}