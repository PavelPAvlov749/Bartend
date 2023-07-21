import React from "react";
import { CoctailList } from "./CocktailList";
import { SpiritList } from "./SpiritList";

export const KnowledgeBaseContent = (props : {value : number}) => {
    switch(props.value){
        case 0 : {
            return (
                <CoctailList/>
            )
        }
        case 1 : {
            return (
                <SpiritList/>
            )
        }
        default : 
            return (
                <>
                    <h3>Пусто</h3>
                </>
            )
    }
}
