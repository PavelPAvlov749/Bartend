import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store";
import { getClanListByUserID } from "../../../Redux/TeamReducer";

export const useTeamPage = () => {
    // Get dispatch
    const dispatch : any = useDispatch();
    // Get user from state
    const userID  = useSelector((state : Global_state_type) => state.App.user.userID);
    // Fetch team list
    useEffect(() => {
        dispatch(getClanListByUserID(userID as string));
    },[]);
    // get Team from state 
    let team = useSelector((state : Global_state_type) => state.clans.team);
    
    
    return team;

}