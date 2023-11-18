import React from "react";
import { CoctailList } from "./CocktailList";
import { SpiritList } from "./SpiritList";
import { premixAPI } from "../../services/Firebase/PremixAPI";
import { PremixesList } from "./PublicPremixes";

export const KnowledgeBaseContent = (props : {value : number}) => {
    console.log(premixAPI.getAllPublicProducts());
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
                <PremixesList/>
            )
    }
}
