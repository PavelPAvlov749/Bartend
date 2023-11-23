import { NavLink, useNavigate } from "react-router-dom"
import "../../../Assets/Styles/TeamPage.css"

import { JoinTeamForm } from "./JoinTeamForm"


export const EmptyTeam = () => {


    return (

        <div className={"empty_team container "}>
            <h2 className="emty-team__tittle">You dosen`t have any team</h2>
            <h2 className="invite-code__tittle">Type invite code to join any team</h2>
            <JoinTeamForm />
            {/* <NavLink to={"/join-team"}>Присоединиться</NavLink> */}
            <h2>Or you can create your own team</h2>
            <NavLink className="create-team" to={"/create-team"}>Create Team</NavLink>
        </div>



    )


}