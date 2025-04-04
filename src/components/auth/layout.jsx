import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        
        background: "#03002D",
   
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
