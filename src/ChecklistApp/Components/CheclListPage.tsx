// Assets
import deleteIcon from "../../Assets/icons8-delete-64.png"
// Hooks
import { useTaskList } from "./Hooks";


export const CheckListPage = () => {
    // Get checklist object amd delete hadler from hook
    let [checklist, deleteHandler] = useTaskList();
    
    return (
        <section className="single-check-list container">
            <div className="check-list-controls controls">
                <img className="icon" src={deleteIcon} onClick={deleteHandler}></img>
            </div>

            <ul className="tasks">
                {checklist?.tasks.map((el: string, index: number) => {
                    return (
                        <li>
                            <span>{index + 1 + "." + el}</span>
                            <br />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}