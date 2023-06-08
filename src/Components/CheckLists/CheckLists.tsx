import React, { useEffect, useState } from "react";
import "../../Styles/CheckLists.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { checkListType, getCheckListsthunk } from "../../Redux/CheckListReducer";






export const EmptyCheckLists = () => {
    return (
        <>
            <h3>
                Чек листов нет
            </h3>
            <NavLink to={"/new-check-list"}>Добавить</NavLink>

        </>
    )
}
export const CheckListsList = (props: { checkLists: checkListType[]}) => {
    const navigate = useNavigate()
    return (
        <div className="single_check_list">
            {props.checkLists.map((el: checkListType) => {
                return (
                    <>
                         <span onClick={() => {navigate(`/check-lists/id=${el.id}`)}}>{el.name}</span>
                         <br />
                    </>
                         
                
                )
            })}
            <span onClick={() => {navigate("/new-check-list")}} id="add_check_list">Добавить</span>
        </div>
    )
}


export const CheckLists = () => {
    let teamID = useSelector((state : Global_state_type) => state.App.user.teamID)
    let dispatch : any = useDispatch()
    useEffect(() => {
        dispatch(getCheckListsthunk(teamID as string))
    },[])
    let checkLists = useSelector((state : Global_state_type) => state.chcekLists.checkLists)
  
    return (
        <section className="check_lists_container page_apperas_animation">
           
            <h2>Чек листы</h2>
        
       
         
            <div className="ckeck-lists-content">
                {checkLists.length > 0 ? <CheckListsList checkLists={checkLists}/> : <EmptyCheckLists/>
                }
            </div>

        </section>
    )
}