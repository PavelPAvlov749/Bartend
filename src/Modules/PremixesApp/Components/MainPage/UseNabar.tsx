import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

// Custom hook for a navigation bar
export const useNavbar = () => {
  // State for tracking the selected tab
  const [shiftType, setShiftType] = useState(0);

  // Event handler for tab changes
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setShiftType(newValue);
    console.log(newValue);
  };

  // JSX for the navigation bar
  const navbar = (
    <Box sx={{ width: '100%', marginBottom: "5px" }}>
      <Tabs value={shiftType} onChange={handleChange} sx={{}} >
        <Tab sx={{ width: "50%", fontSize: "14px", color: "white" }} label="Current Shift" />
        <Tab sx={{ width: "50%", fontSize: "14px", color: "white" }} label="History" />
      </Tabs>
    </Box>
  );

  // Returning the navigation bar JSX and the selected tab value
  return [navbar, shiftType];
};
