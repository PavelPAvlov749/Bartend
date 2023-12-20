
import "../Styles/NewProduct.css"

import { SecondStep } from "./SecondStep";

import { Compund } from "./Compound";
import { TopSection } from "./TopSection";

export const FirstStep = (props: { isDarkTheme: boolean }) => {

    return (
        <section className={props.isDarkTheme ? "new_premix_first_step container DarkTheme" : "container LightTheme"}>
            <h1 className="first_step_tittle">Recepie constructor</h1>
            <TopSection />
            <SecondStep />
            <Compund />

        </section>
    )
}