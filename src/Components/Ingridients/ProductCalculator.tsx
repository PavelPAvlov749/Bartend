// React,ReactHooks
import React, { useState } from "react";
// Helpeers
import { calculateAndParseIntoComponent } from "../../Helpers/Helpers";
// Types
import { productType } from "../../Redux/Types";



export const ProdicuCalculater = (props : { product: productType | null}) => {
    // Multiplier value
    let [value, setValue] = useState(1);
    console.log(props.product);
    // Input Handler
    // Function to calculate value of prdoduct composition
    function calculate(event: React.SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value.length < 1) {
            setValue(1)
        } else {
            setValue(Number(event.currentTarget.value))
        }
    };

    return (
      
            <section className="product-card__calculator">
                <input type="number" placeholder=" How much do we need?" onChange={calculate} />
                <br />
                <div className="calculated_result">
                    {calculateAndParseIntoComponent(props.product?.composition as {}[], value)}
                </div>
            </section>


    )
}