import React, { useEffect, useState } from "react";
import { productType } from "../Redux/Types";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "../Styles/Premixes.css"
import searchIcon from "../Assets/icons8-search-100.png";
import backIcom from "../Assets/icons8-back-90.png";
import addIcon from "../Assets/icons8-add-100.png";

import { BlankList } from "./BlankList";
import { getProductsByCompanyID } from "../Redux/ProductReduxer";


export const Premixes = () => {
    const dispatch : any = useDispatch()

    const teamID = useSelector((state : Global_state_type) => {return state.App.user.teamID})
    useEffect(() => {
        
        dispatch(getProductsByCompanyID(teamID as string))
    },[])
    let products = useSelector((state : Global_state_type) => {
        return state.premixes.premixes
    })
    let [isSearch,setIsSearch] = useState(false)
    const goBack = () => {
        Navigate(-1)
    }
    const Navigate = useNavigate()
    const onChange = (el: productType) => {
  
        // dispatch(product_actions.addToSelected(el))
        let prevStorage = JSON.parse(localStorage.getItem("products") as string)
      
        if(prevStorage){
            prevStorage.push(el)
        localStorage.setItem("products",JSON.stringify(prevStorage))}
        else{
            localStorage.setItem("products",JSON.stringify([el]))
        }
    }
    return (
        <section className="priductListPAge">
            {isSearch ? <input className="search"></input> : 
                   <div className="product_list_navigation">
                   <img src={backIcom} id="back" onClick={goBack} alt="" />
                   <img src={addIcon} onClick={() => {
                       Navigate("/add")
                   }} alt="" />
                   <img src={searchIcon} onClick={() => {setIsSearch(!isSearch)}} alt="" />
       
               </div>
            }
     
        <section className="productListContainer" onClick={() => {
          if(isSearch){
            setIsSearch(false)
          }  
        }}>
            <BlankList dispatch={dispatch} Navigate={Navigate} blanks={products}/>
           
        </section>
        </section>
    )
}