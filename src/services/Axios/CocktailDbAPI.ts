import axios from "axios";
import { parseCocktailDbIngridients } from "../../Helpers/Helpers";
import { access } from "fs";


const axiosInstance = axios.create({
    timeout: 1000,
    responseType: "json",
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
})

export const coctailDbAPI = {
    getAllCoctails: async () => {
        let cocktails = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail")
        if (cocktails.status === 200) {
           
            return cocktails.data.drinks
        } else {
            return []
        }
    },
    searchCocktailByName: async (name: string) => {
        try {
          
            let coctails = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
         
            if (coctails.status === 200) {
                return coctails.data.drinks
            }
        } catch (ex) {
            console.log(ex)
        }
    },
    getCocktailByID: async (id: string) => {
        try {
            let cocktail = (await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`))

           let currentCocktial = {
            idDrink : cocktail.data.drinks[0].idDrink,
            strDrink: cocktail.data.drinks[0].strDrink,
            strInstructions: cocktail.data.drinks[0].strInstructions,
            strDrinkThumb: cocktail.data.drinks[0].strDrinkThumb,
            strCategory: cocktail.data.drinks[0].strCategory,
            strIBA: cocktail.data.drinks[0].strIBA,
            strAlcoholic: cocktail.data.drinks[0].strAlcoholic,
            strGlass: cocktail.data.drinks[0].strGlass,
            composition : parseCocktailDbIngridients(cocktail.data.drinks[0])
           }
          
            return currentCocktial
        } catch (ex) {
            console.log(ex)
        }
    },
    getRandomCoctail : async () => {
        try{
            let cocktail = await axios.get("www.thecocktaildb.com/api/json/v1/1/random.php")
            let currentCocktial = {
                idDrink : cocktail.data.drinks[0].idDrink,
                strDrink: cocktail.data.drinks[0].strDrink,
                strInstructions: cocktail.data.drinks[0].strInstructions,
                strDrinkThumb: cocktail.data.drinks[0].strDrinkThumb,
                strCategory: cocktail.data.drinks[0].strCategory,
                strIBA: cocktail.data.drinks[0].strIBA,
                strAlcoholic: cocktail.data.drinks[0].strAlcoholic,
                strGlass: cocktail.data.drinks[0].strGlass,
                composition : parseCocktailDbIngridients(cocktail.data.drinks[0])
               }
              
                return currentCocktial
        }catch(ex) {
            console.log(ex)
        }
    }
  
}
