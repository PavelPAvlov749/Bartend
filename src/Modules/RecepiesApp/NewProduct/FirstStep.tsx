import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../../Assets/Styles/NewProduct.css"
import { newCardActions } from "../../../Redux/NewCardReducer";
import { NewIngridientSingleForm } from "./NewIngridientSingleForm";
import styles from "../../Assets/Styles/ProductConstructor.module.css"

export const FirstStep = (props: { isDarkTheme: boolean }) => {
    const dispatch: any = useDispatch()


    // ADD NEW INPUTS FOR NEW COMPONENT
    const addInput = (e: React.MouseEvent<HTMLElement>) => {
        setForms([...forms, <NewIngridientSingleForm />])

    }
    // SET NAME
    const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(newCardActions.setNewName(e.currentTarget.value))
    }
    // ARRAY OF FORMS FOR ADDING NEW COMMPOENT OBJET
    let [forms, setForms] = useState([
        <NewIngridientSingleForm />
    ])
    // Visibility toggler
    function toggleVisibility () {
        dispatch(newCardActions.toggleVisibility());
    }
    return (
        <section className={props.isDarkTheme ? "new_premix_first_step container DarkTheme" : "container LightTheme"}>
            <input type="text" placeholder="Наименование" id="name" onChange={(e) => { onNameChange(e) }} />
            <div className="visibility-input">
                    <span>Visible for all : </span>
                    <input id="visibility-input" onChange={toggleVisibility} type="checkbox" />
                </div>
            <section className="compound">
                <h2>СComposition : </h2>
                <div className="compound_inputs">
                    {forms}
                </div>

                <button onClick={addInput} >Add ingrideint</button>
            </section>

        </section>
    )
}