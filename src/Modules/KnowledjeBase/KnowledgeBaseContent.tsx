import React from "react";
import { CoctailList } from "./CocktailList";

import { PremixesList } from "./PublicPremixes";

export const KnowledgeBaseContent = (props : {value : number}) => {
    
    if(props.value == 0) {
        return (
            <CoctailList/>
        )
    }
    else
    {
        return (
            <PremixesList/>
        )
    }

}
