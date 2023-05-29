import { readSync } from "fs"
import React, { ReactNode } from "react"
import * as yup from "yup"


export function getFullDateString() {
    let date = new Date()
    let mm = date.getMonth() + 1
    let yy = date.getUTCFullYear()
    let dd = date.getDate()

    return mm + "/" + dd + "/" + yy
}

export const parseCompostitionToString = (object: { composition: {} } ) => {

        let result = Object.keys(object?.composition).map((el: string, index: number) => {

        return (
            <>
                <p>
                    {
                        el.includes("_") ?
                            el.split("_")[0] + " " + el.split("_")[1] :
                            el + " : " + Object.values(object?.composition as {})[index]
                    }
                </p>
            </>
        )
    })
    return result
}

export const calculateAndParseIntoComponent = (card :{ composition: {} },value : number) => {
    let result = Object.keys(card?.composition as {}).map((el: string, index: number) => {
        return (<>
            <span>{el.includes("_") ? el.split("_")[0] + " " + el.split("_")[1] + " : " + Number(Object.values(card?.composition as {})[index]) * value :
                el + " : " + Number(Object.values(card?.composition as {})[index]) * value}</span><br />
                </>
        )
    })
    return result
}

export const validationShema = yup.object().shape({
    nickName: yup.string().typeError("Username must be string").max(30).min(5).required(),
    email: yup.string().typeError("Email must be an string").min(6).max(30).required("This Field is Required")
        .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Incorrect email format"),
    password: yup.string().typeError("Password should be a string").required("This field is reqired").min(6).max(30),
    repeatPassword: yup.string().required("This field is required").oneOf([yup.ref("password")],"Passwords dint match").typeError("Should be a string").min(6).max(30)
        
})