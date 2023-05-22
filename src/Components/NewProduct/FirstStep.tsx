import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/NewProduct.css"
import {newCardActions } from "../..//Redux/NewCardReducer";
import add from "../../Assets/icons8-add-96.png"
import { NewIngridientSingleForm } from "./NewIngridientSingleForm";


export const FirstStep = () => {
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
        <section className="new_product_container">
            <h2>Type Name : </h2>
            <input type="text" placeholder="Name" id="name" onChange={(e) => { onNameChange(e) }} />
            <section className="compound">
                <h2>Compound : </h2>
                <div className="compound_inputs">
                    {forms}

                </div>
                <img src={add} onClick={addInput} alt="" />
            </section>

        </section>
    )
}