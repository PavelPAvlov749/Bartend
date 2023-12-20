
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {newCardActions } from "../../../Redux/NewCardReducer";
import "../Styles/NewProduct.css"


export const NewIngridientSingleForm = () => {
    const dispatch: any = useDispatch()
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