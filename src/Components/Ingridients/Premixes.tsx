import React, { useEffect, useState } from "react";
import { productType } from "../../Redux/Types";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "../../Styles/Premixes.css"
import searchIcon from "../../Assets/icons8-search-100.png";
import backIcom from "../../Assets/icons8-back-90.png";
import addIcon from "../../Assets/icons8-add-100.png";
import backIconsLight from "../../Assets/icons8-reply-arrow-100.png"
import addIconLight from "../../Assets/icons8-add-100 (1).png"
import searchIconLight from "../../Assets/icons8-search-100(1).png"
import { BlankList } from "../ShiftsPage/BlankList";
import { getProductsByCompanyID } from "../../Redux/ProductReduxer";


export const Premixes = () => {
    const dispatch : any = useDispatch()
    const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
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

    return (
        <section className={isDarkTheme ? "product_list_page_container translate_animation DarkTheme": "product_list_page_container translate_animation LightTheme"}>
            {isSearch ? <input className="search"></input> : 
                   <div className="product_list_navigation">
                   <img src={isDarkTheme ? backIcom : backIconsLight} id="back" onClick={goBack} alt="" />
                   <img src={isDarkTheme ? addIcon : addIconLight} onClick={() => {
                       Navigate("/add")
                   }} alt="" />
                   <img src={isDarkTheme ? searchIcon : searchIconLight} onClick={() => {setIsSearch(!isSearch)}} alt="" />
       
               </div>
            }
     
        <section className="conteiner translate_animation" onClick={() => {
          if(isSearch){
            setIsSearch(false)
          }  
        }}>
            <BlankList dispatch={dispatch} Navigate={Navigate} blanks={products}/>
           
        </section>
        </section>
    )
}