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
    const teamID = useSelector((state : Global_state_type) => state.App.user.teamID)
    const navigate = useNavigate()
    const createnewProduct = () => {
        let card : productType = {
            name : newProduct.name,
            description : newProduct.description,
            composition : newProduct.composition as {},
            teamID : teamID,
            
        }
        dispatch(createNewIngridientCard(card))
        navigate("/premixes")
      
    }
    return (
        <div className="second_step_container">
            <img src={backArrow} onClick={() => {navigate(-1)}} alt="" />
            <h2>Технология приготовления : </h2>
            <textarea name="Description" id="description" onChange={setDescription}></textarea>
            <button onClick={createnewProduct}>Создать</button>

        </div>
    )
}