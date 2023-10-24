// React,React hooks
import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
// Components
import { ProductList } from "./PrdocuctList";
// Types
import { Global_state_type } from "../../../../Redux/Store";
// Custom Hooks
import { Reducer } from "../../Reducers/constructorReducer";
// Redux.Redux thunks
import { CreateNewShiftControls } from "./CreateNewShiftControls";
import { getProductsByCompanyID } from "../../../../Redux/ProductReduxer";




export const ShiftConstructorContainer = () => {
    let user = useSelector((state: Global_state_type) => state.App.user);
    let products = useSelector((state: Global_state_type) => state.blankShift.productList);
    const dispatch: any = useDispatch();
    // Define a localal reducer with custom toggling state
    let [state, dispatchProducts] = useReducer(Reducer, products);
    // Get products and pass them into the local state
    useEffect(() => {
        dispatchProducts({
            type: 'set-products',
            payload: products
        });
    }, [products.length]);

    useEffect(() => {
        dispatch(getProductsByCompanyID(user.teamID as string))
    }, []);


    return (
        <section className="shift-constructor container">
            <CreateNewShiftControls products={state} user={user} dispatchProducts={dispatchProducts}/>
            <ProductList products={state} dispatch={dispatchProducts}  />
        </section>
    )
};