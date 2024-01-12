import React, { Dispatch } from "react";

import { useDispatch } from "react-redux";
import { userPageType } from "../../../Redux/Types";
import { ClanType, clanActions } from "../../../Redux/TeamReducer";
import { TeamModuleAPI } from "../../../services/Firebase/TeamAPI";
import { UseToggle } from "../../../Helpers/CustomHooks";
import { ModalWindow } from "./DeleteConfirmation";
import { UserList } from "./UserList";


// Define a props type
type userListItemType = {
    currentUser: userPageType
    user: { userName: string, userID: string },
    team: ClanType,
    toggler : () => void
}

export const UserListItem: React.FC<userListItemType> = (props) => {

    // get Dispatch
    const dispatch: any = useDispatch();
    // Ecluder user hamdler
    async function excluedeUser() {
        dispatch(clanActions.setUserToDelete(props.user.userName,props.user.userID));
        props.toggler();
    }
    if (props.currentUser.role === "admin") {
        return (
            <li key={props.user.userID} className="user-item">{props.user.userName}
                <span className="delete-user" onClick={excluedeUser}>
                    {props.currentUser.userName === props.user.userName && props.currentUser.userName === props.user.userName ? null : "exclude user"}
                </span>
            </li>
        )
    }
    else {
        return (
            <li key={props.user.userID} className="user-item">
                {props.user.userName}
            </li>
        )

    }

}