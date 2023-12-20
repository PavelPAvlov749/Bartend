import React from "react";
import "../../Assets/Styles/CocktailList.css"
import { KnowledgeBaseContent } from "./KnowledgeBaseContent";
import { SelectionTabs } from "../../Components/SelectionTabs";







const KnowledgeBase = () => {

  
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      
    };

    return (
        <section className="knwoledge_base_container container">
            <h2>Knowledge base</h2>
            <SelectionTabs labels={['Coctails','Premixes']} handleChange={handleChange} value={value} setValue={setValue}/>
            <KnowledgeBaseContent value={value}/>
        </section>
    )
}

export default KnowledgeBase;