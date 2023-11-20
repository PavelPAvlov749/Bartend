import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpiritsThunk, spiritType } from "../../Redux/KnowledgeBaseReducer";
import { Global_state_type } from "../../Redux/Store";

import "../../Assets/Styles/CocktailList.css"
import { ProductPreview } from "./ProductPreview";

export const SpiritList = () => {
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getSpiritsThunk())
    }, [])
    let spirits = useSelector((state: Global_state_type) => state.knowledgeBase.spirits)
 
    return (
        <section className="cocktail_list translate_animation">
            <div className="list">
                {spirits?.map((el: spiritType) => {
                    return (
                      <ProductPreview name={el.displayName} id={el.ID} img={el.image} type="spirit"/>
                    )
                })}
            </div>
        </section>
    )
}