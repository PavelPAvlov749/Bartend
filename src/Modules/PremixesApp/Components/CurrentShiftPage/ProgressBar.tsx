// Styles
import "../../../../Assets/Styles/BlamkShift.css"
// Types
import { productType } from "../../../../Redux/Types";

type PropsType = {
    products: productType[]
}


export const ProgressBar = (props: PropsType) => {

    let { products } = props;
    // Here we get the percentage and number of finished ingredients for the progress bar
    let readyProducts = products.filter((item: any) => item.isDone === true);
    let percent = 100 / products.length * Number(readyProducts.length);
    return (

        <div className="progress_bar">
            <span>{readyProducts.length + "/" + products.length}</span>
            <span>{percent.toFixed(1) + "%"}</span>
        </div>
    )
}