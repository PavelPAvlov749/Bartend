// ----------------
// REACT AND HOOKS
// ----------------

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { useNavigate } from "react-router-dom";
// ----------------
// STYLES
// ----------------
import "../../Styles/Premixes.css"
// ----------------
// IMPORT ICONS
// ----------------
import searchIcon from "../../Assets/icons8-search-100.png";
import backIcom from "../../Assets/icons8-back-90.png";
import addIcon from "../../Assets/icons8-add-100.png";
import backIconsLight from "../../Assets/icons8-reply-arrow-100.png"
import addIconLight from "../../Assets/icons8-add-100 (1).png"
import searchIconLight from "../../Assets/icons8-search-100(1).png"
// ----------------
// IMPORT COMPONENTS
// ----------------
import { PremixesList } from "../Premixes/BlankList";
// ----------------
// IMPORT HELPERS
// ----------------
import { useProductFilter, useProducts } from "../../Helpers/CustomHooks";




export const Premixes = () => {
    
    const dispatch: any = useDispatch()
    const isDarkTheme = useSelector((state: Global_state_type) => state.App.isDarktheme)
    const [products,filterProducts] = useProductFilter("")

    let [isSearch, setIsSearch] = useState(false)
    const Navigate = useNavigate()

    return (
        <section className={isDarkTheme ? "container translate_animation DarkTheme" : "container translate_animation LightTheme"}>
            {isSearch ? 
            <div className="search_controls">
                <input className="search" onChange={(e : React.SyntheticEvent<HTMLInputElement>) => {filterProducts(e.currentTarget.value)}}></input>
                <button onClick={() => {setIsSearch(false)}}>Cancel</button>
            </div>
         :
                <ul className="controls">
                    <li className="menu-item" onClick={() => {Navigate(-1)}}>
                        <span>Back</span>
                        <img className="icon" src={isDarkTheme ? backIcom : backIconsLight} id="back"  alt="" />
                    </li>
                    <li className="menu-item" onClick={() => {Navigate("/add")}}>
                      <span >Add new</span> 
                        <img className="icon" src={isDarkTheme ? addIcon : addIconLight}  alt="" />
                    </li>
                    <li  className="menu-item"onClick={() => { setIsSearch(!isSearch) }} >
                        <span >Search</span>
                        <img className="icon" src={isDarkTheme ? searchIcon : searchIconLight} alt="" />

                    </li>


                </ul>
            }

            <section className="conteiner translate_animation">
                <PremixesList dispatch={dispatch} Navigate={Navigate} blanks={products} />

            </section>
        </section>
    )
}