
import {  useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../../Redux/Store"
import { useEffect } from "react"
import { getProductsByCompanyID } from "../../../../Redux/ProductReduxer"


export const useProducts = (companyID : string) => {
    const dispatch : any = useDispatch();
    let products = useSelector((state: Global_state_type) => state.blankShift.productList)

    useEffect(() => {
        dispatch(getProductsByCompanyID(companyID));
    },[products.length]);
    
  
    return products;
}
