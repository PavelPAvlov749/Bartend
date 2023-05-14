import React from "react";
import { productType } from "../Redux/Types";
import { useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { NavLink } from "react-router-dom";
import empty from "../Assets/icons8-empty-90.png"
import "../Styles/Premixes.css"

export const Premixes = () => {
    let products = useSelector((state : Global_state_type) => {
        return state.premixes.premixes
    })

    const onChange = (el: productType) => {
  
        // dispatch(product_actions.addToSelected(el))
        let prevStorage = JSON.parse(localStorage.getItem("products") as string)
      
        if(prevStorage){
            prevStorage.push(el)
        localStorage.setItem("products",JSON.stringify(prevStorage))}
        else{
            localStorage.setItem("products",JSON.stringify([el]))
        }
    }
    return (
        <section className="priductListPAge">
        <input className="search" placeholder="Search items" ></input>
        <section className="productListContainer">

            {  products.length > 0 ? products.map((el: productType) => {
                return (
                    <div className="element">
                    
                          <NavLink to={"/product/id=" + el.id}>
                        <span>{el.name.includes("_") ? el.name.split("_")[0] + " " + el.name.split("_")[1] : el.name  }</span>
                        </NavLink>
                        <input className="checkBox" type="checkbox" onChange={() => {
                            onChange(el)
                        }}></input>
                        <br />
                      
                    </div>
                )}) : <div className="nothing_found">
                        <img src={empty} className="emtyIcon" alt="" />
                        <h1>Nothing Found</h1>
                    </div>}
        </section>
        </section>
    )
}