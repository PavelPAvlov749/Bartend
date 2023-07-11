import React, { useState } from "react";
import { Global_state_type } from "../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { productType } from "../../Redux/Types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import deleteIcon from "../../Assets/icons8-delete-96.png";
import backArrow from "../../Assets/icons8-back-90.png";
import backArrowLight from "../../Assets/icons8-reply-arrow-100.png"
import deleteIconLight from "../../Assets/icons8-delete-90.png"
import "../../Styles/PeoduxtCard.css"
import { deleteProductCrad } from "../../Redux/ProductReduxer";
import { calculateAndParseIntoComponent, parseComposition } from "../../Helpers/Helpers";
import { useTheme } from "@emotion/react";



export const ProductCard = () => {
    const dispatch: any = useDispatch()
    const navigate = useNavigate()
    const card: productType | null = useSelector((state: Global_state_type) => {
        return state.premixes.actualProductCard
    })
    const isDarkTheme = useTheme()
    const productID = useLocation().pathname.split("=")[1]

    const [showDescription, setShowDescription] = useState(false)
    const [showCompositon, setShowComposition] = useState(false)
    let [value, setValue] = useState(1)

    const deleteProduct = () => {
        dispatch(deleteProductCrad(productID))
        navigate("/premixes")
    }

    return (
        <section className={`product_card container translate_animation`}>

            <ul className="controls">
                <li className="controls_item" onClick={() => { navigate("/premixes") }}>
                    Back
                    <img src={isDarkTheme ? backArrow : backArrowLight} alt="" />
                </li>
                <li className="controls_item" onClick={deleteProduct}>
                    Delete
                    <img src={isDarkTheme ? deleteIcon : deleteIconLight} id="delete" alt="" />
                </li>
            </ul>



            <h1>{card?.name}</h1>
            <button onClick={() => { setShowDescription(!showDescription) }}>Описание</button>
            {showDescription ? <p>{card?.description}</p> :
                null
            }
            <br />
            <button onClick={() => setShowComposition(!showCompositon)}>Состав</button>
            <p>{showCompositon ?
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
                {card ? calculateAndParseIntoComponent(card, value)
                    : <Navigate to={"/premixes"} />}
            </div>



        </section>
    )
}