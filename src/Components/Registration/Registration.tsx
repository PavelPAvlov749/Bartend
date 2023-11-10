// React,ReactHooks
import { useState } from "react";

// Components
import { RegistrationFormInput } from "./RegistrationForm";

// API funcions,Helpers
import { validationShema } from "../../Helpers/Helpers";
import { authApi } from "../../services/Firebase/AuthAPI";
import { FirebaseError } from "firebase/app";

// Styles and Assets
import "../../Assets/Styles/Registration.css"
import showPasswordIcon from "../../Assets/Icons/icons8-eye-96.png"
import hidePasswordIcon from "../../Assets/Icons/icons8-hide-password-100.png"

// Formik
import { Formik } from "formik"



/**
 * New user registration component.
 * Uses the Formik library for form control and validation
 * 
 * @returns React.Ellement
 */
export const Registration = () => {

    // Show hide password boolean flag
    let [isPasswordHided, setPasswordHided] = useState(false);
    // Error message state
    let [error, setError] = useState<string>("")

    // Create user function 
    const Submit = async (values: { nickName: string, email: string, password: string, repeatPassword: string }) => {
        // Try to create user 
        await authApi.createUserWithEmailAndPassword(values.email, values.password, values.nickName)
            .catch((ex: FirebaseError) => {
                // If error was throwed set error message
                setError(ex.message.split("(")[1].split(")")[0]);
            });
    }
    // Show hode password toggler function
    function togglePassword() {
        setPasswordHided(!isPasswordHided);
    }
    return (
        <section className="create_the_team_container">
            <h1>Create account</h1>

            <Formik
                enableReinitialize={true}
                initialValues={{ nickName: "", companyName: "", email: "", password: "", repeatPassword: "" }}
                onSubmit={Submit}
                // Formik Validation Shema imported from Helpers
                validationSchema={validationShema}
                validateOnBlur={true}

            >
                {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <div className="create_team_inputs translate_animation">
                            <span className="onInputError">{error}</span>
                            <RegistrationFormInput type="text" touched={touched.nickName} id={"nickName"} handleChange={handleChange} errors={errors.nickName} />
                            <RegistrationFormInput type="text" id="email" touched={touched.email} handleChange={handleChange} errors={errors.email} />

                            {/* Password input with show password button */}
                            <div className="passwordFirstInput">
                                <RegistrationFormInput type={isPasswordHided ? "password" : "text"}
                                    handleChange={handleChange} id="password" touched={touched.password} errors={errors.password} />
                                {/* Show - hide password toggler */}
                                <img id="passwordToggle" src={isPasswordHided ? showPasswordIcon : hidePasswordIcon} onClick={togglePassword} alt="" />
                            </div>
                            <span className="onInputError"> {touched.password ? errors.password : null}</span>
                            <RegistrationFormInput touched={touched.repeatPassword} errors={errors.repeatPassword} id="repeatPassword"
                                type={isPasswordHided ? "password" : "text"} handleChange={handleChange} />

                            <button
                                // @ts-ignore 
                                onClick={handleSubmit} id="submit_reg" type="submit">Create account</button>
                        </div>
                    )
                }}
            </Formik>


        </section>
    )
}

