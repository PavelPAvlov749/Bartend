import React from "react";
import { productType } from "../Redux/Types";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productActions } from "../Redux/ProductReduxer";
import empty from "../Assets/icons8-empty-90.png"

export const BlankList = (props: { blanks: productType[] ,dispatch : any,Navigate : (a : string) => any}) => {
   

    if (props.blanks.length > 0) {
        return (
            <>
                {props.blanks.map((el : productType) => {
                    return (
                        <div className="element" onClick={() => {
                        
                            props.dispatch(productActions.setAcualProductCard(el))
                            props.Navigate("/card/id=" + el.id)
                            
                            }}>
                        
                              <NavLink to={"/product/id=" + el.id}>
                            <span>{el.name.includes("_") ? el.name.split("_")[0] + " " + el.name.split("_")[1] : el.name  }</span>
                            </NavLink>
                         
                            <br />
                          
                        </div>
                    )
                })}
            </>
        )
        
              
    }else{
        return (
            <div className="nothing_found">
            <img src={empty} className="emtyIcon" alt="" />
            <h1>Nothing Found</h1>
        </div>
        )
    }
}