import { useDispatch, useSelector } from "react-redux"
import { UserListItem } from "./UserListItem"
import { Global_state_type } from "../../../Redux/Store"
import { ClanType } from "../../../Redux/TeamReducer"
import { UseToggle } from "../../../Helpers/CustomHooks"

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
 

    const userItemProps = {
        currentUser: curentUser,
        team : props.team
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