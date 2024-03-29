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
import { TeamPage } from "./TeamPage";
import { EmptyTeam } from "./Components/EmptyTeam";
import ErrorBoundary from "../../Components/ErrorBoundary";



/**
 * Team Module container
 * Contains all users width teams interaction functionality
 * 
 * @returns React.Ellement
 */
const TeamPageContainer: React.FC = () => {
    // Get team page fron hook
    let team = useTeamPage();
    // Get user data
    // @ts-ignore
    let user = useSelector((state: Global_state_type) => state.App.user);
    // If user Belongs to some kind of team Render Team information page
    if (user.teamID) {
        return (
            <ErrorBoundary>
                <TeamPage user={user} team={team as ClanType} />
                
            </ErrorBoundary>
        )

    }
    // If user does not beloong to any team Render EmptyTeam Page

    else {
        return <EmptyTeam />
    }

}

export default TeamPageContainer