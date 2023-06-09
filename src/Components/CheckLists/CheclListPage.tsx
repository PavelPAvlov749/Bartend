import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import { checkListType, deleteChekListThunk } from "../../Redux/CheckListReducer";
import deleteIcon from "../../Assets/icons8-delete-64.png"

export const CheckListPage = () => {
    let id = useLocation().pathname.split("=")[1]
    const navigate = useNavigate()
    let dispatch : any = useDispatch()
    let actualChekList = useSelector((state: Global_state_type) => {
        return state.chcekLists.checkLists.find((el: checkListType) => el.id === id)
    })
    const onDeleteHandler = () => {
        dispatch(deleteChekListThunk(id))
        navigate("/check-lists")
    }
    return (
        <section className="single-check-list container">
            <div className="check-list-controls controls">
                <img className="icon" src={deleteIcon} onClick={onDeleteHandler}></img>
            </div>

            <ul className="tasks">
                {actualChekList?.tasks.map((el: string,index : number) => {
                    return (
                        <>
                            <span>{index + 1 + "." + el}</span>
                            <br />
                        </>
                    )
                })}
            </ul>
        </section>
    )
}