import { useTaskList } from "./Components/Hooks"


export const CheckListApp : React.FC = () => {
    
    // Get checklist object amd delete hadler from hook
    let [checklist, deleteHandler] = useTaskList();
    
    return (
        <section className="checklist-app-container">

        </section>
    )
}