import React from "react";
import { createNewIngridientCard, newCardActions } from "../../Redux/NewCardReducer";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/SecondStep.css"
import backArrow from "../../Assets/icons8-back-90.png";
import { useNavigate } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import { productType } from "../../Redux/Types";

export const SecondStep = (props : {isDarkTheme : boolean}) => {
    const dispatch : any = useDispatch()

    // SET DESCRITION
    const setDescription = (e : React.FormEvent<HTMLTextAreaElement>) => {
        dispatch(newCardActions.setNewDescription(e.currentTarget.value))
    }
    const newProduct = useSelector((state : Global_state_type) => state.newCard)
    const teamID = useSelector((state : Global_state_type) => state.App.user.teamID)
    const navigate = useNavigate()
    const createnewProduct = () => {
        if(teamID){
            let card : productType = {
                name : newProduct.name,
                description : newProduct.description,
                composition : newProduct.composition as {},
                teamID : teamID,
                
            }
            dispatch(createNewIngridientCard(card))
            navigate("/premixes")
        }else{
            navigate("/clan-list")
        }
     
      
    }
    return (
        <div className={props.isDarkTheme ? "second_step_container translate_animation DarkTheme" : "second_step_container translate_animation LightTeheme"}>
            <img src={backArrow} onClick={() => {navigate(-1)}} alt="" />
            <h2>Технология приготовления : </h2>
            <textarea name="Description" id="description" onChange={setDescription}></textarea>
            <button onClick={createnewProduct}>Создать</button>

        </div>
    )
}