import React from "react";
import { createNewIngridientCard, newCardActions } from "../../../Redux/NewCardReducer";
import { useDispatch, useSelector } from "react-redux";
import "../../../Assets/Styles/SecondStep.css"
import { useNavigate } from "react-router-dom";
import { Global_state_type } from "../../../Redux/Store";
import { productType } from "../../../Redux/Types";

export const SecondStep = () => {
    const dispatch: any = useDispatch()

    // SET DESCRITION
    const setDescription = (e: React.FormEvent<HTMLTextAreaElement>) => {
        dispatch(newCardActions.setNewDescription(e.currentTarget.value))
    }
    const newProduct = useSelector((state: Global_state_type) => state.newCard)
    const teamID = useSelector((state: Global_state_type) => state.App.user.teamID)
    const navigate = useNavigate()
    const createnewProduct = () => {
        function convertObjectToArrayOfObjects(obj: object) {
            let resultObject = Object.keys(obj).map((el: string, index: number, array: any[]) => {
                return {
                    [el]: Object.values(obj)[index]
                }
            });
            return resultObject;
        }
        console.log(convertObjectToArrayOfObjects(newProduct));
        if (teamID) {
            let card: productType = {
                name: newProduct.name,
                description: newProduct.description,
                composition: convertObjectToArrayOfObjects(newProduct.composition as {}),
                teamID: teamID,
                isVisibleForAll : newProduct.isVisibleForAll

            }
            dispatch(createNewIngridientCard(card))
            navigate("/premixes")
        } else {
            navigate("/clan-list")
        }


    }
    return (
        <div className={"second_step"}>
            <h2 className="second-step__tittle">Desription : </h2>
            <textarea name="Description" id="description" onChange={setDescription}></textarea>
  

        </div>
    )
}