import { useDispatch, useSelector } from "react-redux"
import { UserListItem } from "./UserListItem"
import { Global_state_type } from "../../../Redux/Store"
import { ClanType, getClanListByUserID } from "../../../Redux/TeamReducer"
import { UseToggle } from "../../../Helpers/CustomHooks"
import { useEffect } from "react"
import { isArray } from "util"

// Define a prop type 
type UserListPropType = {
    team : ClanType,
    users: Array<{userName: string,userID : string}> | undefined,
    toggler : () => void

}

export const UserList: React.FC<UserListPropType> = (props) => {
    // Get current user
    const curentUser = useSelector((state : Global_state_type) => state.App.user);
    // Get disptach
    const dispatch: any = useDispatch();
    
    const team = useSelector((state:Global_state_type) => {
        if(state.clans.team) {
            return state.clans.team;
        }
        else {
            return null as unknown as ClanType;
        }
    });
    
    useEffect(() => {
        dispatch(getClanListByUserID(curentUser.userID as string));
    },[team])

    const userItemProps = {
        currentUser: curentUser,
        team : team
    }

    return (
        <section className="team_users">

            <ul className="user-list">
                {props.users?.map((el:{userName: string,userID : string} , indx: number) => {
                    return (
                        <UserListItem key={el.userID} {...{ ...userItemProps, user: el,toggler : props.toggler}} />
                    )
                })}
            </ul>
        </section>

    )
}