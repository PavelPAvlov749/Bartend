import  { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import {  getClanListByUserID, leaveTheTeam } from "../../Redux/TeamReducer";
import "../../Styles/TeamPage.css"
import "../../App.css"
import { NavLink, useNavigate } from "react-router-dom";
import { app_actions } from "../../Redux/AppReducer";



export const TeamPage = (props: { isDarkTheme: boolean }) => {
    const dispatch : any = useDispatch()
    const user = useSelector((state : Global_state_type) => state.App.user)
    let navigate = useNavigate()
    useEffect(() => {
        dispatch(getClanListByUserID(user.userID as string))
    },[])
    let team = useSelector((state : Global_state_type) => state.clans.team)
    let teamID = useSelector((state : Global_state_type) => state.App.user.teamID)
    const LeaveTheTeamHandler = (team : string,userID :string,userName : string) => {
        dispatch(leaveTheTeam(team,userID,userName))
        dispatch(app_actions.setUserPage({...user,team : null,teamID : null}))
    }

    return (
        <section className={`team_page container translate_animation ${props.isDarkTheme ? `DarkTheme` : `LightTheme`}`}>
            <h2>Команда : </h2>
            <br />
            <span id="team_name">{team?.teamName}</span>
            <h3>Описание : </h3>
            <p>{team?.description}</p>
            <span id="leave_the_team" onClick={() => {
                LeaveTheTeamHandler(teamID as string,user.userID as string,user.userName as string)
            }}>Покинуть Команду</span>
            <br />
        
            <h3>Участники : </h3>
            {team?.users.map((el : string,index) => {
                return (
                    <span key={index} >{el}</span>
                )
            })}
            <br />
          
        </section>
    )
}

export const TeamPageContainer = (props: { isDarkTheme: boolean }) => {
    const dispatch: any = useDispatch()
    const user = useSelector((state: Global_state_type) => state.App.user)
    const pic = useSelector((state : Global_state_type) => state.clans.team?.teamAvatar)
    useEffect(() => {
        dispatch(getClanListByUserID(user.userID as string))
        
    }, [])

    return (
        <section className={props.isDarkTheme ? "team_page_container DarkTheme" : "team_page_container LightTheme"}>
            {user.teamID  ? <TeamPage isDarkTheme={props.isDarkTheme} /> :
                <div className={props.isDarkTheme ? "empty_team container DarkTheme" : "epmty_team LightTheme"}>
                    <span>Вы не состоите в команде</span>
                    <NavLink to={"/join-team"}>Присоединиться</NavLink>
                    <NavLink to={"/create-team"}>Создать команду</NavLink>
                </div>
              
            }
              <img src={pic as string} alt="" />
        </section>
    )
}