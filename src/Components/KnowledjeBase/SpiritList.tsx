import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpiritsThunk, spiritType } from "../../Redux/KnowledgeBaseReducer";
import { Global_state_type } from "../../Redux/Store";
import { NavLink } from "react-router-dom";

export const SpiritList = () => {
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getSpiritsThunk())
    }, [])
    let spirits = useSelector((state: Global_state_type) => state.knowledgeBase.spirits)
 
    return (
        <section className="cocktail_list translate_animation">
            <ul className="spirit_list list">
                {spirits?.map((el: spiritType) => {
                    return (
                        <li key={el.ID} className="cocktail_card">
                            <NavLink to={`/ingridient/id=${el.ID}`}>
                                <img className="cocktail_preview" src={el.image} alt="" />
                                <br />
                                <span>{el.displayName}</span>
                            </NavLink>
                        </li>

                    )
                })}
            </ul>
        </section>
    )
}