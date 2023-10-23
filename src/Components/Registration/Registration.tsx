import { Formik } from "formik"
import  "../../Assets/Styles/Registration.css"
import { useDispatch, useSelector } from "react-redux"
import { RegistrationActions, createNewUserByEmailAndPassword } from "../../Redux/RegistrationReducer";
import { useState } from "react";
import showPasswordIcon from "../../Assets/Icons/icons8-eye-96.png"
import hidePasswordIcon from "../../Assets/Icons/icons8-hide-password-100.png"
import { validationShema } from "../../Helpers/Helpers";



export const Registration = () => {
    const dispatch: any = useDispatch()
    

    let [isPasswordHided,setPasswordHided] = useState(false)
    
    const Submit = (values :{nickName : string ,email : string,password : string,repeatPassword : string}) => {
        dispatch(RegistrationActions.setEmail(values.email))
        dispatch(RegistrationActions.setPassword(values.password))
        dispatch(RegistrationActions.setRepeatPassword(values.repeatPassword))
        dispatch(createNewUserByEmailAndPassword(values.nickName,values.email,values.password))

    }

    return (
        <section className="create_the_team_container">
                <h1>Создать аккаунт</h1>
          
                <Formik enableReinitialize={true}
                    initialValues={{ nickName: "", companyName: "",email: "",password : "",repeatPassword : ""}}
                    onSubmit={Submit}
                    
                validationSchema={validationShema}
                validateOnBlur={true}
                
                >
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                        return (
                            <div className="create_team_inputs translate_animation">

                                <input type="text" id="nickName" autoComplete="off" onChange={handleChange} placeholder="Имя" />
                                <span className="onInputError">{touched.nickName  ? errors.nickName : null}</span>
                                <input type="text" id="email" autoComplete="off" onChange={handleChange} placeholder="Почта" />
                                <span className="onInputError"> {touched.email ? errors.email : null}</span>

                                <div className="passwordFirstInput">
                                <input id="password" className="password" name="password" type={isPasswordHided ? "password" : "text"}  autoComplete="off" onChange={handleChange} placeholder="Пароль " />
                               

                                <img id="passwordToggle" src={isPasswordHided ? showPasswordIcon : hidePasswordIcon}
                                 onClick={() => {
                                    setPasswordHided(!isPasswordHided)
                                 }}alt="" />
                                </div>
                                <span className="onInputError"> {touched.password ? errors.password : null}</span>
                              
                                <input type={isPasswordHided ? "password" : "text"} id="repeatPassword"  autoComplete="off" onChange={handleChange} placeholder="Повторите пароль"/>
                                <span className="onInputError"> {touched.repeatPassword ? errors.repeatPassword : null}</span>

                                <button
                                    // @ts-ignore 
                                    onClick={handleSubmit} id="submit_reg" type="submit">Создать акаунт</button>
                            
                            
                            </div>
                        )
                    }}
            </Formik>
             
            
        </section>
    )
}