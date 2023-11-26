import { useState } from "react";
import logo from "../../Assets/Icons/bartendLogo.png"
import { Formik } from "formik";
import "../../Assets/Styles/Login.css"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginByEmailAndPassword, signInWithGooglePopUp } from "../../Redux/AppReducer";
import showPass from "../../Assets/Icons/icons8-eye-96.png"
import hidePass from "../../Assets/Icons/icons8-hide-password-100.png"
import { loginValidationShema } from "../../Helpers/Helpers";
import { Global_state_type } from "../../Redux/Store";


export const LoginPage = () => {
    const dispatch: any = useDispatch()
    const [hidePassword, setHidePassword] = useState(true);
    let error = useSelector((state: Global_state_type) => state.App.errorMessage);

    const onShowPasswordHandler = () => {
        if (hidePassword) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    }

    //Login by email & password
    const Submit = (values: { email: string, password: string }) => {

        dispatch(loginByEmailAndPassword(values.email, values.password))
    }
    function GogleSignIn() {
        dispatch(signInWithGooglePopUp());
    }
    return (
        <section className="login_page_container translate_animation">

            <div className="login_form">
                <img src={logo} alt="" className="logo" />
                <Formik initialValues={{
                    email: "",
                    password: ""
                }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    onSubmit={Submit}
                    validationSchema={loginValidationShema}>
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                        return (
                            <section className="LoginByEmailAndPassword">
                                <h1 className="login-form__tittle">Login</h1>

                                <input id="email" autoComplete="off" type="text" name="email" onChange={handleChange} placeholder={"Email"} onBlur={handleBlur} value={values.email} />

                                <br />
                                <span className="spanError">{touched.email ? errors.email : null}</span>
                                <br />
                                <div className="input_container">
                                    <input autoComplete="off" id="passwordInput" type={hidePassword ? "password" : "text"} name="password" onChange={handleChange} placeholder={"Password"} onBlur={handleBlur} value={values.password} />
                                    <div className="show" onClick={onShowPasswordHandler}><img id="passwordShow" src={hidePassword ? showPass : hidePass} alt="" /></div>
                                </div>
                                <br />
                                <span className="spanError">{touched.password ? errors.password : null}</span>
                                <button id="loginButton" type="submit"
                                    //@ts-ignore
                                    onClick={handleSubmit} disabled={false}>Login</button>
                                <br />
                                {/* GOGGLE AUTH  */}
                                <button onClick={GogleSignIn} className="google-auth">Sign in with Google</button>

                                <br />
                            
                            </section>
                        )
                    }}
                </Formik>
                <h3>OR</h3>
                                <NavLink to="/registration"><span className={"create-account-link"}>Register</span></NavLink>
                                {error && <span className="errorMessage">{error}</span>}
            </div>
        </section>
    )
}   