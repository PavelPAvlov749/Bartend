import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PremixesNavbar = () => {
    const navigate = useNavigate();
    let [shiftType] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        // let path = newValue === 0 ? '/history' : 'current-shift';
        
        // navigate(path);
        // console.log(newValue)

    };
    return (
        <section className="navbar container">
            <Box sx={{ width: '100%', marginBottom: "5px" }}>
                <Tabs value={shiftType} onChange={handleChange} sx={{}} >
                    <a href="/blank-shift/history">
                        <Tab sx={{ width: "50%", fontSize: "14px", color: "white" }} label="История" />
                    </a>
                    <a href="current-shift">
                        <Tab sx={{ width: "50%", fontSize: "14px", color: "white" }} label="Теккущая смена" />
                    </a>

                </Tabs>
            </Box>
        </section>
    )
}