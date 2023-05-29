import { Formik } from "formik"
import styles from "../../Styles/CreateTeamContainer.module.css"
import { useDispatch, useSelector } from "react-redux"
import { RegistrationActions, createNewUserByEmailAndPassword } from "../../Redux/RegistrationReducer";
import { useState } from "react";
import showPasswordIcon from "../../Assets/icons8-eye-96.png"
import hidePasswordIcon from "../../Assets/icons8-hide-password-100.png"
import { Global_state_type } from "../../Redux/Store";
import { userType } from "../../Redux/Types";
import { validationShema } from "../../Helpers/Helpers";



export const CreateTheTeam = () => {
    const dispatch: any = useDispatch()
    

    let [isPasswordHided,setPasswordHided] = useState(false)
    
    const Submit = (values :{nickName : string ,email : string,password : string,repeatPassword : string}) => {
        dispatch(RegistrationActions.setEmail(values.email))
        dispatch(RegistrationActions.setPassword(values.password))
        dispatch(RegistrationActions.setRepeatPassword(values.repeatPassword))
        dispatch(createNewUserByEmailAndPassword(values.nickName,values.email,values.password))

    }

    return (
        <section className={styles.create_the_team_container}>
            <h1>Create teams and <span>Join</span> your coworkers</h1>
          
                <Formik enableReinitialize={true}
                    initialValues={{ nickName: "", companyName: "",email: "",password : "",repeatPassword : ""}}
                    onSubmit={Submit}
                    
                validationSchema={validationShema}
                validateOnBlur={true}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                        return (
                            <div className={styles.create_team_inputs}>

                                <input type="text" id="nickName" autoComplete="off" onChange={handleChange} placeholder="Имя" />
                                <span className={styles.onInputError}>{touched.nickName  ? errors.nickName : null}</span>
                                <input type="text" id="email" autoComplete="off" onChange={handleChange} placeholder="Почта" />
                                <span className={styles.onInputError}> {touched.email ? errors.email : null}</span>

                                <div className={styles.passwordFirstInput}>
                                <input id="password" className={styles.password} name="password" type={isPasswordHided ? "password" : "text"}  autoComplete="off" onChange={handleChange} placeholder="Пароль " />
                               

                                <img id={styles.passwordToggle} src={isPasswordHided ? showPasswordIcon : hidePasswordIcon}
                                 onClick={() => {
                                    setPasswordHided(!isPasswordHided)
                                 }}alt="" />
                                </div>
                                <span className={styles.onInputError}> {touched.password ? errors.password : null}</span>
                              
                                <input type={isPasswordHided ? "password" : "text"} id="repeatPassword"  autoComplete="off" onChange={handleChange} placeholder="Повторите пароль"/>
                                <span className={styles.onInputError}> {touched.repeatPassword ? errors.repeatPassword : null}</span>

                                <button
                                    //@ts-ignore 
                                    onClick={handleSubmit} id="next_join_step" type="submit">Создать акаунт</button>
                            
                            
                            </div>
                        )
                    }}
            </Formik>
             
            
        </section>
    )
}