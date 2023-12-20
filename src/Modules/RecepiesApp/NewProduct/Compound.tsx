import { useState } from "react";
import { NewIngridientSingleForm } from "./NewIngridientSingleForm";

export const Compund: React.FC = () => {
    // ARRAY OF FORMS FOR ADDING NEW COMMPOENT OBJET
    let [forms, setForms] = useState([
        <NewIngridientSingleForm />
    ]);
    // ADD NEW INPUTS FOR NEW COMPONENT
    const addInput = (e: React.MouseEvent<HTMLElement>) => {
        setForms([...forms, <NewIngridientSingleForm />])

    }
    return (
        <section className="compound">
            <h2>Composition : </h2>
            <div className="compound_inputs">
                {forms}
            </div>

            <button onClick={addInput} className="add-ingridient">Add ingrideint</button>
        </section>
    )
}