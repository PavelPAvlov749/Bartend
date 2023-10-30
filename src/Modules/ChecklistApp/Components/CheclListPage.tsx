// Assets
import { useState } from "react";
import menuIcon from "../../../Assets/Icons/menu.png"
// Hooks
import { useTaskList } from "./Hooks";
// Styles
import "../../../Assets/Styles/CheckLists.css"

export const Modal =  () => {
    return (
        <section className="modal">
            <span>Modal</span>
            <span>Edit</span>
            <span>Delete</span>
            <button className="modal_btn">Close</button>
        </section>
    )
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
            {isModal ? <Modal/> : null}
            <div className="check-list-controls">
                <span className="check-list__menu-back">Back ...</span>
                <img className="check-list__menu-icon" src={menuIcon} onClick={toggleModal}></img>
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