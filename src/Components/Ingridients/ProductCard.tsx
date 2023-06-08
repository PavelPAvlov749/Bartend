import React, { useEffect, useState } from "react";
import { Global_state_type } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { productType } from "../../Redux/Types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import deleteIcon from "../../Assets/icons8-delete-96.png";
import editIcon from "../../Assets/icons8-edit-96.png";
import backArrow from "../../Assets/icons8-back-90.png";
import backArrowLight from "../../Assets/icons8-reply-arrow-100.png"
import editIconLight from "../../Assets/icons8-edit-96 (1).png"
import deleteIconLight from "../../Assets/icons8-delete-90.png"
import "../../Styles/PeoduxtCard.css"
import { deleteProductCrad } from "../../Redux/ProductReduxer";
import { calculateAndParseIntoComponent, parseComposition } from "../../Helpers/Helpers";



export const ProductCard = () => {
    const dispatch : any = useDispatch()
    const navigate = useNavigate()
    const card: productType | null = useSelector((state: Global_state_type) => {
        return state.premixes.actualProductCard
    })
    const isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    const productID = useLocation().pathname.split("=")[1]

    const [showDescription, setShowDescription] = useState(false)
    const [showCompositon, setShowComposition] = useState(false)
    let [value, setValue] = useState(1)

    const deleteProduct = () => {
        console.log(productID)
        dispatch(deleteProductCrad(productID))
        navigate("/premixes")
    }

    return (
        <section className={`${isDarkTheme ? "card_container Dark" : "card_container Light"} translate_animation`}>
            <div className="controls">
                <img src={isDarkTheme ? backArrow : backArrowLight}  onClick={() => {navigate("/premixes")}} alt="" />
                <img src={isDarkTheme ? editIcon : editIconLight} alt=""/>
                <img src={isDarkTheme ? deleteIcon : deleteIconLight} id="delete"  onClick={deleteProduct} alt="" />
            </div>
            <h1>{card?.name}</h1>
            <button onClick={() => { setShowDescription(!showDescription) }}>Описание</button>
            {showDescription ? <p>{card?.description}</p> :
                null
            }
            <br />
            <button onClick={() => setShowComposition(!showCompositon)}>Состав</button>
            <p>{ showCompositon ?
              parseComposition(card?.composition as {})
             : null}</p> 
            <br />
            <input type="number" placeholder=" Сколько готовим?" onChange={(e: React.FormEvent<HTMLInputElement>) => {

                if (e.currentTarget.value.length < 1) {
                    setValue(1)
                } else {
                    setValue(Number(e.currentTarget.value))
                }

            }} />
            <br />
            <div className="calculated_result">
            {card ? calculateAndParseIntoComponent(card,value)
                 : <Navigate to={"/premixes"} />}
            </div>
        


        </section>
    )
}