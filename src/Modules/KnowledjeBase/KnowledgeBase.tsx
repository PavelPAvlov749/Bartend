import React, { useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import "../../Assets/Styles/CocktailList.css"
import { KnowledgeBaseContent } from "./KnowledgeBaseContent";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";






export const KnowledgeBase = () => {

  
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
      
    };

    return (
        <section className="knwoledge_base_container container">
            <h2>Knowledge base</h2>
            <Box sx={{width: '100%',marginBottom : "5px" }}>
                <Tabs value={value} onChange={handleChange} sx={{}} >
                    <Tab sx={{width : "33%",fontSize : "14px",color : "white"}} label="Coktails" />
                    <Tab  sx={{width : "33%",fontSize : "14px",color :"white"}}  label="Spirits" />
                    <Tab  sx={{width : "33%",fontSize : "14px",color :"white"}}  label="Premixes" />
                </Tabs>
            </Box>
            <KnowledgeBaseContent value={value}/>
        </section>
    )
}