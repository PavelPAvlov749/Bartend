import React from "react";
import coctailBackground from "../../Assets/mixingCocktai.jpg"
import "../../Styles/StartPage.css"
import { useNavigate } from "react-router-dom";


export const StartPage = () => {
    const navigate = useNavigate()

    return (    
        <section className="start_page_container">
           <button onClick={() => {
            navigate("join-team")
           }}>Join the Team</button>

           <button onClick={() => {
            navigate("/create-team")
           }}>Create Team</button>
        </section>
    )
}