import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import "../../Styles/CheckLists.css"
import add from "../../Assets/icons8-done-150.png"
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { CheckListsAPI } from "../../Firebase/CkeckListsAPI";
import { useNavigate } from "react-router-dom";

export const NewCheckList = () => {
    let teamID = useSelector((state : Global_state_type) => state.App.user.teamID)
    let navigate = useNavigate()
    let [newTask,setNewTask] = useState("")
    const [tasks,addTasks] = useState([] as string[])
    let [name,setName] = useState("")
    const onChangeNadler = (e : React.SyntheticEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }
    const onAddClickHandler = () => {
      
        addTasks([...tasks,newTask])
        setNewTask("")
        
    }
    const onNameChange = (e : React.SyntheticEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const Finish = () => {
        CheckListsAPI.addCheckList(teamID as string,tasks,name)
        navigate("/check-lists")
    }
    return (
        <section className="new_check_list_container container translate_animation">
            <h1>Чек-листы
                <span onClick={Finish} id="add_ckeck_list">Готово</span>
            </h1>
            <input type="text" placeholder="Название" value={name} onChange={onNameChange}/>
            <ul className="task_list">
                {tasks.map((task : string,index : number) => {
                    return (
                        <li key={index.toString()}>{task}</li>
                    )
                })}
            </ul>
            <div className="new_check_list_controls">
                <input onChange={onChangeNadler} value={newTask}  type="text" className="task_input" placeholder="Задача"/>
                <button id="add_task_button" onClick={onAddClickHandler}>
                    <img src={add} alt="" />
                </button>
            </div>


        </section>
    )
}