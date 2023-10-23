
import { useState } from "react";
import logo from "../../Assets/Icons/bartendLogo.png"
import { Formik } from "formik";
import "../../Assets/Styles/Login.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginByEmailAndPassword } from "../../Redux/AppReducer";
import showPass from "../../Assets/Icons/icons8-eye-96.png"
import hidePass from "../../Assets/Icons/icons8-hide-password-100.png"
import { loginValidationShema} from "../../Helpers/Helpers";


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

    //Login by email & password
    const Submit = (values: { email: string, password: string }) => {
       
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
                    validationSchema={loginValidationShema}>
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
                                <button id="loginButton" type="submit" 
                                    //@ts-ignore
                                    onClick={handleSubmit} disabled={false}>Войти</button>
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