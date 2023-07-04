import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCurrentIngridient } from "../../Redux/KnowledgeBaseReducer";
import { Global_state_type } from "../../Redux/Store";


export const IngridientCard = () => {
    const dispatch : any = useDispatch()
    const location = useLocation().pathname.split("=")[1]
    useEffect(() => {
        dispatch(getCurrentIngridient(location))
    },[])
    let currentIngridient = useSelector((state : Global_state_type) => state.knowledgeBase.currentSpirit)
    return (
        <section className=" container translate_animation">
            <h2>{currentIngridient?.displayName}</h2>
            <img id="cocktail_photo" src={currentIngridient?.image} alt="" />
            <h4>Описание : </h4>
            <p>
                {currentIngridient?.definition}
            </p>
        
            <span>Технология произодства : </span>
            <p>{currentIngridient?.production}</p>
        </section>
    )
}