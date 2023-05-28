import { Formik } from "formik";
import React, { useState } from "react";
import { string } from "yup";
import * as yup from "yup"
import "../../Styles/StartPage.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegistrationActions } from "../../Redux/RegistrationReducer";


export const JoinTheTeamFinish = () => {
    const navigate = useNavigate()
    const Submit = () => {
       
        navigate("/registration/join-team/finish")
    }
    const validationSchema = yup.object().shape({
        nickName: yup.string().typeError("Field must be string").min(6).max(20).required(),
        TeamID: yup.string().typeError("Field must be string").required().min(6).max(20)
    })
    const [showPassword,setShowPassword] = useState(false)
    const hidePassword = () => {
        if(showPassword){
            setShowPassword(false)
        }else{
            setShowPassword(true)
        }
    }
    return (
        <section className="fibnish_join">
              <Formik enableReinitializet={true}
                initialValues={{ email: "", password: "" ,repeatPassword : ""}}
                onSubmit={Submit}
                // validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                    return (
                        <div className="finish_input_container">
                            <input type="text" id="email" autoComplete="off" onChange={handleChange} placeholder="Email"/>
                            <span className="spanError">{touched.email ? errors.email : null}</span>
                           
                            <div className="showContainer" onClick={hidePassword}>
                            <input type={showPassword ? "text" : "password"}  id="passsword" autoComplete="off" onChange={handleChange} placeholder="Password "/>
                                <span>Show</span>
                            </div>
                            <span className="spanError">{touched.password ? errors.password : null}</span>
                            <input type="password" id="repeatPassword" placeholder="Repeat password"/>
                            <span className="spanError">{touched.repeatPassword ? errors.repeatPassword : null}</span>
                            <button
                                //@ts-ignore 
                                onClick={handleSubmit} id="next_join_step" type="submit">Finish</button>

                        </div>
                    )
                }}
            </Formik>
        </section>
    )
}

export const JoinTheTeam = () => {
    const dispatch : any = useDispatch()
    const navigate = useNavigate()
    const Submit = (values : {nickName : string,TeamID : string}) => {
        dispatch(RegistrationActions.setNickName(values.nickName))
        dispatch(RegistrationActions.setCompanyName(values.TeamID))
        navigate("/registration/join-team/finish")
        console.log("Submit")
    }
    const validationSchema = yup.object().shape({
        nickName: yup.string().typeError("Field must be string").min(6).max(20).required(),
        TeamID: yup.string().typeError("Field must be string").required().min(6).max(20)
    })
    return (
        <section className="join-the-tem-container">
            <Formik enableReinitializet={true}
                initialValues={{ nickName: "", TeamID: "" }}
                onSubmit={Submit}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                    return (
                        <div className="join_the_team_input_container">
                            <input type="text" id="nickName" autoComplete="off" onChange={handleChange} placeholder="Nickname"/>
                            <input type="nujoin-teammber" id="TeamID" autoComplete="off" onChange={handleChange} placeholder="Team ID "/>
                            <button
                                //@ts-ignore 
                                onClick={handleSubmit} id="next_join_step" type="submit">Next</button>

                        </div>
                    )
                }}
            </Formik>
        </section>
    )
}