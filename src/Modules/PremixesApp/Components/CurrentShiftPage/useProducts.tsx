
import {  useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../../Redux/Store"
import { useEffect } from "react"
import { getCurrentShiftByCompanyID } from "../../../../Redux/BlankShiftReducer"
import { productType } from "../../../../Redux/Types"


export const useProducts = (companyID : string) => {
    const dispatch : any = useDispatch();

    useEffect(() => {
        dispatch(getCurrentShiftByCompanyID(companyID));
    },[]);
    
    let products = useSelector((state: Global_state_type) => state.blankShift.currentShift.products);

    products = products.map((el : productType) => {
        return {
            ...el,
            isDone : false  
        }
    });
    console.log(products)
    if(Array.isArray(products)) {
        return products;
    }
    else
    {
        return [];
    }
};
