
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { newCardActions } from "../../../Redux/NewCardReducer";
import "../Styles/NewProduct.css"
import { addIngridientValidationScema } from "../../../Helpers/Helpers";


export const NewIngridientSingleForm = () => {
    const dispatch: any = useDispatch()
    // SUBMIT FORMS
    const Submit = (values: { key: string, value: string }) => {
        let newIngridient = { [values.key]: values.value }
        dispatch(newCardActions.addNewIngridient(newIngridient))
    }
    return (
        <div className="single_input">
            <Formik initialValues={{ key: "", value: "" }}
                enableReinitialize={true}
                validateOnBlur={true}
                onSubmit={Submit}
                validationSchema={addIngridientValidationScema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                    console.log(isValid)
                    return (
                        <div className="input_container">
                            <input type="text" id="key" className={!errors.key ? "input" : "error-input"} required={true} autoComplete="off" onChange={handleChange} />
                            <input type="number" id="value" className={!errors.value ? "input" : "error-input"}  required={true} autoComplete="off" onChange={handleChange} />

                            <button
                                //@ts-ignore 
                                onClick={handleSubmit} id="add_component" type="submit">add</button>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
}