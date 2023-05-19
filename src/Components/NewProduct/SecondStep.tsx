import React from "react";
import { createNewIngridientCard, newCardActions } from "../../Redux/NewCardReducer";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/SecondStep.css"
import backArrow from "../../Assets/icons8-back-90.png";
import { useNavigate } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import { Firestore_instance } from "../../Firebase/PremixesAPI";
import { productType } from "../../Redux/Types";

export const SecondStep = () => {
    const dispatch : any = useDispatch()

    // SET DESCRITION
    const setDescription = (e : React.FormEvent<HTMLTextAreaElement>) => {
        dispatch(newCardActions.setNewDescription(e.currentTarget.value))
    }
    const newProduct = useSelector((state : Global_state_type) => state.newCard)
    const companyID = useSelector((state : Global_state_type) => state.profile.companyName)
    const navigate = useNavigate()
    const createnewProduct = () => {
        let card : productType = {
            name : newProduct.name,
            description : newProduct.description,
            composition : newProduct.composition as {},
            companyID : companyID as string,
            id : "wefew"
        }
        dispatch(createNewIngridientCard(card))
        navigate("/premixes")
      
    }
    return (
        <div className="second_step_container">
            <img src={backArrow} onClick={() => {navigate(-1)}} alt="" />
            <h2>Description : </h2>
            <textarea name="Description" id="description" placeholder="Description" onChange={setDescription}></textarea>
            <button onClick={createnewProduct}>Create</button>

        </div>
    )
}