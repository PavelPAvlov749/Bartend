import { Box, Tab, Tabs } from "@mui/material"
import React, { Dispatch } from "react";

// Define type to a component

type SelectionTabsPropsType = {
    value : number,
    labels : Array<string>,
    handleChange : (event : React.SyntheticEvent,newValue : number) => void,
    setValue : Dispatch<React.SetStateAction<number>>
}

/**
 * Universal selection tabs component 
 * 
 * @param props SelectionTabsPropsType
 * @returns React.Ellement
 */
export const SelectionTabs: React.FC<SelectionTabsPropsType> = (props) => {
    // Get a one tab with 
    const tabWidth = Math.floor(100 / props.labels.length);
    return (
        <Box sx={{ width: '100%', marginBottom: "5px" }}>
            <Tabs value={props.value} onChange={props.handleChange} sx={{}} >
                {props.labels.map((label : string,index : number) => {
                    return (
                        <Tab sx={{ width: tabWidth + "%", fontSize: "14px", color: "white" }} label={label} />
                    )
                })}
            </Tabs>
        </Box>
    )
}