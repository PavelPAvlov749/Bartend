
import {  useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store"
import { productType } from "../../../Redux/Types"
import { Dispatch, useEffect } from "react"
import { getCurrentShiftByCompanyID } from "../../../Redux/BlankShiftReducer"


export const useProducts = (companyID : string) => {
    const dispatch : any = useDispatch();

    useEffect(() => {
        dispatch(getCurrentShiftByCompanyID(companyID));
    },[]);
    
    let products = useSelector((state: Global_state_type) => state.blankShift.currentShift.products)
    .map((el : productType) => {
        return {
            ...el,
            isDone : false
        }
    });

    return products;
}
