import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { ClanType, getAllClans, joinTheClan } from "../../Redux/TeamReducer";
import "../../Styles/TeamPage.css"

export const JoinTeam = (props : {isDarkTheme : boolean}) => {
    const dispatch : any = useDispatch()
    useEffect(( ) => {
        dispatch(getAllClans())
    },[])
    const user = useSelector((state : Global_state_type) => state.App.user)
    const teamList = useSelector((state : Global_state_type) => state.clans.teamList)
    const joinTeamHandler = (teamID : string,teamName : string) => {
        dispatch(joinTheClan(user.userID as string,user.userName as string,teamID,teamName))
    }
    
    return (
        <section className={"join_team container"} >
            <input type="text" placeholder="Искать по имени"/>
            {teamList?.map((el : ClanType) => {
                return (
                    <div className="single_team">
                    <span>{el.teamName}</span>
                    <span id="join" onClick={() => {joinTeamHandler(el.teamID,el.teamName)}}>
                        Присоединиться
                    </span>
                    </div>
                )
            })}
        </section>
    )
}