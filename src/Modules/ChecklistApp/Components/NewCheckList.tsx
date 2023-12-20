// Custom Hooks
import { useInput, useValidator } from "./Hooks.";
// React,ReactHooks
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// API functions
import { CheckListsAPI } from "../../../services/Firebase/CkeckListsAPI";
// Styles and Assesets
import add from "../../../Assets/Icons/icons8-done-150.png"
import styles from "../Styles/CheckLists.module.css"
// Types
import { Global_state_type } from "../../../Redux/Store";
// Route
import { CHECK_LIST } from "../../../Router/Routes";


export const NewCheckList = () => {
    let teamID = useSelector((state: Global_state_type) => state.App.user.teamID);
    let navigate = useNavigate();

    // Get inputs from Hook 
    let [nameInput, nameValue] = useInput("Untitled", "Type name");
    let [taskInput, taskValue, setInput] = useInput("", "Task");
    // Define tasks array
    let [tasks, setTasks] = useState<string[]>([]);
    // On Error State if input value is not valid

    // Define a RegExp to validate inputs
    let [onError, errorMessage, validate] = useValidator(/^[a-zA-Z0-9]+$/);

    // Push new task into "tasks" array
    const onAddClickHandler = () => {
        // Validate input by rgExp
        validate(taskValue);
        if (!onError) {
            setTasks([...tasks, taskValue]);
            setInput("");
        }

    }
    const createCheckList = () => {
        // Check if task name are valid
        validate(nameValue);
        if (!onError) {
            //  If valid add new checklist
            CheckListsAPI.addCheckList(teamID as string, tasks, nameValue);
            // Movae bavk to check-lists route
            navigate(CHECK_LIST);
        }

    }
    return (
        <section className={styles.new_check_list_container}>
            <h1>
                {/* Finish editing */}
                <button onClick={createCheckList} id={styles.add_ckeck_list}>Done</button>
            </h1>
            {/* Cheklist Name Input */}
            {nameInput}
            <ul className={styles.task_list}>
                {/* Render the added tasks array */}
                {tasks.map((task: string) => <li key={task}>{task}</li>)}
            </ul>
            {/* New task Input */}
            <div className={styles.new_check_list_controls}>
                {taskInput}
                <button className={styles.confirm_button} onClick={onAddClickHandler}>
                    <img className={styles.icon} src={add} alt="" />
                </button>
                <br />
                {/* Error message (Renders if input conyain errors) */}
                <span>{onError ? errorMessage : null}</span>
            </div>
        </section>
    )
}

