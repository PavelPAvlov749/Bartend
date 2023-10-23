import React, { useState } from "react";
import "../Assets/Styles/ThemeSwitcher.css"
import { useDispatch } from "react-redux";
import { app_actions } from "../Redux/AppReducer";
import moonIcon from "../Assets/Icons/icons8-moon-symbol-90.png"
import sunicon from "../Assets/Icons/icons8-sun-96.png"

export const ThemeSwitcher = (props : {theme : boolean}) => {
    const [isDarktheme,setTheme] = useState(true)
    const dispatch = useDispatch()
    const onClcikHandler = () => {
      dispatch(app_actions.toggleTheme())
      setTheme(!isDarktheme)
    }
    return (
      <section className={`theme-switcher-container ${isDarktheme ? `DarkTheme` : `LightTheme`}`}>
        <span>{isDarktheme ? "Dark" : "Light"}</span>
        <img className="icon" src={isDarktheme ? moonIcon : sunicon} alt="" />
      <div  onClick={onClcikHandler} className={props.theme ? "darkTheme_container" : "lightThemeContainer"}>
        <div className={props.theme ? "dark" : "light"}></div>
        
      </div>
        
      </section>
            
          
        

    )
}