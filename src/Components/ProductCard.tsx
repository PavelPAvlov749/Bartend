import React, { useEffect, useState } from "react";
import { Global_state_type } from "../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { productType } from "../Redux/Types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import deleteIcon from "../Assets/icons8-delete-96.png";
import editIcon from "../Assets/icons8-edit-96.png";
import backArrow from "../Assets/icons8-back-90.png";
import "../Styles/PeoduxtCard.css"
import { Firestore_instance } from "../Firebase/PremixesAPI";
import { deleteProductCrad } from "../Redux/ProductReduxer";



export const ProductCard = () => {
    const dispatch : any = useDispatch()
    const navigate = useNavigate()
    const card: productType | null = useSelector((state: Global_state_type) => {
        return state.premixes.actualProductCard
    })
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
        <section className="card_container">
            <div className="controls">
                <img src={backArrow}  onClick={() => {navigate(-1)}} alt="" />
                <img src={editIcon} alt=""/>
                <img src={deleteIcon} id="delete"  onClick={deleteProduct} alt="" />

            </div>
            <h1>{card?.name}</h1>
            <button onClick={() => { setShowDescription(!showDescription) }}>Description</button>
            {showDescription ? <p>{card?.description}</p> :
                null
            }
            <br />
            <button onClick={() => setShowComposition(!showCompositon)}>Composition</button>
            {showCompositon ? <p>{
                Object.keys(card?.composition as {}).map((el: string, index: number) => {
                    return (
                        <p >{el.includes("_") ? el.split("_")[0] + " " + el.split("_")[1] :
                            el + " : " + Object.values(card?.composition as {})[index]}</p>
                    )
                })
            }</p> : null}
            <br />
            <input type="number" placeholder="How much do we need" onChange={(e: React.FormEvent<HTMLInputElement>) => {

                if (e.currentTarget.value.length < 1) {
                    setValue(1)
                } else {
                    setValue(Number(e.currentTarget.value))
                }

            }} />
            <br />
            <div className="calculated_result">
            {card ? Object.keys(card?.composition as {}).map((el: string, index: number) => {
                return (<>
                    <span>{el.includes("_") ? el.split("_")[0] + " " + el.split("_")[1] + " : " + Number(Object.values(card?.composition as {})[index]) * value :
                        el + " : " + Number(Object.values(card?.composition as {})[index]) * value}</span><br />
                        </>
                )
            }) : <Navigate to={"/premixes"} />}
            </div>
        


        </section>
    )
}