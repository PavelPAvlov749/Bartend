// Assets
import React, { useState } from "react";
import menuIcon from "../../../Assets/Icons/menu.png"
// Hooks
import { useTaskList } from "./Hooks";
// Styles
import "../../../Assets/Styles/CheckLists.css"
import { ChecklistDotsMenu } from "./DotsMenu";
import { checkListType } from "../../../Redux/CheckListReducer";

export const Modal =  () => {
    return (
        <section className="modal">
            <span>Delete</span>
            <button className="modal_btn">Close</button>
        </section>
    )
}
// Define a props type
type ChecklistPropsType = {
    checklist : checkListType
}

export const CheckListPage = () => {
    // Get checklist object amd delete hadler from hook
    let [checklist, deleteHandler] = useTaskList();
    let [isModal,setModal] = useState<boolean>(false);
    function toggleModal () {
        setModal(!isModal);
    }
    return (
        <section className="single-check-list container {}">
           
            <div className="check-list-controls">
              <ChecklistDotsMenu checklist={checklist as checkListType}/>
            </div>

            <ul className="tasks">
                {checklist?.tasks.map((el: string, index: number) => {
                    return (
                        <li className="tasks-item">
                            <div>
                            <input className="tasks-item__checkbox" type="checkbox" />

                            </div>
                            <span>{index + 1 + "." + el}</span>
                            <br />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}