
import * as yup from "yup"
import { productType } from "../Redux/Types"


// Helprt to create a Date string
// Хэлпер для создания строки даты
export function getFullDateString() {
    let date = new Date()
    let mm = date.getMonth() + 1
    let yy = date.getUTCFullYear()
    let dd = date.getDate()

    return mm + "/" + dd + "/" + yy
}


export const parseComposition = (composition: {}) => {
    // EN
    // This function helps to parse the premix composition object into an array of span elements
    // Used in product Card Compoennt to render composition 
    // RU
    // Данная функция помогает распарсить обьект состава премикса в массив спан элементов
    return Object.keys(composition as {}).map((el: string, index: number) => {
        return (
            <p>{el.includes("_") ? el.split("_")[0] + " " + el.split("_")[1] :
                el + " : " + Object.values(composition as {})[index]}</p>
        )
    })
}

export const calculateAndParseIntoComponent = (card: productType, value: number) => {
    // EN
    // The first argument is the composition object, the second argument is the multiplier
    // This function calculates and parses the required number of components from the object based on the value argument. 
    // The value of each key is multiplied by the value value
    // RU
    // Ппервый аргумент обьект состава,второй аргумент множитель
    // Дананя функция расчитывает и парсит из обьекта нужное колличество компонентов на основании аргуиента вэлью. 
    // Значение каждого ключа умножается на значение вэлью
    return Object.keys(card?.composition as {}).map((el: string, index: number) => {
        return (<>
            <span>{el.includes("_") ? el.split("_")[0] + " " + el.split("_")[1] + " : " + Number(Object.values(card?.composition as {})[index]) * value :
                el + " : " + Number(Object.values(card?.composition as {})[index]) * value}</span><br />
        </>
        )
    })
}


export const parseElementNameToString = (name: string) => {
    return name.includes("_") ? name.split("_")[0] + " " + name.split("_")[1] : name
}



export const validationShema = yup.object().shape({
    nickName: yup.string().typeError("Username must be string").max(30).min(5).required(),
    email: yup.string().typeError("Email must be an string").min(6).max(30).required("This Field is Required")
        .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            "Incorrect email format"),
    password: yup.string().typeError("Password should be a string").required("This field is reqired").min(6).max(30),
    repeatPassword: yup.string().required("This field is required").oneOf([yup.ref("password")], "Passwords dint match").typeError("Should be a string").min(6).max(30)

})


export const parseCocktailDbIngridients = (cocktail  : any) => {
    let ingridientKey = Object.keys(cocktail).filter((key : string) => key.includes('strIngredient') === true)
    return ingridientKey.map((el : string,index : number) => {
        return {[cocktail[el]] : cocktail[`strMeasure${index + 1}`]}
    }).filter((el : {}) => !el.hasOwnProperty('null')).reduce((result,el) => {
        return {
            ...result,
            ...el
        }
    })


}
