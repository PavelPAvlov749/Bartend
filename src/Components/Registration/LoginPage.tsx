import React from "react";
import { useState } from "react";
import logo from "../../Assets/bartendLogo.png"
import * as yup from "yup"
import { Formik } from "formik";
import "../../Styles/Login.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginByEmailAndPassword } from "../../Redux/AppReducer";
import showPass from "../../Assets/icons8-eye-96.png"
import hidePass from "../../Assets/icons8-hide-password-100.png"
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
        email: yup.string().typeError("Email должен быьб строкой").min(6).max(30).required("Это обязательное поле")
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                "Неверный формат email"),
        password: yup.string().typeError("Пароль должен быть строкой").required("Это обязательное поле").min(6,"Минимум 6 символов").max(30,"Превышено допустимое колличетсво символов")
            .matches(/^(?=.*[a-z])(?=.*[0-9])/,
                "Неверный формат пароля")
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
                                <h1>Логин</h1>
                               
                                <input id="email" autoComplete="off" type="text" name="email" onChange={handleChange} placeholder={"Email"} onBlur={handleBlur} value={values.email} />
                              
                                <br />
                                <span className="spanError">{touched.email ? errors.email : null}</span>
                               
                                
                                <br />
                                <div className="input_container">
                                <input autoComplete="off" id="passwordInput" type={hidePassword ? "password" : "text"} name="password" onChange={handleChange} placeholder={"Password"} onBlur={handleBlur} value={values.password} />
                                <div className="show" onClick={onShowPasswordHandler}><img  id="passwordShow" src={hidePassword ? showPass : hidePass} alt="" /></div>
                                </div>
                                <br />
                                <span className="spanError">{touched.password ? errors.password : null}</span>
                                <button id="loginButton" type="submit" disabled={!touched && !dirty}
                                    //@ts-ignore
                                    onClick={handleSubmit} >Войти</button>
                                <br />
                                <h3>или</h3>
                                <NavLink to="/registration" style={{"fontSize" : "x-large","color" : "rgb(242, 122, 67)"}}>Создать аккаунт</NavLink>



                            </section>

                        )
                    }}
                </Formik>
            </div>
        </section>
    )
}   