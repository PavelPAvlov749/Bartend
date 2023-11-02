
import * as yup from "yup"
import { productType } from "../Redux/Types"
import { ReactNode } from "react"


// Helprt to create a Date string
// Хэлпер для создания строки даты
export function getFullDateString() {
    let date = new Date()
    let mm = date.getMonth() + 1
    let yy = date.getUTCFullYear()
    let dd = date.getDate()

    return mm + "/" + dd + "/" + yy
}


export const parseComposition = (composition: {}[]) => {
    // EN
    // This function helps to parse the premix composition array into an array of span elements
    // Used in product Card Compoennt to render composition 
    return (
        <>
        {composition.map((el : {},index : number,array : {}[])=> {
            return (
                <>
                <span>{Object.keys(el)[0] + " : "}</span>
                <span>{Object.values(el)[0] as ReactNode}</span>
                <br />
                </>
            )
        })}
        </>
    )
}

/**
 * 
 * @param composition Array of component onjects
 * @param value Value Multiplier 
 * @returns React.Ellement containig calculated values
 */
export const calculateAndParseIntoComponent = (composition: Array<{}>, multiplier: number) => {
    // Go through the mass of ingredients and return the components 
    // containing the keys of the ingredients and the quantity multiplied by the factor
    return composition.map((el : {},index : number,array : {}[]) => {
        return( 
            <>
                <span>{Object.keys(el)[0] + ' : '}</span>
                {/*Get key value and multiply them by multiplier  */}
                <span>{(Object.values(el)[0] as number) * multiplier}</span>
                <br />
            </>
        )
    })
}


export const parseElementNameToString = (name: string) => {
    return name.includes("_") ? name.split("_")[0] + " " + name.split("_")[1] : name
}


// Creating a Validation Scheme for the Registration Login

export const validationShema = yup.object().shape({
    nickName: yup.string().typeError("Username must be string")
    .max(30).min(5).required(),
    email: yup.string().typeError("Email must be an string").min(6).max(30)
    .required("This Field is Required")
    .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        "Incorrect email format"),
    password: yup.string().typeError("Password should be a string")
    .required("This field is reqired").min(6).max(30),
    repeatPassword: yup.string().required("This field is required").
    oneOf([yup.ref("password")], "Passwords dint match").typeError("Should be a string").min(6).max(30)

})
export const loginValidationShema = yup.object().shape({
    email: yup.string().typeError("Email must be an string").min(6).max(30).required("This Field is Required")
        .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Incorrect email format"),
    password: yup.string().typeError("Password should be a string").required("This field is reqired").min(6).max(30),
 

})

export const parseCocktailDbIngridients = (cocktail: any) => {
    let ingridientKey = Object.keys(cocktail).filter((key: string) => key.includes('strIngredient') === true)
    return ingridientKey.map((el: string, index: number) => {
        return { [cocktail[el]]: cocktail[`strMeasure${index + 1}`] }
    }).filter((el: {}) => !el.hasOwnProperty('null')).reduce((result, el) => {
        return {
            ...result,
            ...el
        }
    })


}
