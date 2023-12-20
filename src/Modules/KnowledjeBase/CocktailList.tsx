import React ,{useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { cocltalCardType, getCocktailsByName, getCocktailsThunk } from "../../Redux/KnowledgeBaseReducer";
import { ProductPreview } from "./ProductPreview";


export const CoctailList = () => {
    let dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getCocktailsThunk())
    }, [])
    let cocktailsFromState : cocltalCardType[] = useSelector((state: Global_state_type) => state.knowledgeBase.cocktails as cocltalCardType[]);

    function searchByName(e: React.SyntheticEvent<HTMLInputElement>): void {

        dispatch(getCocktailsByName(e.currentTarget.value));

    }


    return (
        <section className="cocktail_list translate_animation">
            <section className="filters">
                <input type="text"  placeholder="Search by name" onChange={searchByName}/>
            </section>
            <div className="list">
            {cocktailsFromState?.map((cocktail : cocltalCardType) => {
                return (
                
                          <ProductPreview type="cocktail"name={cocktail.strDrink} id={cocktail.idDrink} img={cocktail.strDrinkThumb}/>
                    
                 
                )
            })}
            </div>
          
        </section>
    )
}