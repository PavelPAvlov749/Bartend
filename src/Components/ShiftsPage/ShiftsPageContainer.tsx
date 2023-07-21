import { useState } from "react";
import { CurrentShift } from "./CurrentShift";
import { ShiftsHistory } from "../ShiftsHistory/ShiftsHistory";
import { Box, Tab, Tabs } from "@mui/material";
import "../../Styles/BlamkShift.css"
import { Global_state_type } from "../../Redux/Store";
import { useSelector } from "react-redux";

export const ShiftPageContainer = () => {
    const [shiftType, setShiftType] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setShiftType(newValue);
            console.log(newValue)
      
    };
    let isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    return (
        <section className={`blank_shift_container translate_animation `}>
          
            <Box sx={{ width: '100%', marginBottom: "5px" }}>
                <Tabs value={shiftType} onChange={handleChange} sx={{}} >
                    <Tab sx={{ width: "50%", fontSize: "14px", color: isDarkTheme ? "white" : "black" }} label="Теккущая смена" />
                    <Tab sx={{ width: "50%", fontSize: "14px", color: isDarkTheme ? "white" : "black" }} label="История" />
                </Tabs>
            </Box>
            {shiftType === 0 ? <CurrentShift /> : <ShiftsHistory />}
        </section>
    )

}

