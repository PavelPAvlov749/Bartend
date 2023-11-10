import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { Global_state_type } from "../../Redux/Store";
import { setProductCardThunk } from "../../Redux/ProductReduxer";


export const useProductCard = () => {
    const dispatch : any = useDispatch();
    // Get current location and select product id from him
    let location = useLocation().pathname.split("=")[1];
    let products = useSelector((state : Global_state_type) => state.premixes.actualProductCard);

    
    useEffect(() => {
        dispatch(setProductCardThunk(location));
    },[]);
    if(products)
    {
        return products;
    }
    else
    {
        return null;
    }
}