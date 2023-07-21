import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clanActions, createClanThunk } from "../../Redux/TeamReducer";
import { Global_state_type } from "../../Redux/Store";
import "../../Styles/CreateTeam.css"
import { useNavigate } from "react-router-dom";
import {initializeThunk} from "../../Redux/AppReducer"

export const CreateTeam = () => {
    const dispatch : any = useDispatch()
    const navigate = useNavigate()
    const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    const newTeam = useSelector((state : Global_state_type) => state.clans.newTeam)
    const user = useSelector((state : Global_state_type) => state.App.user)
    const onSubmit = () => {
        dispatch(createClanThunk(newTeam as {newTeamName : string,newTeamDescription : string,newTeamAvatar : ArrayBuffer},
            user.userID as string,user.userName as string))
           
        dispatch(initializeThunk())
        navigate("/home")
    }

    const onNameChangeHandler = (e : React.SyntheticEvent<HTMLInputElement>) => {
        dispatch(clanActions.setNewClanName(e.currentTarget.value))
    }
    const onDescriptionChangeHandler = (e : React.SyntheticEvent<HTMLTextAreaElement>) => {
        dispatch(clanActions.setNewTeamDiescription(e.currentTarget.value))
    }
    return (
        <section className={"create_team_container translate_animation container"}>
            <input type="text" placeholder="Название" onChange={onNameChangeHandler}/>
            <h3>Описание :</h3>
            <br />
            <textarea name="" id="" onChange={onDescriptionChangeHandler} ></textarea>
         
            <button onClick={onSubmit}>Создать команду</button>
        </section>
    )
}