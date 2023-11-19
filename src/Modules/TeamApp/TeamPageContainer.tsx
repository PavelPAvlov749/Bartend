// React,React-redux
import React from "react";
import { useSelector } from "react-redux";
// Custom hooks
import { useTeamPage } from "./Hooks/useTeam";
// Styles
// ....
// Types and interfaces
import { Global_state_type } from "../../Redux/Store";
import { ClanType } from "../../Redux/TeamReducer";
// Components
import { TeamPage } from "./ClanList";
import { EmptyTeam } from "./Components/EmptyTeam";



/**
 * Team Module container
 * Contains all users width teams interaction functionality
 * 
 * @returns React.Ellement
 */
export const TeamPageContainer: React.FC = () => {
    // Get team page fron hook
    let team = useTeamPage();
    // Get user data
    let user = useSelector((state: Global_state_type) => state.App.user);
    // If user Belongs to some kind of team Render Team information page
    if (user.teamID) {
        return <TeamPage user={user} team={team as ClanType} />
    }
    // If user does not beloong to any team Render EmptyTeam Page

    else {
        return <EmptyTeam />
    }

} 