import React, { useState } from "react";
import "../Styles/ThemeSwitcher.css"
import { useDispatch } from "react-redux";
import { app_actions } from "../Redux/AppReducer";
export const ThemeSwitcher = (props : {theme : boolean}) => {
    const [isDarktheme,setTheme] = useState(true)
    const dispatch = useDispatch()
    const onClcikHandler = () => {
      dispatch(app_actions.toggleTheme())
      setTheme(!isDarktheme)
    }
    return (
      <>
      <div  onClick={onClcikHandler} className={props.theme ? "darkTheme_container" : "lightThemeContainer"}>
        <div className={props.theme ? "dark" : "light"}></div>
               
      </div>
        
      </>
            
          
        

    )
}