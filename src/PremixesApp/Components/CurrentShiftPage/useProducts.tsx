
import {  useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store"
import { productType } from "../../../Redux/Types"


export const useProducts = () => {
    let products = useSelector((state: Global_state_type) => state.blankShift.currentShift?.products)
    .map((el : productType) => {
        return {
            ...el,
            isDone : false
        }
    });

    return products;
}