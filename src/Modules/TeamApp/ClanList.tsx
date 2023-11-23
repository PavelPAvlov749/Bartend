// React,React Hooks
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";

// Styles and Assets
import "../../Assets/Styles/TeamPage.css"
import "../../App.css"
// Redux,Thunks
import { ClanType, deleteUSerTunk, leaveTheTeam } from "../../Redux/TeamReducer";
import { app_actions } from "../../Redux/AppReducer";
// Components
import { Desctiption } from "./Components/Description";
import { UserList } from "./Components/UserList";
import { UIButton } from "../../Components/Button";
import { ModalWindow } from "./Components/DeleteConfirmation";
// Types
import { userPageType} from "../../Redux/Types";
import { Global_state_type } from "../../Redux/Store";
// Services
import { TeamModuleAPI } from "../../services/Firebase/TeamAPI";
// Helpers
import generateInviteCode from "../../Helpers/InviteCodeGenerator";
import { UseToggle } from "../../Helpers/CustomHooks";






// Define a type
type ITeam = {
    user : userPageType
    team : ClanType
}
/**
 * Team Page top level container
 * 
 * @param props 
 * @returns React.Ellement
 */
export const TeamPage : React.FC<ITeam> = (props) => {
    
    const dispatch: any = useDispatch()
    // Modal window state 
    let [state,setIsUserDelete] = UseToggle(false);
    // Invitecode state
    let [inviteCode, setInviteCode] = useState("");
    // Invite generator handler 
    function generateInviteCodeHandler() {
        let code = generateInviteCode();
        setInviteCode(code);
        TeamModuleAPI.setInviteCode(props.team.teamID as string, code)
    }
    // LEave team handler function 
    function leaveTeam () {
        dispatch(leaveTheTeam(props.team.teamID, props.user.userID as string, props.user.userName as string))
        dispatch(app_actions.setUserPage({ ...props.user, team: null, teamID: null }))
    }
    const deletingUSer = useSelector((state  :Global_state_type) => state.clans.userToDelete);
    // Delete user 
    function deleteUSerDfromTeam () {
        
        dispatch(deleteUSerTunk(deletingUSer?.userID as string,deletingUSer?.userName as string,props.team.teamID));
        debugger;
    }
    return (
        <section className={`team_page container  translate_animation `}>
            {state && <ModalWindow setState={setIsUserDelete} confirmCallback={deleteUSerDfromTeam}/>}
            <Desctiption description={props.team?.description as string} name={props.team?.teamName as string} />
            <UserList team={props.team} users={props.team?.users} toggler={setIsUserDelete}/>
            <UIButton text="Leave the team" callback={leaveTeam}/>
            <UIButton text="Generate Invite Code" callback={generateInviteCodeHandler}/>
            {/* Render invite code depending on invateCode value */}
            {inviteCode.length > 0 && <span className="inviteCode">{inviteCode}</span>}

        </section>
    )
}



