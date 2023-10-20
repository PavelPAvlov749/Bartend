import { useEffect, useReducer } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store";
import { getProductsByCompanyID } from "../../../Redux/ProductReduxer";
import { Reducer } from "./Reducer";
import { CreateNewShiftControls } from "./CreateNewShiftControls";
import { productType } from "../../../Redux/Types";
import { ProductList } from "./PrdocuctList";
import { useProducts } from "./useProducts";
// import { useProducts } from "../CurrentShiftPage/useProducts";








export const ShiftConstructorContainer = () => {
    let user = useSelector((state: Global_state_type) => state.App.user);
    // let products = useSelector((state: Global_state_type) => state.blankShift.productList);
    const dispatch: any = useDispatch();
   
    let products = useProducts(user.teamID as string);
    // console.log(products)
    // useEffect(() => {
        // dispatch(getProductsByCompanyID(user.teamID as string))
    //   
    // }, [products.length]);


    return (
        <section className="shift-constructor container">
            <CreateNewShiftControls products={products} user={user} />
            <ProductList products={products} />
        </section>
    )
};