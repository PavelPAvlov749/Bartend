import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store";
import { useEffect } from "react";

export const useUser = () => {
    const dispatch : any = useDispatch();

    let user = useSelector((state : Global_state_type) => state.App.user);

    useEffect(()=> {
        dispatch()
    })
}