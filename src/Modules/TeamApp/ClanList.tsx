import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { ClanType, getClanListByUserID, leaveTheTeam } from "../../Redux/TeamReducer";
import "../../Assets/Styles/TeamPage.css"
import "../../App.css"
import { NavLink, useNavigate } from "react-router-dom";
import { app_actions } from "../../Redux/AppReducer";
import { string } from "yup";
import generateInviteCode from "../../Helpers/InviteCodeGenerator";
import { TeamModuleAPI } from "../../services/Firebase/TeamAPI";
import { Desctiption } from "./Components/Description";
import { userPageType, userType } from "../../Redux/Types";

interface ITeam {
    user : userPageType
    team : ClanType
}

export const TeamPage : React.FC<ITeam> = (props) => {
    const dispatch: any = useDispatch()

    const LeaveTheTeamHandler = (team: string, userID: string, userName: string) => {
        dispatch(leaveTheTeam(team, userID, userName))
        dispatch(app_actions.setUserPage({ ...props.user, team: null, teamID: null }))
    }
    // Invitecode state
    let [inviteCode, setInviteCode] = useState("");
    // Invite generator handler 
    function generateInviteCodeHandler() {
        let code = generateInviteCode();
        setInviteCode(code);
        TeamModuleAPI.setInviteCode(props.team.teamID as string, code)
    }
    const users = props.team?.users.map((el, index) => <li key={index}>{el}</li>);

    return (
        <section className={`team_page container  translate_animation `}>




            <Desctiption description={props.team?.description as string} name={props.team?.teamName as string} />
            <section className="team_users">
                {/* <h3>Участники : </h3> */}
                <ul>
                    {users}
                </ul>
            </section>
            <button id="leave_the_team" onClick={() => {
                LeaveTheTeamHandler(props.team.teamID as string, props.user.userID as string, props.user.userName as string)
            }}>Покинуть Команду</button>

            <button onClick={generateInviteCodeHandler}>Generate Invite Code</button>
            {inviteCode.length > 0 && <span className="inviteCode">{inviteCode}</span>}

        </section>
    )
}

// export const TeamPageContainer = (props: { isDarkTheme: boolean }) => {
//     const dispatch: any = useDispatch()
//     const user = useSelector((state: Global_state_type) => state.App.user)
//     const pic = useSelector((state: Global_state_type) => state.clans.team?.teamAvatar)
//     useEffect(() => {
//         dispatch(getClanListByUserID(user.userID as string))
//     }, [])

//     return (
//         <section className={"team_page_container container"}>
//             {user.teamID ? <TeamPage  /> :
//                 <div className={"empty_team container "}>
//                     <h2>Вы не состоите в команде</h2>
//                     <NavLink to={"/join-team"}>Присоединиться</NavLink>
//                     <NavLink to={"/create-team"}>Создать команду</NavLink>
//                 </div>

//             }
//             <img src={pic as string} alt="" />
//         </section>
//     )
// }