
// Styles
import "../Styles/NewProduct.css";
// Cpmponents
import { FirstStep } from "./FirstStep";
// Hooks
import { useLocation, } from "react-router-dom";

export const NewProduct = (props : {isDarkTheme : boolean} ) => {

    const location = useLocation().pathname.split("/")[1]

    console.log(location)
    return (
        <section className="recepie_constructor translate_animation">
            <FirstStep isDarkTheme={props.isDarkTheme}/>
          
        
        </section>
    )
}