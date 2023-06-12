
import { Formik } from "formik";
import * as yup from "yup"
import { useDispatch } from "react-redux";
import {newCardActions } from "../..//Redux/NewCardReducer";
import "../../Styles/NewProduct.css"


export const NewIngridientSingleForm = () => {
    const dispatch: any = useDispatch()
    // VALIDATION SHEMA
    const validationSchema = yup.object().shape({
        key: yup.string().typeError("This field should be a string").min(1).max(20).required("This field is Required"),
        value: yup.number().typeError("This field should be a digit").min(1).max(20).required("This field is Required")

    })
    // SUBMIT FORMS
    const Submit = (values: { key: string, value: string }) => {
        let newIngridient = { [values.key]: values.value }
        console.log(newIngridient)
        dispatch(newCardActions.addNewIngridient(newIngridient))
    }
    return (
        <div className="single_input">
            <Formik initialValues={{ key: "", value: "" }}
                enableReinitialize={true}
                validateOnBlur={true}
                onSubmit={Submit}
            //   validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                    return (
                        <div className="input_container">
                            <input type="text" id="key" autoComplete="off" onChange={handleChange} />
                            <input type="number" id="value" autoComplete="off" onChange={handleChange} />

                            <button
                                //@ts-ignore 
                                onClick={handleSubmit} id="add_component" type="submit">+</button>

                        </div>
                    )
                }}
            </Formik>
        </div>
    )
}