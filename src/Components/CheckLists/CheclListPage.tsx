import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Global_state_type } from "../../Redux/Store";
import { checkListType } from "../../Redux/CheckListReducer";
import deleteIcon from "../../Assets/icons8-delete-96.png"

export const CheckListPage = () => {
    let id = useLocation().pathname.split("=")[1]
    let actualChekList = useSelector((state: Global_state_type) => {
        return state.chcekLists.checkLists.find((el: checkListType) => el.id === id)
    })
    return (
        <section className="single-check-list">
            <div className="check-list-controls">
                <h2>{actualChekList?.name}</h2>
                <img className="icon" src={deleteIcon} alt="" />
            </div>

            <ul className="tasks">
                {actualChekList?.tasks.map((el: string) => {
                    return (
                        <>
                            <span>{el}</span>
                            <br />
                        </>
                    )
                })}
            </ul>
        </section>
    )
}