import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        background: "#03002D",
        justifyContent:"center"
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
