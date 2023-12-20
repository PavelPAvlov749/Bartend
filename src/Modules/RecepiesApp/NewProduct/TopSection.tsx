import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Global_state_type } from "../../../Redux/Store";
import { productType } from "../../../Redux/Types";
import { createNewIngridientCard, newCardActions } from "../../../Redux/NewCardReducer";

export const TopSection: React.FC = () => {
    const dispatch: any = useDispatch()

    const navigate = useNavigate();
    const newProduct = useSelector((state: Global_state_type) => state.newCard)
    const teamID = useSelector((state: Global_state_type) => state.App.user.teamID)
    // SET NAME
    const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(newCardActions.setNewName(e.currentTarget.value))
    }
    // Visibility toggler
    function toggleVisibility() {
        dispatch(newCardActions.toggleVisibility());
    };
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
                isVisibleForAll: newProduct.isVisibleForAll

            }
            dispatch(createNewIngridientCard(card))
            navigate("/premixes")
        } else {
            navigate("/clan-list")
        }


    }
    return (
        <div className="top-section">
            <input type="text" placeholder="Name" id="name" onChange={(e) => { onNameChange(e) }} />
            <div className="visibility-input">
                <span>Visible for all : </span>
                <input id="visibility-input" onChange={toggleVisibility} type="checkbox" />
                <button className="confirm_button" onClick={createnewProduct}>Create</button>
            </div>
        </div>
    )
}