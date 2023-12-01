
import "../../../Assets/Styles/NewProduct.css"
import { FirstStep } from "./FirstStep";
import { useLocation, useNavigate } from "react-router-dom";

export const NewProduct = (props : {isDarkTheme : boolean} ) => {

    const location = useLocation().pathname.split("/")[1]
    const navigate = useNavigate()
    console.log(location)
    return (
        <section className="container translate_animation">
            <FirstStep isDarkTheme={props.isDarkTheme}/>
            <button className="confirm_button" onClick={() => {navigate("/add-step-two")}} id="next_button">Next</button>
        
        </section>
    )
}