import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Reducer } from "../../Reducers/constructorReducer";
import { CreateNewShiftControls } from "./CreateNewShiftControls";
// import { productType } from "../../../Redux/Types";
import { ProductList } from "./PrdocuctList";
import { Global_state_type } from "../../../../Redux/Store";
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

    // console.log(products)
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