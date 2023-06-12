import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../Styles/NewProduct.css"
import {newCardActions } from "../..//Redux/NewCardReducer";
import add from "../../Assets/icons8-add-96.png"
import { NewIngridientSingleForm } from "./NewIngridientSingleForm";


export const FirstStep = (props : {isDarkTheme : boolean}) => {
    const dispatch: any = useDispatch()


    // ADD NEW INPUTS FOR NEW COMPONENT
    const addInput = (e: React.MouseEvent<HTMLElement>) => {
        setForms([...forms, <NewIngridientSingleForm/>])

    }
    // SET NAME
    const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(newCardActions.setNewName(e.currentTarget.value))
    }
    // ARRAY OF FORMS FOR ADDING NEW COMMPOENT OBJET
    let [forms, setForms] = useState([
       <NewIngridientSingleForm/>
    ])
    return (
        <section className={props.isDarkTheme ? "new_product_container DarkTheme" : "new_product_container LightTheme"}>
            <h2>Введите наименование : </h2>
            <input type="text" placeholder="Наименование" id="name" onChange={(e) => { onNameChange(e) }} />
            <section className="compound">
                <h2>Состав : </h2>
                <div className="compound_inputs">
                    {forms}

                </div>
                <img src={add} onClick={addInput} alt="" />
            </section>

        </section>
    )
}