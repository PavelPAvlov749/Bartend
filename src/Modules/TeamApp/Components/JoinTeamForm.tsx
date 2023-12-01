import { useNavigate } from "react-router-dom"
import "../../../Assets/Styles/TeamPage.css"
import { TeamModuleAPI } from "../../../services/Firebase/TeamAPI"
import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store"
import { useState } from "react"
import { Dispatch } from "redux"
import { app_actions } from "../../../Redux/AppReducer"
import { clanActions, joinTeamByInviteCode } from "../../../Redux/TeamReducer"
import { UIButton } from "../../../Components/Button"



export const JoinTeamForm = () => {

    // Get dispatch
    const dispatch: any = useDispatch();
    // Get App state
    const { errorMessage, isError, user } = useSelector((state: Global_state_type) => state.App);
    // Define local state
    let [code, setCode] = useState("");
    // Submit Handler
    async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(joinTeamByInviteCode(code,user.userID as string,user.userName as string));
       
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
                <UIButton type="submit" text="Join"/>
            </form>
        </>
    )
}