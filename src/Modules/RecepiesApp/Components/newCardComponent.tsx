import { Formik } from "formik"
import { useSelector } from "react-redux"
import { Global_state_type } from "../../../Redux/Store"
import React, { useState } from "react"
import { keys } from "@mui/system"


type RenderFormType = {
    count : number,
    handleChange : any,
    onBlur : any
}

const RenderForms: React.FC<RenderFormType> = (props) => {

        return (
            <>
                <input onChange={props.handleChange} onBlur={props.onBlur} type="text"></input>
                <input onChange={props.handleChange} onBlur={props.onBlur} type="number"></input>
            </>
        )
    
}

export const NewCardComponent: React.FC = () => {
    // Define an initial values
    // let initialValues =
    // {
    //     name: "",
    //     description: "",
    //     keys : [""],
    //     values : [0]
    // }
    // Single component hook 
    // Desfine a state counter
    let [initialValues,setValues] = useState({
        name: "",
        description: "",
        keys : [""],
        values : [0]
    });
    
    // Increment counter function 
    // html


    function incrementCounter () {
        setValues({...initialValues,keys : [...initialValues.keys,""]}) 
    }
    // Submit handler function 
    function Submit() {
        console.log("Submit")
    }
    return (
        <section>
            <Formik
                onSubmit={Submit}
                initialValues={initialValues}
                enableReinitialize={true}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                    return (
                        <div>
                            <input onChange={handleChange} id="name" placeholder="Type name"></input>
                            <input type="checkbox" id="visibility" onChange={handleChange}/>
                            <textarea onChange={handleChange} id="description" placeholder="Type description"></textarea>
                            {/* {values.keys.map((el : string) => {
                                return (
                                    <div>
                                        <input id="key" required={true} type="text" onChange={handleChange} />
                                        <input name="value" required={true} type="number" onChange={handleChange}/>
                                    </div>
                                )
                            })} */}
                            {/* <RenderForms count={counter} onBlur={handleBlur} handleChange={handleChange}/>  */}
                            <button onClick={incrementCounter}>Add ingridient</button>
                            {/* @ts-ignore */}
                            <button type="submit" onSubmit={Submit}>Create</button>
                        </div>
                    )
                }}

            </Formik>

        </section>
    )
}



