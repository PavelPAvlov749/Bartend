import React ,{useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";


import { cocltalCardType, getCocktailsByName, getCocktailsThunk } from "../../Redux/KnowledgeBaseReducer";
import { CoctailPreview } from "./CocktailPrewiew";
export const CoctailList = () => {
    let dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getCocktailsThunk())
    }, [])
    let cocktailsFromState : cocltalCardType[] = useSelector((state: Global_state_type) => state.knowledgeBase.cocktails as cocltalCardType[]);
    // let cocktailsFromState : cocltalCardType[] = [];

    function searchByName(e: React.SyntheticEvent<HTMLInputElement>): void {

        // dispatch(getCocktailsByName(e.currentTarget.value));

    }
    // debugger
    console.log("RENDER");
    return (
        <section className="cocktail_list translate_animation">
            <section className="filters">
                <input type="text"  placeholder="Искать по названию" onChange={searchByName}/>
            </section>
            <div className="list">
            {cocktailsFromState?.map((cocktail : cocltalCardType) => {
                return (
                    <div key={cocktail.idDrink}>
                          <CoctailPreview cocktail={cocktail}/>
                    </div>
                 
                )
            })}
            </div>
          
        </section>
    )
}