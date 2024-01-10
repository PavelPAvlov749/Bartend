import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../Redux/Store";
import { productType } from "../Redux/Types";
import { getProductsByCompanyID } from "../Redux/ProductReduxer";


export const useProducts = () => {
    const dispatch : any = useDispatch() 
    const teamID = useSelector((state: Global_state_type) => { return state.App.user.teamID })
    useEffect(() => {
        dispatch(getProductsByCompanyID(teamID as string))
    }, [])
    let products = useSelector((state: Global_state_type) => {
        return state.premixes.premixes
    })
    if(products.length > 0) {
        return products
    }
    else{
        return []
    }
}

export const useProductFilter = (initial : string) : [productType[],(e : string) => void] => {
    const [filter,setFilter] = useState(initial)
    const dispatch : any = useDispatch() 
    const teamID = useSelector((state: Global_state_type) => { return state.App.user.teamID })
    useEffect(() => {
        dispatch(getProductsByCompanyID(teamID as string))
    }, []);
    let products = useSelector((state: Global_state_type) => {
        if(filter.length === 0) {
            return state.premixes.premixes
        }
        return state.premixes.premixes.filter((el : productType) => el.name.includes(filter))
    })
    const updateFilter = (value : string) => {
        setFilter(value)
    }
    
    return [products,updateFilter]
    
}

export const useWindowInnerWidth = () => {
    const [windowWidth,setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResizeWindow = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize",handleResizeWindow)
        return () => {
            window.removeEventListener("resize",handleResizeWindow)
        }
    },[])
    return windowWidth
}


export const useDebounce = (callback : (...args:any) => {},delay : number,value : any)=> {
    const timer = useRef(null);
    const dispatch : any = useDispatch();
    const DebounceCallback = useCallback((...args : any) => {
        if(timer.current){
            clearTimeout(timer.current);
        }
        else {
            setTimeout(() => {
                console.log("DISPATHED")
               dispatch(callback(value));
            },delay)
        }
    },[callback,delay]);

    console.log(DebounceCallback)
    return DebounceCallback;
}


/**
 * 
 * @param initialValue initial value for boolean flag
 * @returns [actualState,TogglerFunction]
 */
export const UseToggle = (initialValue : boolean) : [boolean,() => void] => {

    let [state,setState] = useState<boolean>(initialValue);
    
    function toggle () {
        setState(!state);
    }

    return [state,toggle];
}

export const useNewCardIngridients = () => {
    const products = useSelector((state : Global_state_type) => state.newCard.composition);
    return Object.keys(products as {});
}