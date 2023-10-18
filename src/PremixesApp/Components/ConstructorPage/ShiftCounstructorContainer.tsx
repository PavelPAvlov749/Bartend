import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store";
import { getProductsByCompanyID } from "../../../Redux/ProductReduxer";
import { Reducer } from "./Reducer";








export const ShiftConstructorContainer = () => {
    let user = useSelector((state: Global_state_type) => state.App.user);
    let products = useSelector((state: Global_state_type) => state.blankShift.productList);
    const dispatch: any = useDispatch();

    let [state,setState] = useReducer(Reducer,products);

    useEffect(() => {
        dispatch(getProductsByCompanyID(user.teamID as string))
    }, []);


    return (
        <section className="shift-constructor container">

        </section>
    )
};