
// React,hooks
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";
// Redux,thunks
import { checkListType, deleteChekListThunk, getCheckListsthunk } from "../../Redux/CheckListReducer";
// Types




import { Global_state_type } from "../../Redux/Store";
/**
* @params none
* 
* 
* Return a typple with specifik checklist object that contains 
* ist of tasks and handler to delete them
* @returns [checklist,deleteHanler]
*/

export const useTaskList = (): [checkListType | null, () => void] => {
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

    let id = useLocation().pathname.split("=")[1];
    let checklist: checkListType | null = useSelector((state: Global_state_type) => {
        let result = state.chcekLists.checkLists.find((el: checkListType) => el.id === id);
        if (result) {
            return result;
        }
        else {
            return null;
        }
    });
    const deleteHandler = () => {
        dispatch(deleteChekListThunk(id))
        navigate("/check-lists")
    };
    return [checklist, deleteHandler];
}


/**
 * 
 * Return a list of checklists for current establishment
 * @returtn array checkListType[]
 */
export const useChecklistList = () => {
    const dispatch: any = useDispatch();
    // Get team id to fetch data by him
    let teamID = useSelector((state: Global_state_type) => state.App.user.teamID);
    // Fetch data
    useEffect(() => {
        dispatch(getCheckListsthunk(teamID as string))
    }, []);
    let checkLists = useSelector((state: Global_state_type) => state.chcekLists.checkLists);
    
    return checkLists;
}