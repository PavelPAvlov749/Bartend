
import {  useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store"
import { productType } from "../../../Redux/Types"
import { Dispatch, useEffect } from "react"
import { getCurrentShiftByCompanyID } from "../../../Redux/BlankShiftReducer"
import { getProductsByCompanyID } from "../../../Redux/ProductReduxer"


export const useProducts = (companyID : string) => {
    const dispatch : any = useDispatch();
    let products = useSelector((state: Global_state_type) => state.blankShift.productList)

    useEffect(() => {
        dispatch(getProductsByCompanyID(companyID));
    },[products.length]);
    
  
    return products;
}
