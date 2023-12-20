// Assets

// Hooks
import { useTaskList } from "./Hooks";
// Styles
import styles from  "../Styles/CheckLists.module.css"
import { ChecklistDotsMenu } from "./DotsMenu";
import { checkListType } from "../../../Redux/CheckListReducer";


/**
 * Checklist taskList in checkList page
 * 
 * @returns React.Ellement
 */
export const CheckListPage = () => {
    // Get checklist object amd delete hadler from hook
    let [checklist] = useTaskList();


    return (
        <section className={styles.single_check_list}>
           
            <div className={styles.check_list_controls}>
                {/* Dots menu calls Modal Window when clicked */}
                <h1>Tasks</h1>
              <ChecklistDotsMenu checklist={checklist as checkListType}/>
            </div>

            <ul className={styles.tasks}>
                {/* Map on tasks array and render every task*/}
                {checklist?.tasks.map((el: string, index: number) => {
                    return (
                        <li key={el} className={styles.tasks_item}>
               
                            <input className={styles.tasks_item__checkbox} type="checkbox" />
                    
                            <span>{index + 1 + "." + el}</span>
                            <br />
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}