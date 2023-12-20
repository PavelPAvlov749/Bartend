import { useTaskList } from "./Components/Hooks"


const CheckListApp : React.FC = () => {
    
    // Get checklist object amd delete hadler from hook
    let [checklist, deleteHandler] = useTaskList();
    
    return (
        <section className="checklist-app-container">

        </section>
    )
}

export default CheckListApp;