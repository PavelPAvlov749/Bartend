import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import add from "../Assets/icons8-add-96.png"
import "../../Styles/NewProduct.css"
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { createNewIngridientCard } from "../../Redux/NewCardReducer";
import { useLocation, useNavigate } from "react-router-dom";

export const NewProduct = (props : {isDarkTheme : boolean} ) => {

    const location = useLocation().pathname.split("/")[1]
    const navigate = useNavigate()
    console.log(location)
    return (
        <section className="translate_animation">
            <FirstStep isDarkTheme={props.isDarkTheme}/>
            <button onClick={() => {navigate("/add-step-two")}} id="next_button">Дальше</button>
        
        </section>
    )
}