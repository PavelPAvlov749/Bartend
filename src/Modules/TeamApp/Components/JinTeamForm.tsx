import { useNavigate } from "react-router-dom"
import "../../../Assets/Styles/TeamPage.css"
import { TeamModuleAPI } from "../../../services/Firebase/TeamAPI"
import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store"
import { useState } from "react"
import { Dispatch } from "redux"
import { app_actions } from "../../../Redux/AppReducer"
import { clanActions } from "../../../Redux/TeamReducer"



export const JoinTeamForm = () => {
    // Get navigate
    let navigate = useNavigate();
    // Get dispatch
    const dispatch: Dispatch = useDispatch();
    // Get App state
    const { errorMessage, isError, user } = useSelector((state: Global_state_type) => state.App);
    // Define local state
    let [code, setCode] = useState("");
    // Submit Handler
    async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        let result = await TeamModuleAPI.joinTeamByInviteCode(code, user.userID as string, user.userName as string);
        if (typeof result === "string") {
            console.log(result);
            dispatch(app_actions.setErrorMessage(result));
            dispatch(app_actions.setErrorState(true));
        }
        else {
            dispatch(clanActions.setTeam(result));
            navigate("home");
        }
    }
    // On Chanhe handler
    async function onChange(event: React.SyntheticEvent<HTMLInputElement>) {
        setCode(event.currentTarget.value);
    }

    return (
        <>
            {/* If has error render the erro message */}
            {isError && <span className="errorMessage">{errorMessage}</span>}
            <form className="invite-team-form" onSubmit={onSubmit} action="">
                <input className="invite-form__input" value={code} onChange={onChange} type="text" name="invite-code" placeholder="Invite code" />
                <button >Join</button>
            </form>
        </>
    )
}