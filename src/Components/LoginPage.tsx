import React from "react";
import { useState } from "react";
import logo from "../Assets/bartendLogo.png"
import * as yup from "yup"
import { Formik } from "formik";
import "../Styles/Login.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginByEmailAndPassword } from "../Redux/AppReducer";

export const LoginPage = () => {
    const dispatch : any = useDispatch()
    const [hidePassword, setHidePassword] = useState(true)
    const onShowPasswordHandler = () => {
        if (hidePassword) {
            setHidePassword(false)
        } else {
            setHidePassword(true)
        }
    }
    const validationShema = yup.object().shape({
        email: yup.string().typeError("Email must be an string").min(6).max(30).required("This Field is Required")
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                "Incorrect email format"),
        password: yup.string().typeError("Password should be a string").required("This field is reqired").min(6).max(30)
            .matches(/^(?=.*[a-z])(?=.*[0-9])/,
                "Incorect password format")
    })
    //Login by email & password
    const Submit = (values: { email: string, password: string }) => {
        console.log(values)
        dispatch(loginByEmailAndPassword(values.email,values.password))
    }

    return (
        <section className="login_page_container translate_animation">

            <div className="login_form">
            <img src={logo} alt="" className="logo"/>
                <Formik initialValues={{
                    email: "",
                    password: ""
                }}
                    enableReinitialize={true}
                    validateOnBlur={true}
                    onSubmit={Submit}
                    validationSchema={validationShema}>
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                        return (


                            <section className="LoginByEmailAndPassword">
                                <h1>Login</h1>
                               
                                <input id="email" autoComplete="off" type="text" name="email" onChange={handleChange} placeholder={"Email"} onBlur={handleBlur} value={values.email} />
                              
                                <br />
                                <span className="spanError">{touched.email ? errors.email : null}</span>
                               
                                
                                <br />
                                <div className="input_container">
                                <input autoComplete="off" id="passwordInput" type={hidePassword ? "password" : "text"} name="password" onChange={handleChange} placeholder={"Password"} onBlur={handleBlur} value={values.password} />
                                <span className="show" onClick={onShowPasswordHandler}>Show</span>
                                </div>
                                <br />
                                <span className="spanError">{touched.password ? errors.password : null}</span>
                                <button id="loginButton" type="submit" disabled={!touched && !dirty}
                                    //@ts-ignore
                                    onClick={handleSubmit} >Login</button>
                                <br />
                                <h3>OR</h3>
                                <NavLink to="/registration">Create account</NavLink>



                            </section>

                        )
                    }}
                </Formik>
            </div>
        </section>
    )
}   