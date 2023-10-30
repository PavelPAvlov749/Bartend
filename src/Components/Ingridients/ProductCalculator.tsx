// React,ReactHooks
import React, { useState } from "react";
// Helpeers
import { calculateAndParseIntoComponent } from "../../Helpers/Helpers";
// Types
import { productType } from "../../Redux/Types";



export const ProdicuCalculater = (props : { product: productType | null}) => {
    // Multiplier value
    let [value, setValue] = useState(1);

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
                <input type="number" placeholder=" Сколько готовим?" onChange={calculate} />
                <br />
                <div className="calculated_result">
                    {calculateAndParseIntoComponent(props.product as productType, value)}
                </div>
            </section>


    )
}