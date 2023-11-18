import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPublicPremixes } from "../../Redux/ProductReduxer";
import { Global_state_type } from "../../Redux/Store";
import { productType } from "../../Redux/Types";
import { Premixcard } from "./PremixCard";

export const PremixesList : React.FC = () => {
    // Get dispatch 
    const dispatch : any = useDispatch();
    useEffect(() => {
        dispatch(getPublicPremixes());
    },[])
    // Get premixes from state
    const state = useSelector((state : Global_state_type) => state.premixes.premixes);

    return (
        <section className="premisex-list">
            {state.map((el : productType) => {
                return (
                    <Premixcard name={el.name} id={el.id as string}/>
                )
            })}
        </section>
    )
}